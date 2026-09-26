export const initialPatientProfile = {
  name: 'Aarav Mehta',
  age: 42,
  gender: 'Male',
  bloodGroup: 'O+',
  phone: '+91 98765 43210',
  email: 'aarav.mehta@example.com',
  height: '178 cm',
  weight: '76 kg',
  bmi: '24.0',
  allergies: ['Penicillin', 'Dust Mites'],
  chronicConditions: ['Mild Hypertension', 'Borderline Hyperlipidemia'],
  emergencyContact: {
    name: 'Sunita Mehta (Spouse)',
    relation: 'Spouse',
    phone: '+91 98765 43211'
  }
};

export const initialMedicalRecords = [
  {
    id: 'rec-1',
    date: '2026-09-15',
    doctorName: 'Dr. Rajesh Verma',
    specialization: 'Endocrinology',
    hospital: 'Max Super Speciality Hospital',
    diagnosis: 'Type-2 Diabetes Mellitus (Controlled)',
    category: 'Lab Report',
    title: 'Comprehensive Metabolic & HbA1c Panel',
    summary: 'HbA1c: 6.4%, Fasting Glucose: 110 mg/dL, Postprandial Glucose: 142 mg/dL.',
    prescription: [
      { name: 'Metformin SR', dosage: '500 mg', duration: '30 Days', timing: 'Once daily after dinner' },
      { name: 'Atorvastatin', dosage: '10 mg', duration: '30 Days', timing: 'At night' }
    ],
    fileAttached: 'HbA1c_Panel_Sept2026.pdf',
    fileSize: '1.4 MB'
  },
  {
    id: 'rec-2',
    date: '2026-07-20',
    doctorName: 'Dr. Ananya Sharma',
    specialization: 'Cardiology',
    hospital: 'Fortis Heart Institute',
    diagnosis: 'Routine 12-Lead Electrocardiogram (ECG)',
    category: 'Diagnostic Scan',
    title: 'Resting 12-Lead ECG Report',
    summary: 'Normal sinus rhythm, HR: 72 bpm, PR interval 150 ms, no acute ST-T wave changes.',
    prescription: [],
    fileAttached: 'ECG_Tracing_July2026.pdf',
    fileSize: '2.8 MB'
  },
  {
    id: 'rec-3',
    date: '2026-04-10',
    doctorName: 'Dr. Siddharth Kapoor',
    specialization: 'General Medicine',
    hospital: 'Medanta - The Medicity',
    diagnosis: 'Annual Lipid & Renal Wellness Panel',
    category: 'Lab Report',
    title: 'Lipid Profile & Serum Creatinine',
    summary: 'Total Cholesterol: 195 mg/dL, LDL: 118 mg/dL, HDL: 48 mg/dL, Triglycerides: 152 mg/dL.',
    prescription: [
      { name: 'Telmisartan', dosage: '40 mg', duration: '60 Days', timing: 'Morning' }
    ],
    fileAttached: 'Annual_Wellness_April2026.pdf',
    fileSize: '950 KB'
  }
];
