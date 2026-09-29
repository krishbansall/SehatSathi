import React, { useState, useEffect } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import StatusBadge from '../components/common/StatusBadge';
import ParallaxWrapper from '../components/common/ParallaxWrapper';
import Modal from '../components/common/Modal';
import { 
  User, 
  Calendar, 
  FileText, 
  Pill, 
  HeartPulse, 
  Download, 
  Eye, 
  Plus, 
  Edit3, 
  ShieldCheck, 
  Clock, 
  Building2, 
  FileCheck,
  Phone,
  AlertCircle,
  CalendarX,
  FileQuestion
} from 'lucide-react';
import { motion } from 'framer-motion';

export const PatientDashboard = () => {
  const { user } = useAuth();
  const { appointments, medicalRecords, patientProfile, setPatientProfile, fetchAppointments, fetchRecords } = useAppointments();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('appointments'); // appointments, records, prescriptions, profile
  const [selectedRecordForView, setSelectedRecordForView] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Profile Edit State
  const [editForm, setEditForm] = useState(patientProfile);

  // Load live data when dashboard mounts
  useEffect(() => {
    if (user) {
      fetchAppointments();
      fetchRecords();
    }
  }, [user]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setPatientProfile(editForm);
    addToast('Health profile updated successfully!', 'success');
    setIsEditProfileModalOpen(false);
  };

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* PROFILE HEADER BANNER */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[var(--border)] shadow-xl bg-[var(--bg-card)] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center space-x-5">
            <img
              src={user?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={patientProfile.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-[var(--border)] shadow-lg shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">{patientProfile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                  {patientProfile.bloodGroup} Blood Group
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-medium">
                {patientProfile.age} Yrs • {patientProfile.gender} • {patientProfile.phone}
              </p>
              <div className="flex items-center space-x-3 text-[11px] text-[var(--text-muted)] font-semibold pt-1">
                <span>Height: <strong>{patientProfile.height}</strong></span>
                <span>Weight: <strong>{patientProfile.weight}</strong></span>
                <span>BMI: <strong>{patientProfile.bmi}</strong></span>
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setEditForm(patientProfile);
              setIsEditProfileModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-2xl font-bold text-xs text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--accent-primary)] shadow-sm flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-[var(--accent-primary)]" /> Edit Health Profile
          </motion.button>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="flex space-x-2 bg-[var(--bg-primary)] p-1.5 rounded-2xl border border-[var(--border)] text-xs font-bold overflow-x-auto">
        {[
          { key: 'appointments', label: 'Appointments History', icon: <Calendar className="w-4 h-4" /> },
          { key: 'records', label: 'Medical Records Vault', icon: <FileText className="w-4 h-4" /> },
          { key: 'prescriptions', label: 'Active Prescriptions', icon: <Pill className="w-4 h-4" /> },
          { key: 'profile', label: 'Health Profile Specs', icon: <HeartPulse className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === tab.key ? 'bg-[var(--bg-card)] text-[var(--accent-primary)] shadow-xs font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT 1: APPOINTMENTS HISTORY */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Your Appointment Timeline</h3>
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((apt, idx) => (
                <ParallaxWrapper key={apt.id} delay={idx * 0.1}>
                  <div className="glass-card p-5 rounded-3xl border border-[var(--border)] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--bg-card)]">
                    <div className="flex items-center space-x-4">
                      <img
                        src={apt.doctorPhoto}
                        alt={apt.doctorName}
                        className="w-14 h-14 rounded-2xl object-cover shadow-sm shrink-0 border border-[var(--border)]"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-[var(--text-primary)]">{apt.doctorName}</h4>
                          <StatusBadge status={apt.status} />
                        </div>
                        <p className="text-xs font-semibold text-[var(--accent-primary)]">{apt.doctorSpecialization} • {apt.hospital}</p>
                        <p className="text-xs text-[var(--text-muted)]">Reason: {apt.reason}</p>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end space-y-2 border-t md:border-t-0 pt-3 md:pt-0 border-[var(--border)]">
                      <span className="text-xs font-extrabold text-[var(--text-primary)]">
                        {apt.date} @ {apt.timeSlot}
                      </span>
                      {apt.consultationRecord ? (
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedRecordForView(apt.consultationRecord)}
                          className="px-3 py-1.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 text-xs font-bold flex items-center gap-1.5 border border-[var(--accent-primary)]/30 cursor-pointer"
                        >
                          <FileCheck className="w-4 h-4 text-[var(--accent-primary)]" /> View Consultation Note
                        </motion.button>
                      ) : (
                        <span className="text-[11px] text-[var(--text-muted)] italic">No notes added yet</span>
                      )}
                    </div>
                  </div>
                </ParallaxWrapper>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center rounded-3xl border border-[var(--border)] space-y-3 max-w-md mx-auto my-8 bg-[var(--bg-card)]">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center mx-auto">
                <CalendarX className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-[var(--text-primary)]">No appointments yet</h4>
              <p className="text-xs text-[var(--text-muted)]">Book your first visit to get started with verified clinical care.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: MEDICAL RECORDS VAULT */}
      {activeTab === 'records' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Digital Health Records & Lab Scans</h3>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => addToast('Upload dialog opened! Drag and drop PDF or DICOM scan.', 'info')}
              className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Upload New Record
            </motion.button>
          </div>

          {medicalRecords.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicalRecords.map((rec, idx) => (
                <ParallaxWrapper key={rec.id} delay={idx * 0.1}>
                  <div className="glass-card glass-card-hover p-5 rounded-3xl border border-[var(--border)] shadow-md space-y-4 flex flex-col justify-between bg-[var(--bg-card)]">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border border-[var(--accent-secondary)]/30 uppercase">
                          {rec.category}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] font-semibold">{rec.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-[var(--text-primary)]">{rec.title}</h4>
                      <p className="text-xs text-[var(--accent-primary)] font-semibold">{rec.doctorName} • {rec.specialization}</p>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2">{rec.summary}</p>
                      <p className="text-[10px] text-[var(--text-muted)] font-mono pt-1">Last updated {rec.date}</p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                      <span className="text-[var(--text-muted)] text-[11px] font-mono">{rec.fileAttached} ({rec.fileSize})</span>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => addToast(`Downloading ${rec.fileAttached}...`, 'success')}
                        className="px-3 py-1.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[var(--accent-primary)]" /> PDF
                      </motion.button>
                    </div>
                  </div>
                </ParallaxWrapper>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center rounded-3xl border border-[var(--border)] space-y-3 max-w-md mx-auto my-8 bg-[var(--bg-card)]">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] flex items-center justify-center mx-auto">
                <FileQuestion className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-[var(--text-primary)]">No medical records in vault</h4>
              <p className="text-xs text-[var(--text-muted)]">Upload your first lab report or diagnostic scan to build your health vault.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 3: PRESCRIPTIONS */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Active Prescriptions List</h3>
          {medicalRecords.filter((r) => r.prescription && r.prescription.length > 0).length > 0 ? (
            <div className="space-y-4">
              {medicalRecords.filter((r) => r.prescription && r.prescription.length > 0).map((rec) => (
                <div key={rec.id} className="glass-card p-6 rounded-3xl border border-[var(--border)] shadow-md space-y-4 bg-[var(--bg-card)]">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                    <div>
                      <h4 className="text-base font-bold text-[var(--text-primary)]">Prescribed by {rec.doctorName}</h4>
                      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                        <span>{rec.hospital}</span>
                        <span>•</span>
                        <span className="font-mono">Last updated {rec.date}</span>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => addToast('Print preview generated!', 'info')}
                      className="px-3 py-1.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Print Rx
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {rec.prescription.map((med, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] space-y-1 text-xs">
                        <span className="font-bold text-[var(--text-primary)] block text-sm">{med.name} ({med.dosage})</span>
                        <span className="text-[var(--accent-primary)] font-semibold block">Duration: {med.duration}</span>
                        <span className="text-[var(--text-muted)] block italic">Advice: {med.timing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center rounded-3xl border border-[var(--border)] space-y-3 max-w-md mx-auto my-8 bg-[var(--bg-card)]">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] flex items-center justify-center mx-auto">
                <Pill className="w-7 h-7 opacity-50" />
              </div>
              <h4 className="text-base font-bold text-[var(--text-primary)]">No active prescriptions</h4>
              <p className="text-xs text-[var(--text-muted)]">Consultation prescriptions issued by doctors will appear here automatically.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 4: HEALTH PROFILE */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-[var(--border)] shadow-md space-y-4 bg-[var(--bg-card)]">
            <h4 className="text-base font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-2">Vitals & Anthropometrics</h4>
            <div className="space-y-2 text-xs font-semibold text-[var(--text-muted)]">
              <div className="flex justify-between"><span>Height:</span><span className="text-[var(--text-primary)]">{patientProfile.height}</span></div>
              <div className="flex justify-between"><span>Weight:</span><span className="text-[var(--text-primary)]">{patientProfile.weight}</span></div>
              <div className="flex justify-between"><span>BMI:</span><span className="text-[var(--text-primary)]">{patientProfile.bmi} (Normal Weight)</span></div>
              <div className="flex justify-between"><span>Blood Group:</span><span className="text-[var(--accent-primary)] font-extrabold">{patientProfile.bloodGroup}</span></div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-[var(--border)] shadow-md space-y-4 bg-[var(--bg-card)]">
            <h4 className="text-base font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-2">Known Allergies & Conditions</h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-[var(--text-muted)] block mb-1">Drug & Environmental Allergies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {patientProfile.allergies.map((alg, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[var(--danger)]/15 text-[var(--danger)] font-bold border border-[var(--danger)]/30">
                      {alg}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-bold text-[var(--text-muted)] block mb-1">Chronic Conditions:</span>
                <div className="flex flex-wrap gap-1.5">
                  {patientProfile.chronicConditions.map((cond, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[var(--warning)]/15 text-[var(--warning)] font-bold border border-[var(--warning)]/30">
                      {cond}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW CONSULTATION RECORD MODAL */}
      <Modal
        isOpen={Boolean(selectedRecordForView)}
        onClose={() => setSelectedRecordForView(null)}
        title="Consultation Record Summary"
      >
        {selectedRecordForView && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 space-y-1">
              <span className="font-bold text-[var(--accent-primary)] block text-sm">Diagnosis</span>
              <p className="text-[var(--text-primary)] font-semibold">{selectedRecordForView.diagnosis}</p>
            </div>

            <div>
              <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider block mb-2">Prescribed Medications</span>
              <div className="space-y-2">
                {selectedRecordForView.prescription.map((m, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] flex justify-between font-medium">
                    <span><strong className="text-[var(--text-primary)]">{m.name}</strong> ({m.dosage})</span>
                    <span className="text-[var(--text-muted)]">{m.timing}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedRecordForView.notes && (
              <div>
                <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider block mb-1">Doctor Advice</span>
                <p className="text-[var(--text-muted)] italic p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)]">{selectedRecordForView.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* EDIT PROFILE MODAL */}
      <Modal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        title="Edit Health Profile"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[var(--text-primary)] mb-1">Full Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-[var(--text-primary)] mb-1">Blood Group</label>
              <input
                type="text"
                value={editForm.bloodGroup}
                onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs font-semibold focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-[var(--text-primary)] mb-1">Height</label>
              <input
                type="text"
                value={editForm.height}
                onChange={(e) => setEditForm({ ...editForm, height: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-[var(--text-primary)] mb-1">Weight</label>
              <input
                type="text"
                value={editForm.weight}
                onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-[var(--text-primary)] mb-1">Phone</label>
              <input
                type="text"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs focus:outline-none"
              />
            </div>
          </div>
          <div className="pt-4 border-t border-[var(--border)] flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditProfileModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border)] font-bold cursor-pointer"
            >
              Cancel
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="px-5 py-2 rounded-xl bg-[var(--accent-primary)] text-white font-bold cursor-pointer shadow-md"
            >
              Save Profile
            </motion.button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default PatientDashboard;
