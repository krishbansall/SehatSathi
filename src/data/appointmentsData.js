export const initialAppointments = [
  {
    id: 'apt-101',
    patientName: 'Aarav Mehta',
    patientAge: 42,
    patientGender: 'Male',
    patientPhone: '+91 98765 43210',
    patientEmail: 'aarav.mehta@example.com',
    doctorId: 'doc-1',
    doctorName: 'Dr. Ananya Sharma',
    doctorSpecialization: 'Cardiology',
    doctorPhoto: 'https://images.unsplash.com/photo-1594824813566-7885a3964478?auto=format&fit=crop&w=600&q=80',
    hospital: 'Fortis Heart Institute, New Delhi',
    date: '2026-09-22',
    timeSlot: '10:30 AM',
    reason: 'Quarterly cardiovascular review & cholesterol checkup.',
    type: 'In-Clinic',
    fee: 850,
    status: 'Confirmed', // Pending, Confirmed, Completed, Cancelled
    createdAt: '2026-09-20'
  },
  {
    id: 'apt-102',
    patientName: 'Sneha Roy',
    patientAge: 35,
    patientGender: 'Female',
    patientPhone: '+91 91234 56789',
    patientEmail: 'sneha.roy@example.com',
    doctorId: 'doc-1',
    doctorName: 'Dr. Ananya Sharma',
    doctorSpecialization: 'Cardiology',
    doctorPhoto: 'https://images.unsplash.com/photo-1594824813566-7885a3964478?auto=format&fit=crop&w=600&q=80',
    hospital: 'Fortis Heart Institute, New Delhi',
    date: '2026-09-21',
    timeSlot: '02:00 PM',
    reason: 'Mild chest tightness after physical exertion.',
    type: 'Online',
    fee: 850,
    status: 'Pending',
    createdAt: '2026-09-21'
  },
  {
    id: 'apt-103',
    patientName: 'Aarav Mehta',
    patientAge: 42,
    patientGender: 'Male',
    patientPhone: '+91 98765 43210',
    patientEmail: 'aarav.mehta@example.com',
    doctorId: 'doc-2',
    doctorName: 'Dr. Rajesh Verma',
    doctorSpecialization: 'Endocrinology',
    doctorPhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    hospital: 'Max Super Speciality Hospital',
    date: '2026-09-15',
    timeSlot: '11:30 AM',
    reason: 'Fasting blood sugar consultation and HbA1c review.',
    type: 'In-Clinic',
    fee: 900,
    status: 'Completed',
    consultationRecord: {
      diagnosis: 'Type-2 Diabetes mellitus well-controlled under lifestyle + Metformin 500mg.',
      prescription: [
        { name: 'Metformin SR', dosage: '500 mg', duration: '30 Days', timing: 'Once daily after dinner' },
        { name: 'Atorvastatin', dosage: '10 mg', duration: '30 Days', timing: 'At night' }
      ],
      notes: 'Continue 30-min brisk walk daily. Recheck HbA1c in 3 months.',
      followUpDate: '2026-12-15'
    },
    createdAt: '2026-09-10'
  },
  {
    id: 'apt-104',
    patientName: 'Karan Sharma',
    patientAge: 51,
    patientGender: 'Male',
    patientPhone: '+91 97654 32109',
    patientEmail: 'karan.s@example.com',
    doctorId: 'doc-4',
    doctorName: 'Dr. Siddharth Kapoor',
    doctorSpecialization: 'General Medicine',
    doctorPhoto: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    hospital: 'Medanta - The Medicity',
    date: '2026-09-10',
    timeSlot: '04:00 PM',
    reason: 'Annual executive health check-up evaluation.',
    type: 'In-Clinic',
    fee: 600,
    status: 'Completed',
    consultationRecord: {
      diagnosis: 'Mild Essential Hypertension. Vitals stable.',
      prescription: [
        { name: 'Telmisartan', dosage: '40 mg', duration: '60 Days', timing: 'Morning' }
      ],
      notes: 'Reduce dietary sodium intake. Monitor blood pressure weekly.',
      followUpDate: '2026-11-10'
    },
    createdAt: '2026-09-08'
  }
];
