const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor:    { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  hospital:  { type: String },

  // Snapshot fields (so records persist even if doctor info changes)
  patientName:            String,
  patientAge:             Number,
  patientGender:          String,
  patientPhone:           String,
  patientEmail:           String,
  doctorName:             String,
  doctorSpecialization:   String,
  doctorPhoto:            String,

  date:      { type: String, required: true },   // 'YYYY-MM-DD'
  timeSlot:  { type: String, required: true },   // '10:30 AM'
  reason:    { type: String },
  type:      { type: String, enum: ['In-Clinic', 'Online', 'Home Visit'], default: 'In-Clinic' },
  fee:       { type: Number },

  status: {
    type:    String,
    enum:    ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },

  cancelReason:  String,
  doctorNotes:   String,
  prescription:  [{
    name:     String,
    dosage:   String,
    duration: String,
    timing:   String
  }]

}, { timestamps: true });

appointmentSchema.index({ patient: 1, date: -1 });
appointmentSchema.index({ doctor: 1, date: -1 });
appointmentSchema.index({ status: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
