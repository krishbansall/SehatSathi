import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { hospitalAPI } from '../services/api';
import ParallaxWrapper from '../components/common/ParallaxWrapper';
import { Loader2, MapPin, Phone, Globe, Clock, Navigation, Search, AlertCircle, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for default Leaflet icon paths in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customUserIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to recenter map when location changes
const RecenterAutomatically = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 14);
  }, [lat, lon, map]);
  return null;
};

const TYPES = ['All', 'Hospital', 'Clinic', 'Pharmacy', 'Doctor', 'Dentist', 'Laboratory', 'Blood Bank'];

export const HealthcareLocator = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getUserLocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
        fetchNearby(latitude, longitude);
      },
      (err) => {
        setError('Unable to retrieve your location. Please allow location access.');
        setLoading(false);
      }
    );
  };

  const fetchNearby = async (lat, lon) => {
    try {
      const res = await hospitalAPI.getOsmNearby(lat, lon, 5000);
      setFacilities(res.data || []);
    } catch (err) {
      setError('Failed to fetch nearby healthcare facilities. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const filteredFacilities = facilities.filter(f => {
    const matchesType = filterType === 'All' || f.type === filterType;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <ParallaxWrapper className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
            Healthcare Locator
          </h1>
          <p className="text-[var(--text-muted)] text-lg">
            Find nearby hospitals, clinics, and pharmacies powered by OpenStreetMap.
          </p>
        </motion.div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 mb-8">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
            <button 
              onClick={getUserLocation}
              className="ml-auto text-sm font-medium hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Column */}
          <div className="lg:col-span-2 h-[500px] md:h-[600px] bg-[var(--bg-card)] rounded-2xl shadow-xl overflow-hidden border border-[var(--border)] relative z-10">
            {loading && !userLocation ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-card)] z-20">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-primary)]" />
              </div>
            ) : userLocation ? (
              <MapContainer 
                center={[userLocation.lat, userLocation.lon]} 
                zoom={14} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <RecenterAutomatically lat={userLocation.lat} lon={userLocation.lon} />

                {/* User Marker */}
                <Marker position={[userLocation.lat, userLocation.lon]} icon={customUserIcon}>
                  <Popup>
                    <div className="font-semibold">Your Location</div>
                  </Popup>
                </Marker>

                {/* Facility Markers */}
                {filteredFacilities.map((facility) => (
                  <Marker 
                    key={facility.id} 
                    position={[facility.lat, facility.lon]}
                  >
                    <Popup>
                      <div className="p-1">
                        <h3 className="font-bold text-sm mb-1">{facility.name}</h3>
                        <div className="text-xs text-gray-500 mb-2">{facility.type}</div>
                        {facility.address && <div className="text-xs mb-1">📍 {facility.address}</div>}
                        {facility.phone && <div className="text-xs mb-1">📞 {facility.phone}</div>}
                        <div className="text-xs text-[var(--accent-primary)] font-medium mt-2">
                          {facility.distanceKm} km away
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : null}
          </div>

          {/* Sidebar / List Column */}
          <div className="flex flex-col h-[500px] md:h-[600px]">
            {/* Filters */}
            <div className="bg-[var(--bg-card)] p-4 rounded-t-2xl border-x border-t border-[var(--border)] shadow-sm space-y-4 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search nearby..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      filterType === type 
                        ? 'bg-[var(--accent-primary)] text-white shadow-md' 
                        : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] border-t-0 rounded-b-2xl shadow-xl flex-1 overflow-y-auto p-4 space-y-3">
              {loading && userLocation ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-[var(--accent-primary)]" />
                </div>
              ) : filteredFacilities.length === 0 ? (
                <div className="text-center py-10 text-[var(--text-muted)]">
                  <Building2 className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  <p>No facilities found nearby.</p>
                </div>
              ) : (
                <AnimatePresence>
                  {filteredFacilities.map((facility) => (
                    <motion.div 
                      key={facility.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] hover:border-[var(--accent-primary)] transition-colors cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-1">
                          {facility.name}
                        </h3>
                        <span className="text-xs font-medium bg-[var(--bg-card)] px-2 py-1 rounded text-[var(--text-muted)] shrink-0 ml-2">
                          {facility.distanceKm} km
                        </span>
                      </div>
                      
                      <div className="text-sm text-[var(--text-muted)] mb-3">{facility.type}</div>

                      <div className="space-y-1.5">
                        {facility.address && (
                          <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{facility.address}</span>
                          </div>
                        )}
                        {facility.phone && (
                          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                            <Phone className="w-4 h-4 shrink-0" />
                            <span>{facility.phone}</span>
                          </div>
                        )}
                        {facility.opening_hours && (
                          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                            <Clock className="w-4 h-4 shrink-0" />
                            <span>{facility.opening_hours}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </ParallaxWrapper>
  );
};
