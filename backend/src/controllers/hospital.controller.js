const Hospital = require('../models/Hospital');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { getDistanceKm } = require('../utils/haversine');

// @route  GET /api/hospitals
exports.getHospitals = async (req, res, next) => {
  try {
    const { city, type, lat, lon, radius = 30, isFlNode, page = 1, limit = 20 } = req.query;
    const filter = { isActive: true };

    if (city)     filter.city = { $regex: city, $options: 'i' };
    if (type)     filter.type = type;
    if (isFlNode === 'true') filter.isFlNode = true;

    if (lat && lon) {
      filter.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lon), parseFloat(lat)] },
          $maxDistance: parseFloat(radius) * 1000
        }
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [hospitals, total] = await Promise.all([
      Hospital.find(filter).skip(skip).limit(parseInt(limit)),
      Hospital.countDocuments(filter)
    ]);

    const result = hospitals.map(h => {
      const obj = h.toObject();
      if (lat && lon && h.location?.coordinates?.length === 2) {
        obj.distanceKm = getDistanceKm(
          parseFloat(lat), parseFloat(lon),
          h.location.coordinates[1], h.location.coordinates[0]
        );
      }
      return obj;
    });

    sendSuccess(res, { hospitals: result, pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) } }, 'Hospitals fetched');
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/hospitals/:id
exports.getHospitalById = async (req, res, next) => {
  try {
    const h = await Hospital.findById(req.params.id);
    if (!h) return sendError(res, 'Hospital not found', 404);
    sendSuccess(res, h, 'Hospital fetched');
  } catch (err) {
    next(err);
  }
};

// @route  POST /api/hospitals  (admin only)
exports.createHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.create(req.body);
    sendSuccess(res, hospital, 'Hospital created', 201);
  } catch (err) {
    next(err);
  }
};

// @route  PUT /api/hospitals/:id  (admin only)
exports.updateHospital = async (req, res, next) => {
  try {
    const h = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!h) return sendError(res, 'Hospital not found', 404);
    sendSuccess(res, h, 'Hospital updated');
  } catch (err) {
    next(err);
  }
};

// Simple in-memory cache to prevent Overpass rate limiting
const osmCache = new Map();

// @route  GET /api/hospitals/osm-nearby
exports.getOsmNearby = async (req, res, next) => {
  try {
    const { lat, lon, radius = 5000 } = req.query;
    if (!lat || !lon) return sendError(res, 'Latitude and longitude are required', 400);

    // Cache key based on roughly 100m grid to improve hit rate and limit requests
    const cacheKey = `${parseFloat(lat).toFixed(3)}_${parseFloat(lon).toFixed(3)}_${radius}`;
    
    if (osmCache.has(cacheKey)) {
      const cachedData = osmCache.get(cacheKey);
      if (Date.now() - cachedData.timestamp < 1000 * 60 * 60) { // 1 hour cache
        return sendSuccess(res, cachedData.data, 'Fetched nearby healthcare from cache');
      }
      osmCache.delete(cacheKey); // Expired
    }

    const overpassQuery = `
      [out:json][timeout:25];
      (
        nwr["amenity"="hospital"](around:${radius},${lat},${lon});
        nwr["amenity"="clinic"](around:${radius},${lat},${lon});
        nwr["amenity"="doctors"](around:${radius},${lat},${lon});
        nwr["amenity"="pharmacy"](around:${radius},${lat},${lon});
        nwr["amenity"="dentist"](around:${radius},${lat},${lon});
        nwr["amenity"="laboratory"](around:${radius},${lat},${lon});
        nwr["healthcare"="blood_bank"](around:${radius},${lat},${lon});
      );
      out center tags;
    `;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: 'data=' + encodeURIComponent(overpassQuery),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'User-Agent': 'SehatSathi/1.0 (healthcare app)'
      }
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Parse the data
    const facilities = data.elements.map(el => {
      const tags = el.tags || {};
      const latVal = el.lat || el.center?.lat;
      const lonVal = el.lon || el.center?.lon;
      
      // Determine type
      let type = 'Clinic';
      if (tags.amenity === 'hospital') type = 'Hospital';
      else if (tags.amenity === 'pharmacy') type = 'Pharmacy';
      else if (tags.amenity === 'dentist') type = 'Dentist';
      else if (tags.amenity === 'laboratory') type = 'Laboratory';
      else if (tags.healthcare === 'blood_bank') type = 'Blood Bank';
      else if (tags.amenity === 'doctors') type = 'Doctor';
      
      let distanceKm = getDistanceKm(parseFloat(lat), parseFloat(lon), latVal, lonVal);

      return {
        id: el.id,
        name: tags.name || `${type} (Unnamed)`,
        type: type,
        lat: latVal,
        lon: lonVal,
        distanceKm,
        address: tags['addr:full'] || [tags['addr:housenumber'], tags['addr:street'], tags['addr:city']].filter(Boolean).join(', ') || null,
        phone: tags.phone || tags['contact:phone'] || null,
        website: tags.website || tags['contact:website'] || null,
        opening_hours: tags.opening_hours || null
      };
    }).sort((a, b) => a.distanceKm - b.distanceKm);

    osmCache.set(cacheKey, { timestamp: Date.now(), data: facilities });

    sendSuccess(res, facilities, 'Fetched nearby healthcare from OpenStreetMap');
  } catch (err) {
    next(err);
  }
};
