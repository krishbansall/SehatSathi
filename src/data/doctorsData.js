export const doctorsData = [
  // --- CLUSTER 1: Within 2 km of Ghaziabad Center (28.6692° N, 77.4538° E) ---
  {
    id: 'doc-1',
    name: 'Dr. Ananya Sharma',
    title: 'Senior Cardiologist & FL Research Advisor',
    specialization: 'Cardiology',
    qualification: 'MD, DM (Cardiology) - AIIMS New Delhi',
    experience: 14,
    rating: 4.9,
    reviewCount: 184,
    fee: 850,
    verified: true,
    hospital: 'Fortis Heart Institute, Kavi Nagar',
    location: { type: 'Point', coordinates: [77.4560, 28.6705] }, // ~0.3 km away
    availableToday: true,
    photo: 'https://images.unsplash.com/photo-1594824813566-7885a3964478?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Ananya Sharma is a renowned cardiologist specializing in preventive cardiovascular care and AI-assisted early risk detection. She advocates privacy-preserving federated clinical trials.',
    tags: ['Heart Failure', 'Preventive Cardiology', 'ECG Analysis', 'Hypertension'],
    weeklySchedule: {
      'Mon': ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'],
      'Tue': ['09:30 AM', '11:00 AM', '03:00 PM'],
      'Wed': ['09:00 AM', '10:00 AM', '01:30 PM', '05:00 PM'],
      'Thu': ['10:00 AM', '02:30 PM', '04:00 PM'],
      'Fri': ['09:00 AM', '11:30 AM', '03:30 PM'],
      'Sat': ['10:00 AM', '01:00 PM']
    },
    reviews: [
      { patient: 'Rohan Gupta', rating: 5, date: '2 days ago', comment: 'Extremely empathetic and thorough doctor. Explains cardiac vitals in detail!' },
      { patient: 'Priya Nair', rating: 5, date: '1 week ago', comment: 'Prompt response and accurate guidance on my cholesterol management plan.' }
    ]
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Verma',
    title: 'Chief Endocrinologist & Diabetologist',
    specialization: 'Endocrinology',
    qualification: 'MD (General Medicine), FRCP (London)',
    experience: 18,
    rating: 4.8,
    reviewCount: 210,
    fee: 900,
    verified: true,
    hospital: 'Max Super Speciality Clinic, Raj Nagar',
    location: { type: 'Point', coordinates: [77.4510, 28.6740] }, // ~0.6 km away
    availableToday: true,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Pioneer in metabolic syndrome management and continuous glucose monitoring protocols. Active contributor to digital health federated risk modeling.',
    tags: ['Diabetes Mellitus', 'Thyroid Disorders', 'Metabolic Syndrome', 'Insulin Therapy'],
    weeklySchedule: {
      'Mon': ['10:00 AM', '11:30 AM', '03:00 PM'],
      'Tue': ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'],
      'Wed': ['11:00 AM', '03:30 PM'],
      'Thu': ['09:30 AM', '11:00 AM', '01:30 PM', '05:00 PM'],
      'Fri': ['10:00 AM', '02:00 PM'],
      'Sat': ['09:00 AM', '12:00 PM']
    },
    reviews: [
      { patient: 'Sunita Reddy', rating: 5, date: '3 days ago', comment: 'Transformed my HbA1c from 8.5 to 6.2 in 4 months with minimal medication change.' }
    ]
  },
  {
    id: 'doc-3',
    name: 'Dr. Sunita Rao',
    title: 'Senior Pulmonologist & Asthma Care Specialist',
    specialization: 'Pulmonology',
    qualification: 'MD (Pulmonary Medicine) - MAMC New Delhi',
    experience: 12,
    rating: 4.85,
    reviewCount: 165,
    fee: 700,
    verified: true,
    hospital: 'Yashoda Super Speciality Hospital, Nehru Nagar',
    location: { type: 'Point', coordinates: [77.4430, 28.6730] }, // ~1.1 km away
    availableToday: true,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in respiratory allergies, asthma management, and post-viral recovery telemetry.',
    tags: ['Asthma Care', 'COPD', 'Bronchoscopy', 'Pulmonary Fibrosis'],
    weeklySchedule: {
      'Mon': ['09:00 AM', '11:00 AM', '02:00 PM'],
      'Wed': ['10:00 AM', '01:00 PM', '04:00 PM'],
      'Fri': ['09:00 AM', '12:00 PM']
    },
    reviews: [
      { patient: 'Vikas Sharma', rating: 5, date: '4 days ago', comment: 'Clear treatment plan and zero unnecessary diagnostic tests.' }
    ]
  },
  {
    id: 'doc-4',
    name: 'Dr. Siddharth Kapoor',
    title: 'Senior General Physician & Wellness Consultant',
    specialization: 'General Medicine',
    qualification: 'MD (Internal Medicine) - KGMU Lucknow',
    experience: 9,
    rating: 4.7,
    reviewCount: 96,
    fee: 600,
    verified: false,
    hospital: 'Columbia Asia Clinic, Shastri Nagar',
    location: { type: 'Point', coordinates: [77.4620, 28.6620] }, // ~1.1 km away
    availableToday: true,
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    bio: 'Comprehensive internal medicine practitioner focusing on holistic lifestyle modifications, preventative wellness checks, and patient record continuity.',
    tags: ['Preventive Care', 'Viral Fevers', 'Hypertension', 'Routine Checkups'],
    weeklySchedule: {
      'Mon': ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
      'Tue': ['09:00 AM', '10:30 AM', '02:30 PM', '04:00 PM'],
      'Wed': ['09:30 AM', '11:00 AM', '03:00 PM'],
      'Thu': ['09:00 AM', '10:00 AM', '02:00 PM', '04:30 PM'],
      'Fri': ['10:00 AM', '01:00 PM', '03:30 PM'],
      'Sat': ['09:00 AM', '01:00 PM']
    },
    reviews: [
      { patient: 'Ayesha Khan', rating: 5, date: '1 day ago', comment: 'Great listener! Did not rush through the consultation and answered all my questions.' }
    ]
  },
  {
    id: 'doc-5',
    name: 'Dr. Amit Bansal',
    title: 'Consultant Pediatrician & Neonatologist',
    specialization: 'Pediatrics',
    qualification: 'MD (Pediatrics) - LHMC Delhi',
    experience: 15,
    rating: 4.9,
    reviewCount: 230,
    fee: 650,
    verified: true,
    hospital: 'Sanjeevani Child Care, Patel Nagar',
    location: { type: 'Point', coordinates: [77.4470, 28.6600] }, // ~1.2 km away
    availableToday: false,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Dedicated pediatrician providing comprehensive child immunization, growth monitoring, and pediatric nutrition guidance.',
    tags: ['Child Immunization', 'Pediatric Care', 'Growth Monitoring', 'Neonatology'],
    weeklySchedule: {
      'Tue': ['10:00 AM', '12:00 PM', '04:00 PM'],
      'Thu': ['09:00 AM', '11:30 AM', '03:00 PM'],
      'Sat': ['10:00 AM', '02:00 PM']
    },
    reviews: [
      { patient: 'Meenakshi Jain', rating: 5, date: '3 days ago', comment: 'Dr. Bansal is wonderfully gentle with kids.' }
    ]
  },

  // --- CLUSTER 2: Within 5–10 km of Ghaziabad Center ---
  {
    id: 'doc-6',
    name: 'Dr. Meera Deshmukh',
    title: 'Consultant Pulmonologist & Critical Care Specialist',
    specialization: 'Pulmonology',
    qualification: 'MBBS, DNB (Pulmonary Medicine), FCCP',
    experience: 11,
    rating: 4.9,
    reviewCount: 142,
    fee: 750,
    verified: true,
    hospital: 'Apollo Clinic, Vasundhara',
    location: { type: 'Point', coordinates: [77.3980, 28.6630] }, // ~5.5 km away
    availableToday: false,
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in asthma, COPD, and sleep apnea. Passionate about leveraging privacy-first telemetry for early respiratory infection alerts.',
    tags: ['Asthma Management', 'COPD', 'Sleep Apnea', 'Allergy Care'],
    weeklySchedule: {
      'Mon': ['11:00 AM', '02:00 PM'],
      'Tue': ['10:00 AM', '01:00 PM', '04:00 PM'],
      'Wed': ['09:00 AM', '11:30 AM', '03:00 PM'],
      'Thu': ['10:30 AM', '02:30 PM'],
      'Fri': ['09:00 AM', '12:00 PM', '04:30 PM'],
      'Sat': ['11:00 AM', '02:00 PM']
    },
    reviews: [
      { patient: 'Vikram Singh', rating: 5, date: '5 days ago', comment: 'Very systematic diagnostic approach. Friendly staff and minimal waiting time.' }
    ]
  },
  {
    id: 'doc-7',
    name: 'Dr. Rakesh Tyagi',
    title: 'Senior Orthopedic & Joint Replacement Surgeon',
    specialization: 'Orthopedics',
    qualification: 'MS (Orthopedics) - AIIMS New Delhi',
    experience: 17,
    rating: 4.88,
    reviewCount: 195,
    fee: 800,
    verified: true,
    hospital: 'Vrindavan Ortho Center, Crossings Republik',
    location: { type: 'Point', coordinates: [77.4320, 28.6210] }, // ~5.8 km away
    availableToday: true,
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    bio: 'Expert in arthroscopy, robotic knee replacement, and sports trauma rehabilitation.',
    tags: ['Joint Replacement', 'Arthroscopy', 'Spine Care', 'Fracture Care'],
    weeklySchedule: {
      'Mon': ['10:00 AM', '01:00 PM', '05:00 PM'],
      'Thu': ['09:30 AM', '12:30 PM', '04:00 PM']
    },
    reviews: [
      { patient: 'Deepak Chaudhary', rating: 5, date: '1 week ago', comment: 'Successful knee replacement. Walking pain-free now!' }
    ]
  },
  {
    id: 'doc-8',
    name: 'Dr. Kavita Menon',
    title: 'Consultant Neurologist',
    specialization: 'Neurology',
    qualification: 'DM (Neurology) - NIMHANS Bengaluru',
    experience: 16,
    rating: 4.95,
    reviewCount: 310,
    fee: 1100,
    verified: true,
    hospital: 'Narayana Neuro Center, Mohan Nagar',
    location: { type: 'Point', coordinates: [77.3880, 28.6810] }, // ~6.6 km away
    availableToday: false,
    photo: 'https://images.unsplash.com/photo-1594824813566-7885a3964478?auto=format&fit=crop&w=600&q=80',
    bio: 'Expert in stroke prevention, migraine protocols, and neuro-degenerative disorders. Dedicated to patient education and clinical research.',
    tags: ['Migraine', 'Epilepsy', 'Neuropathy', 'Stroke Rehabilitation'],
    weeklySchedule: {
      'Mon': ['10:30 AM', '02:30 PM'],
      'Wed': ['09:30 AM', '11:30 AM', '03:30 PM'],
      'Fri': ['10:00 AM', '02:00 PM', '04:30 PM']
    },
    reviews: [
      { patient: 'Amitabh Sen', rating: 5, date: '4 days ago', comment: 'Top-tier diagnosis. Extremely knowledgeable in neurological wellness.' }
    ]
  },
  {
    id: 'doc-9',
    name: 'Dr. Alok Tripathi',
    title: 'Senior Dermatologist & Cosmetologist',
    specialization: 'Dermatology',
    qualification: 'MD (Dermatology) - KGMU Lucknow',
    experience: 13,
    rating: 4.82,
    reviewCount: 178,
    fee: 750,
    verified: false,
    hospital: 'Max Super Speciality Hospital, Vaishali',
    location: { type: 'Point', coordinates: [77.3820, 28.6470] }, // ~7.4 km away
    availableToday: true,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Specializing in clinical dermatology, acne protocols, laser therapies, and anti-aging treatments.',
    tags: ['Acne Treatment', 'Eczema & Psoriasis', 'Laser Therapy', 'Skin Rejuvenation'],
    weeklySchedule: {
      'Mon': ['11:00 AM', '03:00 PM'],
      'Tue': ['10:00 AM', '02:00 PM', '05:00 PM'],
      'Fri': ['09:30 AM', '01:30 PM']
    },
    reviews: [
      { patient: 'Ritika Goel', rating: 5, date: '2 days ago', comment: 'Extremely polite and effective skin care guidance.' }
    ]
  },
  {
    id: 'doc-10',
    name: 'Dr. Priyanka Joshi',
    title: 'Consultant ENT & Head-Neck Surgeon',
    specialization: 'ENT',
    qualification: 'MS (Otorhinolaryngology) - UCMS Delhi',
    experience: 10,
    rating: 4.76,
    reviewCount: 112,
    fee: 650,
    verified: true,
    hospital: 'Shanti Gopal Hospital, Indirapuram',
    location: { type: 'Point', coordinates: [77.3710, 28.6380] }, // ~8.8 km away
    availableToday: true,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in sinus allergy management, endoscopic ear surgery, and vertigo treatment.',
    tags: ['Sinusitis', 'Hearing Evaluation', 'Tonsillectomy', 'Vertigo Care'],
    weeklySchedule: {
      'Mon': ['09:30 AM', '11:30 AM', '03:30 PM'],
      'Thu': ['10:00 AM', '02:00 PM']
    },
    reviews: [
      { patient: 'Sanjay Rastogi', rating: 5, date: '1 week ago', comment: 'Quick sinus relief after prescribed therapy.' }
    ]
  },
  {
    id: 'doc-11',
    name: 'Dr. Vikram Malhotra',
    title: 'Chief Gastroenterologist & Hepatologist',
    specialization: 'Gastroenterology',
    qualification: 'DM (Gastroenterology) - PGI Chandigarh',
    experience: 19,
    rating: 4.91,
    reviewCount: 280,
    fee: 950,
    verified: true,
    hospital: 'Sahibabad Medical Center, Sahibabad',
    location: { type: 'Point', coordinates: [77.3580, 28.6840] }, // ~9.5 km away
    availableToday: false,
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    bio: 'Leading expert in IBS treatment, liver disease management, and diagnostic endoscopy.',
    tags: ['IBS & Acid Reflux', 'Liver Care', 'Endoscopy', 'Fatty Liver'],
    weeklySchedule: {
      'Wed': ['10:00 AM', '01:00 PM', '04:00 PM'],
      'Sat': ['09:00 AM', '12:00 PM']
    },
    reviews: [
      { patient: 'Harish Kumar', rating: 5, date: '3 days ago', comment: 'Very experienced gastroenterologist.' }
    ]
  },
  {
    id: 'doc-12',
    name: 'Dr. Neha Agarwal',
    title: 'Senior Obstetrician & Gynecologist',
    specialization: 'Gynecology',
    qualification: 'MD, DNB (Obstetrics & Gynaecology) - AIIMS',
    experience: 14,
    rating: 4.87,
    reviewCount: 205,
    fee: 800,
    verified: false,
    hospital: 'Max Medcentre, Kaushambi',
    location: { type: 'Point', coordinates: [77.3240, 28.6480] }, // ~9.8 km away
    availableToday: true,
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
    bio: 'Expert in high-risk pregnancy care, PCOS management, and laparoscopic gynecological surgeries.',
    tags: ['PCOS Care', 'Pregnancy Management', 'Laparoscopy', 'Infertility'],
    weeklySchedule: {
      'Mon': ['10:00 AM', '02:00 PM'],
      'Tue': ['09:00 AM', '01:00 PM', '04:00 PM'],
      'Fri': ['10:00 AM', '03:00 PM']
    },
    reviews: [
      { patient: 'Pooja Varma', rating: 5, date: '5 days ago', comment: 'Compassionate care throughout my pregnancy.' }
    ]
  },

  // --- CLUSTER 3: Rest at 12–18 km of Ghaziabad Center ---
  {
    id: 'doc-13',
    name: 'Dr. Tarun Mehta',
    title: 'Senior Urologist & Kidney Transplant Specialist',
    specialization: 'Urology',
    qualification: 'MCh (Urology) - MAMC New Delhi',
    experience: 16,
    rating: 4.84,
    reviewCount: 154,
    fee: 1000,
    verified: true,
    hospital: 'Fortis Hospital, Noida Sector 62',
    location: { type: 'Point', coordinates: [77.3680, 28.6180] }, // ~10.5 km away
    availableToday: true,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in kidney stone laser surgery, prostate enlargement treatments, and minimally invasive urology.',
    tags: ['Kidney Stones', 'Prostate Care', 'Urodynamics', 'Renal Health'],
    weeklySchedule: {
      'Mon': ['09:00 AM', '12:00 PM'],
      'Thu': ['02:00 PM', '05:00 PM']
    },
    reviews: [
      { patient: 'Satish Singhal', rating: 5, date: '1 week ago', comment: 'Painless laser procedure for kidney stone.' }
    ]
  },
  {
    id: 'doc-14',
    name: 'Dr. Shalini Saxena',
    title: 'Consultant Ophthalmologist & Cataract Surgeon',
    specialization: 'Ophthalmology',
    qualification: 'MS (Ophthalmology) - RP Centre AIIMS',
    experience: 11,
    rating: 4.79,
    reviewCount: 138,
    fee: 600,
    verified: true,
    hospital: 'Eye Care Institute, Greater Noida West',
    location: { type: 'Point', coordinates: [77.4350, 28.5580] }, // ~12.5 km away
    availableToday: false,
    photo: 'https://images.unsplash.com/photo-1594824813566-7885a3964478?auto=format&fit=crop&w=600&q=80',
    bio: 'Expert in blade-free LASIK, phacoemulsification cataract surgery, and glaucoma management.',
    tags: ['Cataract Surgery', 'LASIK Vision Correction', 'Glaucoma', 'Dry Eye'],
    weeklySchedule: {
      'Tue': ['10:00 AM', '01:00 PM', '04:00 PM'],
      'Fri': ['09:00 AM', '12:00 PM']
    },
    reviews: [
      { patient: 'Rajeev Srivastava', rating: 5, date: '3 days ago', comment: 'Perfect 6/6 vision restored post cataract surgery.' }
    ]
  },
  {
    id: 'doc-15',
    name: 'Dr. Deepak Narang',
    title: 'Chief Nephrologist & Dialysis Advisor',
    specialization: 'Nephrology',
    qualification: 'DM (Nephrology) - AIIMS New Delhi',
    experience: 20,
    rating: 4.93,
    reviewCount: 310,
    fee: 1100,
    verified: true,
    hospital: 'GTB Super Speciality Hospital, Dilshad Garden',
    location: { type: 'Point', coordinates: [77.3180, 28.6880] }, // ~13.4 km away
    availableToday: true,
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    bio: 'Pioneer in chronic kidney disease management, hypertension-induced renal care, and peritoneal dialysis.',
    tags: ['Chronic Kidney Disease', 'Dialysis Management', 'Renal Transplant', 'Hypertension'],
    weeklySchedule: {
      'Mon': ['10:00 AM', '02:00 PM'],
      'Wed': ['09:00 AM', '01:00 PM']
    },
    reviews: [
      { patient: 'Karan Mathur', rating: 5, date: '2 days ago', comment: 'Extremely knowledgeable nephrologist.' }
    ]
  },
  {
    id: 'doc-16',
    name: 'Dr. Preeti Sinha',
    title: 'Consultant Rheumatologist',
    specialization: 'Rheumatology',
    qualification: 'DM (Clinical Immunology & Rheumatology) - SGPGI',
    experience: 12,
    rating: 4.81,
    reviewCount: 125,
    fee: 850,
    verified: false,
    hospital: 'Max Super Speciality Hospital, Anand Vihar',
    location: { type: 'Point', coordinates: [77.3120, 28.6500] }, // ~14.0 km away
    availableToday: false,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in rheumatoid arthritis, lupus, gout, and autoimmune joint disorders.',
    tags: ['Rheumatoid Arthritis', 'Lupus (SLE)', 'Gout', 'Osteoporosis'],
    weeklySchedule: {
      'Thu': ['10:00 AM', '02:00 PM'],
      'Sat': ['09:30 AM', '01:30 PM']
    },
    reviews: [
      { patient: 'Anjali Bisht', rating: 5, date: '6 days ago', comment: 'Great relief from chronic joint inflammation.' }
    ]
  },
  {
    id: 'doc-17',
    name: 'Dr. Harish Chandra',
    title: 'Senior Psychiatrist & Behavioral Therapist',
    specialization: 'Psychiatry',
    qualification: 'MD (Psychiatry) - NIMHANS Bengaluru',
    experience: 15,
    rating: 4.9,
    reviewCount: 220,
    fee: 900,
    verified: true,
    hospital: 'Mind Care Clinic, Noida Sector 18',
    location: { type: 'Point', coordinates: [77.3250, 28.5700] }, // ~16.8 km away
    availableToday: true,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Empathetic psychiatric consultation focusing on anxiety disorders, depression protocols, and stress therapy.',
    tags: ['Anxiety & Depression', 'Insomnia Care', 'CBT Therapy', 'Stress Management'],
    weeklySchedule: {
      'Mon': ['11:00 AM', '03:00 PM', '06:00 PM'],
      'Wed': ['10:00 AM', '02:00 PM']
    },
    reviews: [
      { patient: 'Sameer Sen', rating: 5, date: '4 days ago', comment: 'Felt genuinely heard and supported.' }
    ]
  }
];
