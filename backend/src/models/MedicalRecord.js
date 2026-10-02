const mongoose = require('mongoose');

const prescriptionItemSchema = new mongoose.Schema({
  name:     String,
  dosage:   String,
  duration: String,
  timing:   String
}, { _id: false });

const medicalRecordSchema = new mongoose.Schema({
  patient:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointment:    { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },

  // Snapshot fields
  doctorName:     String,
  specialization: String,
  hospital:       String,

  date:           { type: String },  // 'YYYY-MM-DD'
  title:          { type: String, required: true },
  category: {
    type:    String,
    enum:    ['Lab Report', 'Diagnostic Scan', 'Prescription', 'Vaccination', 'Surgery Note', 'Discharge Summary', 'Other'],
    default: 'Other'
  },
  diagnosis:      String,
  summary:        String,
  prescription:   [prescriptionItemSchema],

  // File attachment
  fileAttached:   String,
  fileUrl:        String,    // served from /uploads/ or CDN
  fileSize:       String,
  mimeType:       String,

  isPrivate:      { type: Boolean, default: false }

}, { timestamps: true });

medicalRecordSchema.index({ patient: 1, date: -1 });
medicalRecordSchema.index({ category: 1 });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
