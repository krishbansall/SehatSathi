import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../context/AppointmentContext';
import DoctorCard from '../components/doctor/DoctorCard';
import DoctorProfileModal from '../components/doctor/DoctorProfileModal';
import ParallaxWrapper from '../components/common/ParallaxWrapper';
import { getDistanceKm } from '../utils/geoUtils';
import { doctorAPI, hospitalAPI } from '../services/api';
import { 
  Search, 
  Stethoscope, 
  MapPin, 
  Navigation, 
  Loader2, 
  AlertCircle, 
  X,
  CheckCircle2,
  UserX,
  Phone,
  Clock,
  Building2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const DoctorSearch = () => {
  const navigate = useNavigate();
  const { doctors: mockDoctors, setSelectedDoctorForBooking } = useAppointments();

  // ── Live doctors from API ──────────────────────────────────────────────────
  const [apiDoctors, setApiDoctors]   = useState([]);
  const [fetchingDocs, setFetchingDocs] = useState(true);

  // ── Live OSM Facilities ────────────────────────────────────────────────────
  const [osmFacilities, setOsmFacilities] = useState([]);
  const [loadingOsm, setLoadingOsm] = useState(false);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await doctorAPI.getAll({ limit: 50 });
        // Normalize _id → id for compatibility with DoctorCard
        const normalized = res.data.doctors.map(d => ({ ...d, id: d._id }));
        setApiDoctors(normalized);
      } catch (err) {
        console.warn('API unavailable, using mock data:', err.message);
        setApiDoctors(mockDoctors); // fallback to mock
      } finally {
        setFetchingDocs(false);
      }
    };
    loadDoctors();
  }, []);

  // Use API doctors if available, else mock
  const doctors = apiDoctors.length > 0 ? apiDoctors : mockDoctors;

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // rating, distance, experience, fee

  // Geolocation & Proximity State
  const [userLocation, setUserLocation] = useState(null); // { lat, lon, name }
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [manualInput, setManualInput] = useState('');

  // Selected doctor modal
  const [profileModalDoctor, setProfileModalDoctor] = useState(null);

  // Load OSM facilities when location is available
  useEffect(() => {
    if (userLocation) {
      setLoadingOsm(true);
      hospitalAPI.getOsmNearby(userLocation.lat, userLocation.lon, 6000)
        .then(res => setOsmFacilities(res.data || []))
        .catch(err => console.warn('Failed to fetch OSM facilities:', err.message))
        .finally(() => setLoadingOsm(false));
    } else {
      setOsmFacilities([]);
    }
  }, [userLocation]);

  // Handle "Use My Location"
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Couldn't access your location — geolocation is not supported by your browser. Please enter your city or pincode instead.");
      return;
    }

    setIsDetecting(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        let placeName = `Coordinates (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (res.ok) {
            const data = await res.json();
            if (data && data.address) {
              placeName =
                data.address.suburb ||
                data.address.city_district ||
                data.address.city ||
                data.address.town ||
                data.address.county ||
                data.address.state ||
                placeName;
            }
          }
        } catch (err) {
          // Fallback
        }

        setUserLocation({ lat, lon, name: placeName });
        setIsDetecting(false);
        setSortBy('distance');
      },
      (error) => {
        setIsDetecting(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Couldn't access your location — permission denied. Please enter your city or pincode instead.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError("Location information is unavailable — please enter your city or pincode instead.");
        } else if (error.code === error.TIMEOUT) {
          setLocationError("Location request timed out — please enter your city or pincode instead.");
        } else {
          setLocationError("Couldn't access your location — please enter your city or pincode instead.");
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    setLocationError(null);
    setIsDetecting(true);

    const query = manualInput.trim();
    setTimeout(() => {
      let simulatedLat = 28.6692;
      let simulatedLon = 77.4538;

      if (query.toLowerCase().includes('noida')) {
        simulatedLat = 28.5355;
        simulatedLon = 77.3910;
      } else if (query.toLowerCase().includes('indirapuram')) {
        simulatedLat = 28.6369;
        simulatedLon = 77.3697;
      } else if (query.toLowerCase().includes('vaishali')) {
        simulatedLat = 28.6475;
        simulatedLon = 77.3412;
      }

      setUserLocation({
        lat: simulatedLat,
        lon: simulatedLon,
        name: query
      });
      setIsDetecting(false);
      setSortBy('distance');
    }, 600);
  };

  const filteredDoctors = useMemo(() => {
    let result = doctors.map((doc) => {
      if (userLocation && doc.location && doc.location.coordinates) {
        const [docLon, docLat] = doc.location.coordinates;
        const dist = getDistanceKm(userLocation.lat, userLocation.lon, docLat, docLon);
        return { ...doc, distanceKm: dist };
      }
      return { ...doc, distanceKm: null };
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specialization.toLowerCase().includes(q) ||
          doc.hospital.toLowerCase().includes(q) ||
          doc.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedSpecialty !== 'All') {
      result = result.filter((doc) => doc.specialization === selectedSpecialty);
    }

    if (selectedLocation !== 'All') {
      result = result.filter((doc) => doc.hospital.includes(selectedLocation));
    }

    if (availableTodayOnly) {
      result = result.filter((doc) => doc.availableToday);
    }

    result.sort((a, b) => {
      if (sortBy === 'distance') {
        if (a.distanceKm !== null && b.distanceKm !== null) {
          return a.distanceKm - b.distanceKm;
        }
      }
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experience - a.experience;
      if (sortBy === 'fee') return a.fee - b.fee;
      return 0;
    });

    return result;
  }, [doctors, searchQuery, selectedSpecialty, selectedLocation, availableTodayOnly, sortBy, userLocation]);

  const filteredOsm = useMemo(() => {
    if (!osmFacilities.length) return [];
    return osmFacilities.filter(f => {
      // Always include pharmacies and blood banks
      if (f.type === 'Pharmacy' || f.type === 'Blood Bank') return true;
      // For hospitals and clinics, match the selected specialty if it's not "All"
      if (f.type === 'Hospital' || f.type === 'Clinic') {
        if (selectedSpecialty === 'All') return true;
        // Basic substring match on facility name vs specialty
        return f.name.toLowerCase().includes(selectedSpecialty.toLowerCase());
      }
      return false; 
    }).slice(0, 12); // Limit to top 12 nearest
  }, [osmFacilities, selectedSpecialty]);

  const handleBookDirect = (doctor) => {
    setSelectedDoctorForBooking(doctor);
    navigate('/book');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-8">
      {/* Header */}
      <ParallaxWrapper className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 uppercase tracking-wider">
          Practo-Style Search
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Find & Book Top Medical Specialists
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
          Filter by clinical specialty, location, consultation fee, ratings, and instant today availability.
        </p>
      </ParallaxWrapper>

      {/* STEP 1 LOCATION PROMPT BANNER */}
      <div className="glass-card p-6 rounded-3xl border border-[var(--border)] shadow-xl space-y-4 bg-[var(--bg-card)]">
        {userLocation ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[var(--accent-primary)]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    Nearby Proximity Active
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 flex items-center gap-1">
                    📍 Showing doctors near <strong className="font-extrabold text-[var(--text-primary)]">{userLocation.name}</strong>
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Doctors calculated by distance in km from your location.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setUserLocation(null);
                setLocationError(null);
                setSortBy('rating');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[var(--accent-primary)] bg-[var(--bg-primary)] hover:bg-[var(--accent-primary)]/10 border border-[var(--border)] transition-colors shrink-0 self-start sm:self-auto"
            >
              Change Location
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--accent-primary)] text-white flex items-center justify-center shadow-md shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[var(--text-primary)]">
                  Find doctors near you
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Detect your location or enter your city to sort specialists by proximity.
                </p>
              </div>
            </div>

            {locationError && (
              <div className="p-3.5 rounded-2xl bg-[var(--danger)]/15 border border-[var(--danger)]/30 text-[var(--danger)] text-xs font-semibold flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[var(--danger)] shrink-0" />
                  <span>{locationError}</span>
                </div>
                <button
                  onClick={() => setLocationError(null)}
                  className="text-[var(--danger)] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleUseMyLocation}
                disabled={isDetecting}
                className="px-5 py-2.5 rounded-2xl font-bold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-95 shadow-md shadow-[var(--accent-primary)]/20 flex items-center justify-center gap-2 text-xs transition-all disabled:opacity-70 shrink-0 cursor-pointer"
              >
                {isDetecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Detecting location…</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    <span>📍 Use My Location</span>
                  </>
                )}
              </motion.button>

              <form onSubmit={handleManualSearch} className="flex-1 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-2.5" />
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Or enter your city/pincode"
                    className="w-full pl-10 pr-4 py-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] shadow-xs"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isDetecting || !manualInput.trim()}
                  className="px-4 py-2 rounded-2xl font-bold text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border)] text-xs transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  Search
                </motion.button>
              </form>
            </div>
          </div>
        )}

        <p className="text-[11px] text-[var(--text-muted)] border-t border-[var(--border)] pt-2 font-medium">
          We only use your location to show nearby doctors — it isn't stored.
        </p>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-30 glass-card p-4 rounded-3xl border border-[var(--border)] shadow-xl space-y-3 bg-[var(--bg-card)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor name, specialty or symptom..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] shadow-xs"
            />
          </div>

          <div className="lg:col-span-3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3.5 py-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none"
            >
              <option value="All">All Clinical Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="ENT">ENT</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Gynecology">Gynecology</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3.5 py-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none"
            >
              <option value="All">All Hospitals</option>
              <option value="Ghaziabad">Ghaziabad</option>
              <option value="Kavi Nagar">Kavi Nagar</option>
              <option value="Raj Nagar">Raj Nagar</option>
              <option value="Vasundhara">Vasundhara</option>
              <option value="Vaishali">Vaishali</option>
              <option value="Indirapuram">Indirapuram</option>
              <option value="Noida">Noida</option>
            </select>
          </div>

          <div className="lg:col-span-3 flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] text-xs font-bold text-[var(--text-primary)] focus:outline-none"
            >
              {userLocation && (
                <option value="distance">Sort by Distance (Nearest First)</option>
              )}
              <option value="rating">Sort by Rating (High → Low)</option>
              <option value="experience">Sort by Experience</option>
              <option value="fee">Sort by Consultation Fee (Low → High)</option>
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] text-xs">
          <label className="flex items-center space-x-2 cursor-pointer font-semibold text-[var(--text-primary)]">
            <input
              type="checkbox"
              checked={availableTodayOnly}
              onChange={(e) => setAvailableTodayOnly(e.target.checked)}
              className="rounded text-[var(--accent-primary)] focus:ring-[var(--accent-primary)] w-4 h-4"
            />
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-ping" />
              Show Available Today Only
            </span>
          </label>

          <span className="text-[var(--text-muted)] font-medium">
            Showing <strong>{filteredDoctors.length}</strong> verified doctors
          </span>
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, idx) => (
            <ParallaxWrapper key={doctor.id} delay={idx * 0.05}>
              <DoctorCard
                doctor={doctor}
                onSelect={(doc) => setProfileModalDoctor(doc)}
                onBookDirect={handleBookDirect}
              />
            </ParallaxWrapper>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center rounded-3xl border border-[var(--border)] space-y-4 max-w-md mx-auto my-12 bg-[var(--bg-card)]">
          <div className="w-16 h-16 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center mx-auto text-[var(--accent-primary)]">
            <UserX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">No doctors found matching your criteria</h3>
          <p className="text-xs text-[var(--text-muted)]">
            Try resetting your filters or expanding your search location to discover available medical specialists.
          </p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setSearchQuery('');
              setSelectedSpecialty('All');
              setSelectedLocation('All');
              setAvailableTodayOnly(false);
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 transition-colors"
          >
            Reset All Filters
          </motion.button>
        </div>
      )}

      {/* Nearby Hospitals, Clinics, Pharmacies (OSM Data) */}
      {userLocation && (
        <div className="pt-12 border-t border-[var(--border)] mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[var(--accent-primary)]" />
                Nearby Facilities
              </h2>
              <p className="text-[var(--text-muted)] text-sm mt-1">
                {selectedSpecialty !== 'All' 
                  ? `Showing Hospitals/Clinics matching "${selectedSpecialty}", plus Pharmacies & Blood Banks.` 
                  : 'Showing nearby Hospitals, Clinics, Pharmacies, and Blood Banks.'}
              </p>
            </div>
            {loadingOsm && <Loader2 className="w-5 h-5 animate-spin text-[var(--accent-primary)]" />}
          </div>

          {filteredOsm.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredOsm.map((facility, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={facility.id}
                  className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm hover:shadow-md hover:border-[var(--accent-primary)] transition-all flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                      {facility.type}
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-muted)]">
                      {facility.distanceKm} km
                    </span>
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-2 line-clamp-2">
                    {facility.name}
                  </h3>
                  <div className="mt-auto space-y-2 pt-4 border-t border-[var(--border)]">
                    {facility.address && (
                      <div className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{facility.address}</span>
                      </div>
                    )}
                    {facility.phone && (
                      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <span>{facility.phone}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : !loadingOsm ? (
            <div className="text-center py-10 text-[var(--text-muted)] border border-dashed border-[var(--border)] rounded-2xl">
              <Building2 className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p className="text-sm">No specific matching facilities found nearby.</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Doctor Profile Modal */}
      <DoctorProfileModal
        doctor={profileModalDoctor}
        isOpen={Boolean(profileModalDoctor)}
        onClose={() => setProfileModalDoctor(null)}
        onBook={handleBookDirect}
      />
    </div>
  );
};

export default DoctorSearch;
