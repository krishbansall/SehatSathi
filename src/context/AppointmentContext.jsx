import React, { createContext, useContext, useState, useCallback } from 'react';
import { appointmentAPI, recordAPI } from '../services/api';

// Keep mock data as fallback for demo (doctors page has its own API fetch now)
import { doctorsData as initialDoctors } from '../data/doctorsData';
import { initialPatientProfile } from '../data/patientRecordsData';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments]           = useState([]);
  const [medicalRecords, setMedicalRecords]       = useState([]);
  const [patientProfile, setPatientProfile]       = useState(initialPatientProfile);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);

  // ── Load appointments from API ────────────────────────────────────────────
  const fetchAppointments = useCallback(async (params = {}) => {
    try {
      const res = await appointmentAPI.getAll(params);
      // Normalize _id → id for frontend compatibility
      const normalized = res.data.appointments.map(normalizeApt);
      setAppointments(normalized);
      return normalized;
    } catch (err) {
      console.warn('Could not fetch appointments from API:', err.message);
      return [];
    }
  }, []);

  // ── Book appointment via API ──────────────────────────────────────────────
  const bookAppointment = useCallback(async (bookingData) => {
    const payload = {
      doctorId: bookingData.doctor._id || bookingData.doctor.id,
      date:     bookingData.date,
      timeSlot: bookingData.timeSlot,
      reason:   bookingData.reason,
      type:     bookingData.type || 'In-Clinic',
    };
    const res = await appointmentAPI.book(payload);
    const newApt = normalizeApt(res.data);
    setAppointments(prev => [newApt, ...prev]);
    return newApt;
  }, []);

  // ── Update appointment status via API ─────────────────────────────────────
  const updateAppointmentStatus = useCallback(async (appointmentId, newStatus, extras = {}) => {
    try {
      await appointmentAPI.updateStatus(appointmentId, { status: newStatus, ...extras });
      setAppointments(prev =>
        prev.map(apt => apt.id === appointmentId ? { ...apt, status: newStatus, ...extras } : apt)
      );
    } catch (err) {
      // Optimistic update fallback
      setAppointments(prev =>
        prev.map(apt => apt.id === appointmentId ? { ...apt, status: newStatus } : apt)
      );
    }
  }, []);

  // ── Add consultation record (doctor completes appointment) ────────────────
  const updateConsultationRecord = useCallback(async (appointmentId, recordData) => {
    const targetApt = appointments.find(a => a.id === appointmentId);

    // Update appointment status
    await updateAppointmentStatus(appointmentId, 'Completed', {
      doctorNotes:  recordData.notes || recordData.diagnosis,
      prescription: recordData.prescription || [],
    });

    // Save a medical record
    if (targetApt) {
      try {
        const formData = new FormData();
        formData.append('title',          `Consultation with ${targetApt.doctorName}`);
        formData.append('category',       'Prescription');
        formData.append('diagnosis',      recordData.diagnosis || '');
        formData.append('summary',        recordData.notes || recordData.diagnosis || '');
        formData.append('doctorName',     targetApt.doctorName);
        formData.append('specialization', targetApt.doctorSpecialization);
        formData.append('hospital',       targetApt.hospital || '');
        formData.append('date',           new Date().toISOString().split('T')[0]);
        if (recordData.prescription) {
          formData.append('prescription', JSON.stringify(recordData.prescription));
        }
        const recRes = await recordAPI.create(formData);
        setMedicalRecords(prev => [recRes.data, ...prev]);
      } catch (err) {
        console.warn('Record save failed:', err.message);
      }
    }
  }, [appointments, updateAppointmentStatus]);

  // ── Load medical records from API ─────────────────────────────────────────
  const fetchRecords = useCallback(async (params = {}) => {
    try {
      const res = await recordAPI.getAll(params);
      setMedicalRecords(res.data.records);
      return res.data.records;
    } catch (err) {
      console.warn('Could not fetch records from API:', err.message);
      return [];
    }
  }, []);

  // ── Add a medical record directly ─────────────────────────────────────────
  const addMedicalRecord = useCallback(async (formData) => {
    const res = await recordAPI.create(formData);
    setMedicalRecords(prev => [res.data, ...prev]);
    return res.data;
  }, []);

  // ── Delete a medical record ───────────────────────────────────────────────
  const deleteMedicalRecord = useCallback(async (recordId) => {
    await recordAPI.delete(recordId);
    setMedicalRecords(prev => prev.filter(r => (r._id || r.id) !== recordId));
  }, []);

  // ── Doctor slot toggle (local state for doctor dashboard) ─────────────────
  const toggleDoctorSlot = useCallback((doctorId, day, slot) => {
    // This operates on local doctor state in DoctorSearch
    // Doctor profile updates go through doctorAPI.updateProfile directly
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        medicalRecords,
        patientProfile,
        setPatientProfile,
        selectedDoctorForBooking,
        setSelectedDoctorForBooking,
        fetchAppointments,
        bookAppointment,
        updateAppointmentStatus,
        updateConsultationRecord,
        fetchRecords,
        addMedicalRecord,
        deleteMedicalRecord,
        toggleDoctorSlot,
        // Keep doctors fallback for any component that still reads it
        doctors: initialDoctors,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

// ── Normalize backend appointment (_id → id) ──────────────────────────────────
function normalizeApt(apt) {
  return {
    ...apt,
    id: apt._id || apt.id,
  };
}

export const useAppointments = () => useContext(AppointmentContext);
