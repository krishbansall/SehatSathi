const Doctor = require('../models/Doctor');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { getDistanceKm } = require('../utils/haversine');

// @route  GET /api/doctors
// Query params: specialization, minRating, maxFee, availableToday, lat, lon, radius(km), page, limit, sort
exports.getDoctors = async (req, res, next) => {
  try {
    const {
      specialization, minRating, maxFee, availableToday,
      lat, lon, radius = 50,
      page = 1, limit = 20,
      sort = '-rating',
      search
    } = req.query;

    const filter = { isActive: true };

    if (specialization) filter.specialization = { $regex: specialization, $options: 'i' };
    if (minRating)      filter.rating = { $gte: parseFloat(minRating) };
    if (maxFee)         filter.fee = { ...(filter.fee || {}), $lte: parseFloat(maxFee) };
    if (availableToday === 'true') filter.availableToday = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    // Geo filter
    if (lat && lon) {
      filter.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lon), parseFloat(lat)] },
          $maxDistance: parseFloat(radius) * 1000
        }
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = Doctor.find(filter).select('-reviews -weeklySchedule');
    if (!lat && !lon) query = query.sort(sort);  // geo-sorted when lat/lon present
    query = query.skip(skip).limit(parseInt(limit));

    const [doctors, total] = await Promise.all([
      query,
      Doctor.countDocuments(filter)
    ]);

    // Attach distance if coords provided
    const result = doctors.map(d => {
      const obj = d.toObject();
      if (lat && lon) {
        obj.distanceKm = getDistanceKm(
          parseFloat(lat), parseFloat(lon),
          d.location.coordinates[1], d.location.coordinates[0]
        );
      }
      return obj;
    });

    sendSuccess(res, {
      doctors: result,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) }
    }, 'Doctors fetched');
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/doctors/:id
exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('hospitalId');
    if (!doctor) return sendError(res, 'Doctor not found', 404);
    sendSuccess(res, doctor, 'Doctor profile fetched');
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/doctors/:id/slots?date=YYYY-MM-DD
exports.getAvailableSlots = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('weeklySchedule name');
    if (!doctor) return sendError(res, 'Doctor not found', 404);

    const { date } = req.query;
    if (!date) return sendError(res, 'date query param required (YYYY-MM-DD)', 400);

    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    const slots   = doctor.weeklySchedule?.[dayName] || [];

    sendSuccess(res, { date, day: dayName, slots }, 'Available slots fetched');
  } catch (err) {
    next(err);
  }
};

// @route  POST /api/doctors/:id/reviews
exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return sendError(res, 'Doctor not found', 404);

    const review = {
      patient: req.user.fullName,
      rating:  Number(rating),
      comment,
      date:    new Date()
    };
    doctor.reviews.push(review);

    // Recalculate average
    const total = doctor.reviews.reduce((sum, r) => sum + r.rating, 0);
    doctor.rating      = parseFloat((total / doctor.reviews.length).toFixed(1));
    doctor.reviewCount = doctor.reviews.length;
    await doctor.save();

    sendSuccess(res, doctor.reviews, 'Review added', 201);
  } catch (err) {
    next(err);
  }
};

// @route  PUT /api/doctors/profile  (doctor updating own profile)
exports.updateDoctorProfile = async (req, res, next) => {
  try {
    const allowed = ['bio', 'fee', 'tags', 'weeklySchedule', 'availableToday', 'photo', 'hospital', 'location'];
    const updates = {};
    allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const doctor = await Doctor.findOneAndUpdate(
      { user: req.user._id },
      updates,
      { new: true, runValidators: true }
    );
    if (!doctor) return sendError(res, 'Doctor profile not found', 404);
    sendSuccess(res, doctor, 'Doctor profile updated');
  } catch (err) {
    next(err);
  }
};
