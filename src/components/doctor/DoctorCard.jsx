import React from 'react';
import { Star, MapPin, Award, ArrowRight, Navigation, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const DoctorCard = ({ doctor, onSelect, onBookDirect }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card glass-card-hover rounded-3xl p-5 border border-[var(--border)] shadow-lg flex flex-col justify-between group h-full bg-[var(--bg-card)]"
    >
      <div>
        {/* Doctor Photo & Badges */}
        <div className="relative mb-4">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-full h-48 rounded-2xl object-cover shadow-sm group-hover:scale-[1.02] transition-transform duration-300"
          />
          {doctor.availableToday && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/90 backdrop-blur-md text-white shadow-md flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              Available Today
            </span>
          )}

          {typeof doctor.distanceKm === 'number' && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[var(--accent-primary)] text-white shadow-md flex items-center gap-1">
              <Navigation className="w-3 h-3 text-white fill-white" />
              {doctor.distanceKm} km away
            </span>
          )}

          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-amber-400 flex items-center gap-1 shadow-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {doctor.rating} ({doctor.reviewCount})
          </span>
        </div>

        {/* Doctor Header & Verified Badge */}
        <div className="space-y-1 mb-3">
          <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1.5 flex-wrap">
            <span>{doctor.name}</span>
            {doctor.verified && (
              <span
                className="relative group/tooltip inline-flex items-center"
                title="Qualification verified by SehatSathi."
              >
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/tooltip:block px-2.5 py-1 text-[10px] font-semibold text-white bg-slate-900 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none">
                  Qualification verified by SehatSathi.
                </span>
              </span>
            )}
          </h3>
          <p className="text-xs font-semibold text-[var(--accent-primary)]">{doctor.specialization}</p>
          <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">{doctor.qualification}</p>
        </div>

        {/* Hospital & Experience & Distance */}
        <div className="space-y-1.5 pt-2 border-t border-[var(--border)] text-xs text-[var(--text-muted)] mb-4">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
              <span className="truncate">{doctor.hospital}</span>
            </div>
            {typeof doctor.distanceKm === 'number' && (
              <span className="text-[11px] font-bold text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-0.5 rounded-md border border-[var(--accent-primary)]/30 shrink-0">
                {doctor.distanceKm} km away
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
            <span>{doctor.experience} Years Experience</span>
          </div>
        </div>

        {/* Specialization Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {doctor.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] text-[10px] font-medium text-[var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Fee & Action Buttons */}
      <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block font-bold">
            Consultation Fee
          </span>
          <span className="text-base font-extrabold text-[var(--text-primary)]">₹{doctor.fee}</span>
        </div>

        <div className="flex items-center space-x-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(doctor)}
            className="px-3 py-2 rounded-xl text-xs font-bold text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--accent-primary)] transition-colors"
          >
            Profile
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onBookDirect(doctor)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-95 shadow-md shadow-[var(--accent-primary)]/20 flex items-center gap-1 transition-all group-hover:translate-x-0.5"
          >
            Book <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
