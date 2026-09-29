import React, { useState, useEffect } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import StatusBadge from '../components/common/StatusBadge';
import Drawer from '../components/common/Drawer';
import ParallaxWrapper from '../components/common/ParallaxWrapper';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  FileText, 
  Star, 
  Search,
  SlidersHorizontal,
  Activity,
  Check,
  Building2,
  Stethoscope,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const { appointments, updateAppointmentStatus, updateConsultationRecord, doctors, toggleDoctorSlot, fetchAppointments } = useAppointments();
  const { addToast } = useToast();

  const doctorId = user?.doctorId || 'doc-1';
  const currentDoctor = doctors.find((d) => d.id === doctorId) || doctors[0];

  // Load doctor's real appointments on mount
  useEffect(() => {
    if (user) fetchAppointments();
  }, [user]);

  const [activeTab, setActiveTab] = useState('All'); // All, Today, Pending, Completed, Cancelled
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSavingRecord, setIsSavingRecord] = useState(false);

  // Availability Manager Tab Toggle State
  const [viewMode, setViewMode] = useState('appointments'); // 'appointments' or 'availability'

  // Form State for Consultation Record Builder
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2026-10-15');
  const [prescription, setPrescription] = useState([
    { name: 'Metformin SR', dosage: '500 mg', duration: '30 Days', timing: 'Once daily after dinner' }
  ]);

  const doctorAppointments = appointments.filter((apt) => apt.doctorId === doctorId);

  const filteredAppointments = doctorAppointments.filter((apt) => {
    if (activeTab === 'Today') return apt.date === '2026-09-22' || apt.date === '2026-09-21';
    if (activeTab === 'Pending') return apt.status === 'Pending';
    if (activeTab === 'Completed') return apt.status === 'Completed';
    if (activeTab === 'Cancelled') return apt.status === 'Cancelled';
    return true;
  });

  const todayCount = doctorAppointments.filter((a) => a.date === '2026-09-21' || a.date === '2026-09-22').length;
  const pendingCount = doctorAppointments.filter((a) => a.status === 'Pending').length;
  const totalPatientsCount = doctorAppointments.length + 18;

  const handleOpenDrawer = (apt) => {
    setSelectedAppointment(apt);
    if (apt.consultationRecord) {
      setDiagnosis(apt.consultationRecord.diagnosis || '');
      setNotes(apt.consultationRecord.notes || '');
      setFollowUpDate(apt.consultationRecord.followUpDate || '2026-10-15');
      setPrescription(apt.consultationRecord.prescription || []);
    } else {
      setDiagnosis('Essential Hypertension & Mild Dyslipidemia');
      setNotes('Maintain low sodium diet and 30-min daily exercise.');
      setFollowUpDate('2026-10-15');
      setPrescription([
        { name: 'Telmisartan', dosage: '40 mg', duration: '30 Days', timing: 'Morning' }
      ]);
    }
    setIsDrawerOpen(true);
  };

  const handleAddMedicineRow = () => {
    setPrescription([...prescription, { name: '', dosage: '', duration: '', timing: '' }]);
  };

  const handleRemoveMedicineRow = (index) => {
    setPrescription(prescription.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...prescription];
    updated[index][field] = value;
    setPrescription(updated);
  };

  const handleSaveConsultation = (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    setIsSavingRecord(true);

    setTimeout(() => {
      updateConsultationRecord(selectedAppointment.id, {
        diagnosis,
        prescription,
        notes,
        followUpDate
      });

      setIsSavingRecord(false);
      addToast(`Consultation record saved for ${selectedAppointment.patientName}!`, 'success');
      setIsDrawerOpen(false);
    }, 700);
  };

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={currentDoctor.photo}
            alt={currentDoctor.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--accent-primary)] shadow-md"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
              Welcome, {currentDoctor.name}
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-medium">
              {currentDoctor.title} • {currentDoctor.hospital}
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-[var(--bg-primary)] p-1 rounded-2xl border border-[var(--border)] text-xs font-bold self-start md:self-auto">
          <button
            onClick={() => setViewMode('appointments')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              viewMode === 'appointments' ? 'bg-[var(--bg-card)] text-[var(--accent-primary)] shadow-xs font-bold' : 'text-[var(--text-muted)]'
            }`}
          >
            Appointments Queue
          </button>
          <button
            onClick={() => setViewMode('availability')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              viewMode === 'availability' ? 'bg-[var(--accent-primary)] text-white shadow-xs font-bold' : 'text-[var(--text-muted)]'
            }`}
          >
            Manage Availability Slots
          </button>
        </div>
      </div>

      {/* TOP STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Today's Appointments", value: todayCount, icon: <Calendar className="w-5 h-5 text-[var(--accent-primary)]" /> },
          { label: 'Pending Requests', value: pendingCount, icon: <Clock className="w-5 h-5 text-[var(--warning)]" /> },
          { label: 'Total Patients', value: totalPatientsCount, icon: <Users className="w-5 h-5 text-[var(--accent-secondary)]" /> },
          { label: 'Average Rating', value: `${currentDoctor.rating} ★`, icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> }
        ].map((stat, idx) => (
          <ParallaxWrapper key={stat.label} delay={idx * 0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-3xl border border-[var(--border)] shadow-md flex items-center justify-between bg-[var(--bg-card)]"
            >
              <div>
                <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  {stat.label}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-mono mt-1 block">
                  {stat.value}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] shadow-xs">{stat.icon}</div>
            </motion.div>
          </ParallaxWrapper>
        ))}
      </div>

      {viewMode === 'appointments' ? (
        /* APPOINTMENTS QUEUE TABLE */
        <div className="glass-card rounded-3xl border border-[var(--border)] shadow-xl overflow-hidden space-y-4 p-6 bg-[var(--bg-card)]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Consultation Appointments Queue</h3>

            <div className="flex space-x-1 bg-[var(--bg-primary)] p-1 rounded-xl text-xs font-bold border border-[var(--border)] overflow-x-auto">
              {['All', 'Today', 'Pending', 'Completed', 'Cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === tab ? 'bg-[var(--bg-card)] text-[var(--accent-primary)] shadow-xs font-bold' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[var(--text-primary)]">
              <thead className="bg-[var(--bg-primary)] text-[var(--text-muted)] uppercase tracking-wider font-bold border-b border-[var(--border)]">
                <tr>
                  <th className="p-3.5">Patient Details</th>
                  <th className="p-3.5">Date & Time</th>
                  <th className="p-3.5">Visit Reason</th>
                  <th className="p-3.5">Mode</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] font-medium">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-[var(--bg-primary)] transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-[var(--text-primary)] text-sm">{apt.patientName}</div>
                        <div className="text-[10px] text-[var(--text-muted)]">
                          {apt.patientAge} Yrs • {apt.patientGender} • {apt.patientPhone}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-[var(--text-primary)]">{apt.date}</div>
                        <div className="text-[11px] text-[var(--accent-primary)] font-bold">{apt.timeSlot}</div>
                      </td>
                      <td className="p-3.5 max-w-xs truncate text-[var(--text-muted)]">{apt.reason}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)]">
                          {apt.type}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <StatusBadge status={apt.status} />
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        {apt.status === 'Pending' && (
                          <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              updateAppointmentStatus(apt.id, 'Confirmed');
                              addToast(`Appointment for ${apt.patientName} confirmed!`, 'success');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[var(--accent-secondary)]/15 text-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)]/25 border border-[var(--accent-secondary)]/30 font-bold text-[11px] cursor-pointer"
                          >
                            Confirm
                          </motion.button>
                        )}
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleOpenDrawer(apt)}
                          className="px-3 py-1.5 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-bold text-xs shadow-xs cursor-pointer"
                        >
                          Update Record
                        </motion.button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[var(--text-muted)] italic">
                      No appointments matching tab "{activeTab}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* AVAILABILITY MANAGER GRID */
        <div className="glass-card rounded-3xl border border-[var(--border)] shadow-xl p-6 space-y-6 bg-[var(--bg-card)]">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Weekly Time Slot Availability Manager</h3>
              <p className="text-xs text-[var(--text-muted)]">
                Click cells to toggle time slots on/off for upcoming clinical days.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(currentDoctor.weeklySchedule).map(([day, slots]) => (
              <div key={day} className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                  <span className="font-extrabold text-[var(--text-primary)] text-sm">{day}</span>
                  <span className="text-xs font-bold text-[var(--accent-primary)]">{slots.length} Active Slots</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'].map((slot) => {
                    const isAvailable = slots.includes(slot);
                    return (
                      <button
                        key={slot}
                        onClick={() => toggleDoctorSlot(currentDoctor.id, day, slot)}
                        className={`p-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                          isAvailable
                            ? 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/40'
                            : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] opacity-60'
                        }`}
                      >
                        <span>{slot}</span>
                        {isAvailable && <Check className="w-3.5 h-3.5 text-[var(--accent-primary)]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPOINTMENT DETAIL DRAWER */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedAppointment ? `Update Record: ${selectedAppointment.patientName}` : 'Consultation Record'}
        width="max-w-2xl"
      >
        {selectedAppointment && (
          <form onSubmit={handleSaveConsultation} className="space-y-6">
            <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] space-y-2 text-xs">
              <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider block">Patient Profile</span>
              <div className="grid grid-cols-2 gap-2 font-medium text-[var(--text-primary)]">
                <div><strong>Age/Gender:</strong> {selectedAppointment.patientAge} Yrs / {selectedAppointment.patientGender}</div>
                <div><strong>Reason:</strong> {selectedAppointment.reason}</div>
                <div><strong>Date/Slot:</strong> {selectedAppointment.date} @ {selectedAppointment.timeSlot}</div>
                <div><strong>Status:</strong> <StatusBadge status={selectedAppointment.status} /></div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                Clinical Diagnosis
              </label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g. Type-2 Diabetes mellitus controlled..."
                className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] shadow-xs"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                  Prescription Medicine List
                </label>
                <button
                  type="button"
                  onClick={handleAddMedicineRow}
                  className="px-2.5 py-1 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 text-xs font-bold flex items-center gap-1 border border-[var(--accent-primary)]/30 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Medicine
                </button>
              </div>

              {prescription.map((med, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text-primary)]">Medicine #{idx + 1}</span>
                    {prescription.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicineRow(idx)}
                        className="text-[var(--danger)] hover:opacity-80"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <input
                      type="text"
                      placeholder="Medicine Name"
                      value={med.name}
                      onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                      className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g. 500 mg)"
                      value={med.dosage}
                      onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                      className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g. 30 Days)"
                      value={med.duration}
                      onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)}
                      className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Timing / Advice"
                      value={med.timing}
                      onChange={(e) => handleMedicineChange(idx, 'timing', e.target.value)}
                      className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                  Doctor Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Dietary advice, lifestyle changes..."
                  className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-xs font-medium text-[var(--text-primary)]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-xs font-semibold text-[var(--text-primary)]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border)] cursor-pointer"
              >
                Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={isSavingRecord}
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-95 shadow-md flex items-center gap-1.5 disabled:opacity-75 cursor-pointer"
              >
                {isSavingRecord ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving Record…
                  </>
                ) : (
                  <>
                    Save Record & Complete <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        )}
      </Drawer>

    </div>
  );
};

export default DoctorDashboard;
