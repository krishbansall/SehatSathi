import React from 'react';
import Modal from '../common/Modal';
import { Star, MapPin, Award, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const DoctorProfileModal = ({ doctor, isOpen, onClose, onBook }) => {
  if (!doctor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Doctor Profile" maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-32 h-32 rounded-2xl object-cover shadow-lg border-2 border-[var(--border)] shrink-0"
          />
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span>{doctor.name}</span>
                {doctor.verified && (
                  <span
                    className="relative group/tooltip inline-flex items-center"
                    title="Qualification verified by SehatSathi."
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/tooltip:block px-2.5 py-1 text-[10px] font-semibold text-white bg-slate-900 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none">
                      Qualification verified by SehatSathi.
                    </span>
                  </span>
                )}
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/30 flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {doctor.rating} ({doctor.reviewCount} verified reviews)
              </span>
            </div>
            <p className="text-sm font-semibold text-[var(--accent-primary)]">{doctor.title}</p>
            <p className="text-xs text-[var(--text-muted)]">{doctor.qualification}</p>
            <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)] pt-1">
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-[var(--accent-primary)]" /> {doctor.experience} Years Exp.
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[var(--accent-primary)]" /> {doctor.hospital}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)]">
          <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">About Doctor</h4>
          <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">{doctor.bio}</p>
        </div>

        {/* Specializations Tags */}
        <div>
          <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Key Clinical Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {doctor.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Weekly Availability Preview Grid */}
        <div>
          <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Weekly Consultation Schedule
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {Object.entries(doctor.weeklySchedule).map(([day, slots]) => (
              <div key={day} className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-center">
                <span className="block text-xs font-bold text-[var(--text-primary)]">{day}</span>
                <span className="block text-[10px] font-semibold text-[var(--accent-primary)] mt-1">
                  {slots.length} Slots Open
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Reviews Highlights */}
        <div>
          <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Recent Patient Feedback</h4>
          <div className="space-y-2">
            {doctor.reviews.map((rev, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[var(--text-primary)]">{rev.patient}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{rev.date}</span>
                </div>
                <p className="text-[var(--text-muted)] italic">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action CTA */}
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <div>
            <span className="text-xs text-[var(--text-muted)] block font-semibold">Consultation Fee</span>
            <span className="text-xl font-extrabold text-[var(--text-primary)]">₹{doctor.fee}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              onClose();
              onBook(doctor);
            }}
            className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-95 shadow-lg shadow-[var(--accent-primary)]/25 transition-all text-sm"
          >
            Proceed to Book Appointment
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default DoctorProfileModal;
