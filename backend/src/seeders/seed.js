require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Doctor   = require('../models/Doctor');
const Hospital = require('../models/Hospital');
const User     = require('../models/User');

const doctorsSeedData = [
  {
    name: 'Dr. Ananya Sharma',
    title: 'Senior Cardiologist & FL Research Advisor',
    specialization: 'Cardiology',
    qualification: 'MD, DM (Cardiology) - AIIMS New Delhi',
    experience: 14, rating: 4.9, reviewCount: 184, fee: 850,
    verified: true, availableToday: true,
    hospital: 'Fortis Heart Institute, Kavi Nagar',
    location: { type: 'Point', coordinates: [77.4560, 28.6705] },
    photo: 'https://images.unsplash.com/photo-1594824813566-7885a3964478?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Ananya Sharma is a renowned cardiologist specializing in preventive cardiovascular care and AI-assisted early risk detection.',
    tags: ['Heart Failure', 'Preventive Cardiology', 'ECG Analysis', 'Hypertension'],
    weeklySchedule: {
      Mon: ['09:00 AM','10:30 AM','02:00 PM','04:30 PM'],
      Tue: ['09:30 AM','11:00 AM','03:00 PM'],
      Wed: ['09:00 AM','10:00 AM','01:30 PM','05:00 PM'],
      Thu: ['10:00 AM','02:30 PM','04:00 PM'],
      Fri: ['09:00 AM','11:30 AM','03:30 PM'],
      Sat: ['10:00 AM','01:00 PM']
    }
  },
  {
    name: 'Dr. Rajesh Verma',
    title: 'Chief Endocrinologist & Diabetologist',
    specialization: 'Endocrinology',
    qualification: 'MD (General Medicine), FRCP (London)',
    experience: 18, rating: 4.8, reviewCount: 210, fee: 900,
    verified: true, availableToday: true,
    hospital: 'Max Super Speciality Clinic, Raj Nagar',
    location: { type: 'Point', coordinates: [77.4510, 28.6740] },
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Pioneer in metabolic syndrome management and continuous glucose monitoring protocols.',
    tags: ['Diabetes Mellitus', 'Thyroid Disorders', 'Metabolic Syndrome', 'Insulin Therapy'],
    weeklySchedule: {
      Mon: ['10:00 AM','11:30 AM','03:00 PM'],
      Tue: ['09:00 AM','10:30 AM','02:00 PM','04:00 PM'],
      Thu: ['09:30 AM','11:00 AM','01:30 PM','05:00 PM'],
      Fri: ['10:00 AM','02:00 PM'],
      Sat: ['09:00 AM','12:00 PM']
    }
  },
  {
    name: 'Dr. Priya Nambiar',
    title: 'Consultant Neurologist',
    specialization: 'Neurology',
    qualification: 'MD (Medicine), DM (Neurology)',
    experience: 11, rating: 4.7, reviewCount: 156, fee: 950,
    verified: true, availableToday: false,
    hospital: 'Columbia Asia Hospital, Vaishali',
    location: { type: 'Point', coordinates: [77.3450, 28.6460] },
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    bio: 'Expert in movement disorders, epilepsy management, and neuro-rehabilitation.',
    tags: ['Epilepsy', 'Migraine', 'Stroke Management', 'Parkinson Disease'],
    weeklySchedule: {
      Mon: ['09:00 AM','11:00 AM'],
      Wed: ['10:00 AM','02:00 PM','04:00 PM'],
      Fri: ['09:30 AM','01:30 PM']
    }
  },
  {
    name: 'Dr. Sameer Qureshi',
    title: 'Senior Orthopaedic Surgeon',
    specialization: 'Orthopaedics',
    qualification: 'MS (Orthopaedics) - MAMC New Delhi',
    experience: 16, rating: 4.8, reviewCount: 198, fee: 800,
    verified: true, availableToday: true,
    hospital: 'Yashoda Super Speciality Hospital, Kaushambi',
    location: { type: 'Point', coordinates: [77.3421, 28.6388] },
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in joint replacement, sports injuries, and minimally invasive spine surgery.',
    tags: ['Knee Replacement', 'Sports Injury', 'Spine Surgery', 'Fracture Management'],
    weeklySchedule: {
      Mon: ['08:00 AM','10:00 AM','12:00 PM'],
      Tue: ['09:00 AM','11:00 AM','03:00 PM'],
      Thu: ['08:30 AM','10:30 AM'],
      Fri: ['09:00 AM','02:00 PM'],
      Sat: ['10:00 AM','12:00 PM']
    }
  },
  {
    name: 'Dr. Kavitha Menon',
    title: 'Consultant Gynaecologist & Obstetrician',
    specialization: 'Gynaecology',
    qualification: 'MBBS, MS (OBG) - Maulana Azad Medical College',
    experience: 13, rating: 4.9, reviewCount: 221, fee: 750,
    verified: true, availableToday: true,
    hospital: 'Cloudnine Hospital, Indirapuram',
    location: { type: 'Point', coordinates: [77.3701, 28.6450] },
    photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80',
    bio: 'Dedicated to high-risk obstetrics, fertility treatments, and minimally invasive gynaecological procedures.',
    tags: ['High-Risk Pregnancy', 'PCOS', 'Fertility', 'Laparoscopic Surgery'],
    weeklySchedule: {
      Mon: ['09:00 AM','11:00 AM','03:00 PM'],
      Tue: ['10:00 AM','12:00 PM'],
      Wed: ['09:30 AM','01:30 PM','04:00 PM'],
      Thu: ['10:00 AM','02:00 PM'],
      Sat: ['09:00 AM','11:00 AM','01:00 PM']
    }
  },
  {
    name: 'Dr. Arjun Mehta',
    title: 'Dermatologist & Cosmetologist',
    specialization: 'Dermatology',
    qualification: 'MD (Dermatology) - PGIMER Chandigarh',
    experience: 9, rating: 4.6, reviewCount: 143, fee: 700,
    verified: true, availableToday: true,
    hospital: 'Skin & Cosmo Clinic, Raj Nagar Extension',
    location: { type: 'Point', coordinates: [77.4620, 28.6810] },
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialises in acne, eczema, psoriasis, hair loss, and advanced cosmetic dermatology.',
    tags: ['Acne', 'Psoriasis', 'Hair Loss', 'Skin Allergy', 'Laser Treatment'],
    weeklySchedule: {
      Mon: ['11:00 AM','01:00 PM','04:00 PM'],
      Tue: ['10:00 AM','12:00 PM','03:00 PM'],
      Wed: ['11:30 AM','02:30 PM'],
      Thu: ['10:00 AM','01:00 PM','04:30 PM'],
      Sat: ['10:00 AM','12:00 PM','02:00 PM']
    }
  },
  {
    name: 'Dr. Sunita Agarwal',
    title: 'Paediatric Specialist',
    specialization: 'Paediatrics',
    qualification: 'MBBS, MD (Paediatrics) - BHU Varanasi',
    experience: 12, rating: 4.8, reviewCount: 189, fee: 600,
    verified: true, availableToday: false,
    hospital: 'Rainbow Children Hospital, Vaishali',
    location: { type: 'Point', coordinates: [77.3380, 28.6500] },
    photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=600&q=80',
    bio: 'Expert in neonatal care, child development, vaccination, and infectious disease in children.',
    tags: ['Neonatal Care', 'Vaccination', 'Child Development', 'Infectious Disease'],
    weeklySchedule: {
      Mon: ['09:00 AM','11:00 AM','02:00 PM'],
      Tue: ['10:00 AM','12:00 PM','03:30 PM'],
      Thu: ['09:30 AM','11:30 AM'],
      Fri: ['10:00 AM','01:00 PM','04:00 PM'],
      Sat: ['09:00 AM','12:00 PM']
    }
  },
  {
    name: 'Dr. Vikram Singh',
    title: 'Pulmonologist & Critical Care Specialist',
    specialization: 'Pulmonology',
    qualification: 'MD (Medicine), DM (Pulmonary Medicine)',
    experience: 15, rating: 4.7, reviewCount: 167, fee: 875,
    verified: true, availableToday: true,
    hospital: 'GTB Hospital, Dilshad Garden',
    location: { type: 'Point', coordinates: [77.3250, 28.6630] },
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    bio: 'Leading expert in COPD, asthma, interstitial lung disease, and sleep apnoea.',
    tags: ['Asthma', 'COPD', 'Sleep Apnoea', 'Lung Fibrosis', 'Bronchoscopy'],
    weeklySchedule: {
      Tue: ['09:00 AM','11:00 AM','02:30 PM'],
      Wed: ['10:00 AM','12:00 PM','04:00 PM'],
      Fri: ['09:30 AM','11:30 AM','03:00 PM'],
      Sat: ['10:00 AM','01:00 PM']
    }
  },
  {
    name: 'Dr. Meera Krishnan',
    title: 'Psychiatrist & Mental Health Specialist',
    specialization: 'Psychiatry',
    qualification: 'MBBS, MD (Psychiatry) - NIMHANS Bangalore',
    experience: 10, rating: 4.8, reviewCount: 134, fee: 1000,
    verified: true, availableToday: false,
    hospital: 'Mind Wellness Centre, Sector 62 Noida',
    location: { type: 'Point', coordinates: [77.3640, 28.6270] },
    photo: 'https://images.unsplash.com/photo-1594824813566-7885a3964478?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialises in depression, anxiety disorders, OCD, PTSD, and addiction psychiatry.',
    tags: ['Depression', 'Anxiety', 'OCD', 'PTSD', 'Addiction', 'Cognitive Therapy'],
    weeklySchedule: {
      Mon: ['10:00 AM','12:00 PM','04:00 PM'],
      Wed: ['10:00 AM','02:00 PM'],
      Thu: ['11:00 AM','03:00 PM','05:00 PM'],
      Fri: ['10:00 AM','01:00 PM']
    }
  },
  {
    name: 'Dr. Rohit Kapoor',
    title: 'Gastroenterologist & Hepatologist',
    specialization: 'Gastroenterology',
    qualification: 'MD (Medicine), DM (Gastroenterology) - SGPGIMS Lucknow',
    experience: 13, rating: 4.7, reviewCount: 172, fee: 925,
    verified: true, availableToday: true,
    hospital: 'Fortis Escorts Hospital, Sector 16 Faridabad',
    location: { type: 'Point', coordinates: [77.3060, 28.4089] },
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Expert in irritable bowel syndrome, Crohn\'s disease, liver cirrhosis, and advanced endoscopy.',
    tags: ['IBS', 'Crohn\'s Disease', 'Liver Cirrhosis', 'Endoscopy', 'GERD'],
    weeklySchedule: {
      Mon: ['09:00 AM','11:30 AM','03:00 PM'],
      Tue: ['10:00 AM','12:00 PM'],
      Thu: ['09:30 AM','01:30 PM','04:30 PM'],
      Fri: ['10:00 AM','02:00 PM'],
      Sat: ['09:00 AM','11:00 AM']
    }
  }
];

const hospitalsSeedData = [
  {
    name: 'Fortis Heart Institute',
    type: 'Private',
    address: 'Kavi Nagar, Ghaziabad',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    pincode: '201002',
    phone: '0120-4567890',
    rating: 4.8,
    bedCount: 300,
    isFlNode: true,
    specialties: ['Cardiology', 'Cardiac Surgery', 'Neurology'],
    facilities: ['ICU', 'Cath Lab', 'MRI', 'CT Scan', '24x7 Emergency'],
    location: { type: 'Point', coordinates: [77.4560, 28.6705] }
  },
  {
    name: 'Max Super Speciality Clinic',
    type: 'Private',
    address: 'Raj Nagar, Ghaziabad',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    pincode: '201001',
    phone: '0120-2345678',
    rating: 4.7,
    bedCount: 200,
    isFlNode: true,
    specialties: ['Endocrinology', 'Orthopaedics', 'Oncology'],
    facilities: ['Pharmacy', 'Lab', 'Radiology', 'Dialysis'],
    location: { type: 'Point', coordinates: [77.4510, 28.6740] }
  },
  {
    name: 'Columbia Asia Hospital',
    type: 'Private',
    address: 'Sector 3, Vaishali, Ghaziabad',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    pincode: '201010',
    phone: '0120-3985000',
    rating: 4.6,
    bedCount: 180,
    isFlNode: false,
    specialties: ['Neurology', 'Gynaecology', 'Paediatrics'],
    facilities: ['NICU', 'Operation Theatre', 'Blood Bank', 'Physiotherapy'],
    location: { type: 'Point', coordinates: [77.3450, 28.6460] }
  },
  {
    name: 'Yashoda Super Speciality Hospital',
    type: 'Private',
    address: 'Kaushambi, Ghaziabad',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    pincode: '201010',
    phone: '0120-4567000',
    rating: 4.7,
    bedCount: 250,
    isFlNode: true,
    specialties: ['Orthopaedics', 'Spine Surgery', 'Sports Medicine'],
    facilities: ['Robotic Surgery', 'Arthroscopy', 'Physiotherapy', '24x7 Emergency'],
    location: { type: 'Point', coordinates: [77.3421, 28.6388] }
  },
  {
    name: 'Cloudnine Hospital',
    type: 'Private',
    address: 'Indirapuram, Ghaziabad',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    pincode: '201014',
    phone: '0120-6188900',
    rating: 4.9,
    bedCount: 100,
    isFlNode: false,
    specialties: ['Gynaecology', 'Obstetrics', 'Neonatology', 'Fertility'],
    facilities: ['NICU Level 3', 'IVF Centre', 'Fetal Medicine', 'Lactation Support'],
    location: { type: 'Point', coordinates: [77.3701, 28.6450] }
  },
  {
    name: 'GTB Hospital',
    type: 'Government',
    address: 'Dilshad Garden, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110095',
    phone: '011-22581901',
    rating: 4.0,
    bedCount: 1500,
    isFlNode: true,
    specialties: ['Pulmonology', 'General Medicine', 'Surgery', 'Emergency'],
    facilities: ['Trauma Centre', 'ICU', 'Blood Bank', 'Free OPD'],
    location: { type: 'Point', coordinates: [77.3250, 28.6630] }
  }
];

const seedAdminUser = {
  fullName: 'SehatSathi Admin',
  email: 'admin@sehatsathi.in',
  password: 'Admin@12345',
  role: 'admin',
  phone: '9999900000'
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅  Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Doctor.deleteMany({}),
      Hospital.deleteMany({}),
      User.deleteMany({ role: { $in: ['admin'] } })
    ]);
    console.log('🗑️   Cleared existing doctors, hospitals, and admin users');

    // Seed hospitals
    const hospitals = await Hospital.insertMany(hospitalsSeedData);
    console.log(`🏥  Seeded ${hospitals.length} hospitals`);

    // Seed doctors
    const doctors = await Doctor.insertMany(doctorsSeedData);
    console.log(`👨‍⚕️  Seeded ${doctors.length} doctors`);

    // Seed admin user
    const admin = await User.create(seedAdminUser);
    console.log(`👤  Admin user created: ${admin.email}`);

    console.log('\n✅  Database seeded successfully!');
    console.log('📧  Admin Login → admin@sehatsathi.in / Admin@12345');
    process.exit(0);
  } catch (err) {
    console.error('❌  Seed error:', err.message);
    process.exit(1);
  }
};

seed();
