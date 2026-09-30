import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../context/AppointmentContext';
import { useToast } from '../context/ToastContext';
import { doctorsData } from '../data/doctorsData';
import ParallaxWrapper from '../components/common/ParallaxWrapper';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Stethoscope,
  Video,
  Building2,
  FileText,
  Sparkles,
  Download,
  CalendarPlus,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BookAppointment = () => {
  const navigate = useNavigate();
  const { selectedDoctorForBooking, setSelectedDoctorForBooking, bookAppointment, patientProfile } = useAppointments();
  const { addToast } = useToast();

  const doctor = selectedDoctorForBooking || doctorsData[0];

  const [step, setStep] = useState(1); // 1: Doctor Select/Review, 2: Date & Slot, 3: Confirm, 4: Success
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();
      const isoDate = d.toISOString().split('T')[0];
      dates.push({ isoDate, dayName, monthName, dayNum });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState(availableDates[0].isoDate);
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [timeCategory, setTimeCategory] = useState('Morning'); // Morning, Afternoon, Evening
  const [consultationType, setConsultationType] = useState('In-Clinic'); // In-Clinic or Online
  const [visitReason, setVisitReason] = useState('Routine health checkup & advice');
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  const timeSlots = {
    Morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    Afternoon: ['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'],
    Evening: ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM']
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newApt = bookAppointment({
        doctor,
        date: selectedDate,
        timeSlot: selectedSlot,
        reason: visitReason,
        type: consultationType,
        patientName: patientProfile.name,
        patientPhone: patientProfile.phone,
        patientEmail: patientProfile.email
      });

      setConfirmedAppointment(newApt);
      setIsSubmitting(false);
      addToast('Appointment request sent — status: Pending', 'info');
      setStep(4);
    }, 800);
  };

  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Animated Step Progress Indicator */}
      <div className="glass-card p-4 rounded-3xl border border-[var(--border)] shadow-md bg-[var(--bg-card)]">
        <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] mb-2">
          <span className={step >= 1 ? 'text-[var(--accent-primary)]' : ''}>1. Selected Specialist</span>
          <span className={step >= 2 ? 'text-[var(--accent-primary)]' : ''}>2. Date & Time Slot</span>
          <span className={step >= 3 ? 'text-[var(--accent-primary)]' : ''}>3. Patient Confirm</span>
          <span className={step === 4 ? 'text-[var(--success)]' : ''}>4. Confirmed</span>
        </div>
        <div className="w-full bg-[var(--bg-primary)] h-2 rounded-full overflow-hidden border border-[var(--border)]">
          <motion.div
            initial={{ width: '25%' }}
            animate={{ width: `${step * 25}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: SELECTED DOCTOR SUMMARY CARD */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 rounded-3xl border border-[var(--border)] shadow-xl space-y-6 bg-[var(--bg-card)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                  Step 1 — Selected Specialist
                </span>
                <button
                  onClick={() => navigate('/doctors')}
                  className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--accent-primary)]"
                >
                  Change Doctor
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-28 h-28 rounded-2xl object-cover shadow-md border-2 border-[var(--border)]"
                />
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{doctor.name}</h3>
                  <p className="text-xs font-semibold text-[var(--accent-primary)]">{doctor.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{doctor.qualification}</p>
                  <p className="text-xs text-[var(--text-muted)] font-medium">{doctor.hospital}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-xs font-bold border border-[var(--accent-primary)]/30">
                    Consultation Fee: ₹{doctor.fee}
                  </span>
                </div>
              </div>

              {/* Consultation Type Switch */}
              <div className="pt-4 border-t border-[var(--border)]">
                <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                  Select Consultation Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConsultationType('In-Clinic')}
                    className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      consultationType === 'In-Clinic'
                        ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-[var(--accent-primary)] shadow-sm'
                        : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border-[var(--border)]'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[var(--accent-primary)]" /> In-Clinic Visit
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConsultationType('Online')}
                    className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      consultationType === 'Online'
                        ? 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)] shadow-sm'
                        : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border-[var(--border)]'
                    }`}
                  >
                    <Video className="w-4 h-4 text-[var(--accent-secondary)]" /> Online Tele-Consult
                  </motion.button>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex justify-end">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-95 shadow-md flex items-center gap-2 text-xs cursor-pointer"
                >
                  Proceed to Select Date & Time <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: DATE PICKER & TIME SLOT GRID */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 rounded-3xl border border-[var(--border)] shadow-xl space-y-6 bg-[var(--bg-card)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                  Step 2 — Select Appointment Slot
                </span>
                <span className="text-xs font-semibold text-[var(--text-muted)]">{doctor.name}</span>
              </div>

              {/* Horizontal Date Picker Strip */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">
                  Select Date (Upcoming 7 Days)
                </label>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {availableDates.map((d) => (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      key={d.isoDate}
                      onClick={() => setSelectedDate(d.isoDate)}
                      className={`min-w-[80px] p-3 rounded-2xl border text-center transition-all flex flex-col items-center shrink-0 cursor-pointer ${
                        selectedDate === d.isoDate
                          ? 'bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white border-transparent shadow-lg scale-105'
                          : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--accent-primary)]'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold opacity-80">{d.dayName}</span>
                      <span className="text-lg font-extrabold my-0.5">{d.dayNum}</span>
                      <span className="text-[10px] uppercase font-semibold">{d.monthName}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Time Category Tabs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    Available Time Slots
                  </label>
                  <div className="flex bg-[var(--bg-primary)] p-1 rounded-xl text-xs font-bold border border-[var(--border)]">
                    {['Morning', 'Afternoon', 'Evening'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setTimeCategory(cat)}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          timeCategory === cat ? 'bg-[var(--bg-card)] text-[var(--accent-primary)] shadow-xs font-bold' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots[timeCategory].map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-md'
                            : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--accent-primary)]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {slot}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-2xl font-bold text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border)] hover:bg-[var(--accent-primary)]/10 flex items-center gap-1.5 text-xs cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-95 shadow-md flex items-center gap-2 text-xs cursor-pointer"
                >
                  Proceed to Patient Confirmation <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: PATIENT CONFIRMATION FORM */}
        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 rounded-3xl border border-[var(--border)] shadow-xl space-y-6 bg-[var(--bg-card)]">
              <div className="border-b border-[var(--border)] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                  Step 3 — Patient Details & Visit Purpose
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] space-y-3">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Patient Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-[var(--text-primary)]">
                  <div><strong>Name:</strong> {patientProfile.name}</div>
                  <div><strong>Age / Gender:</strong> {patientProfile.age} Yrs / {patientProfile.gender}</div>
                  <div><strong>Phone:</strong> {patientProfile.phone}</div>
                  <div><strong>Email:</strong> {patientProfile.email}</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                  Reason for Visit / Symptoms
                </label>
                <textarea
                  rows={3}
                  value={visitReason}
                  onChange={(e) => setVisitReason(e.target.value)}
                  placeholder="Describe your current symptoms or purpose of consultation..."
                  className="w-full p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] shadow-xs"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 space-y-2 text-xs">
                <div className="flex justify-between font-semibold text-[var(--text-primary)]">
                  <span>Specialist:</span>
                  <span>{doctor.name} ({doctor.specialization})</span>
                </div>
                <div className="flex justify-between font-semibold text-[var(--text-primary)]">
                  <span>Scheduled Date & Time:</span>
                  <span className="text-[var(--accent-primary)] font-bold">{selectedDate} @ {selectedSlot}</span>
                </div>
                <div className="flex justify-between font-semibold text-[var(--text-primary)]">
                  <span>Consultation Mode:</span>
                  <span>{consultationType}</span>
                </div>
                <div className="pt-2 border-t border-[var(--accent-primary)]/30 flex justify-between font-extrabold text-sm text-[var(--text-primary)]">
                  <span>Total Payable:</span>
                  <span>₹{doctor.fee}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <button
                  disabled={isSubmitting}
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-2xl font-bold text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border)] hover:bg-[var(--accent-primary)]/10 flex items-center gap-1.5 text-xs disabled:opacity-50 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                  onClick={handleConfirm}
                  className="px-8 py-3.5 rounded-2xl font-extrabold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-95 shadow-xl shadow-[var(--accent-primary)]/30 flex items-center gap-2 text-sm disabled:opacity-75 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Processing Booking…
                    </>
                  ) : (
                    <>
                      Confirm & Request Booking <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: SUCCESS SCREEN */}
        {step === 4 && confirmedAppointment && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 text-center"
          >
            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[var(--border)] shadow-2xl space-y-6 max-w-xl mx-auto bg-[var(--bg-card)]">
              
              <div className="w-24 h-24 rounded-full bg-[var(--success)]/15 text-[var(--success)] flex items-center justify-center mx-auto shadow-inner">
                <svg className="w-12 h-12" viewBox="0 0 50 50" fill="none">
                  <motion.circle
                    cx="25"
                    cy="25"
                    r="22"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M15 25L22 32L35 17"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                  />
                </svg>
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/30 inline-block">
                  Status: Pending Doctor Confirmation
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                  Appointment Request Sent!
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                  Booking ID: <strong className="font-mono text-[var(--accent-primary)]">{confirmedAppointment.id}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)] font-semibold">Doctor:</span>
                  <span className="font-bold text-[var(--text-primary)]">{confirmedAppointment.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)] font-semibold">Date & Slot:</span>
                  <span className="font-bold text-[var(--accent-primary)]">{confirmedAppointment.date} @ {confirmedAppointment.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)] font-semibold">Location:</span>
                  <span className="font-semibold text-[var(--text-primary)]">{confirmedAppointment.hospital}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => addToast('Appointment added to calendar file (.ics)!', 'success')}
                  className="py-3 px-4 rounded-2xl font-bold text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border)] hover:bg-[var(--accent-primary)]/10 flex items-center justify-center gap-2 text-xs"
                >
                  <CalendarPlus className="w-4 h-4 text-[var(--accent-primary)]" /> Add to Calendar
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/patient-dashboard')}
                  className="py-3 px-4 rounded-2xl font-bold text-white bg-[var(--accent-primary)] hover:opacity-95 flex items-center justify-center gap-2 text-xs shadow-md"
                >
                  View My Appointments <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default BookAppointment;
