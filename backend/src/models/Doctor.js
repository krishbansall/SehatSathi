const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  patient:   String,
  rating:    { type: Number, min: 1, max: 5 },
  comment:   String,
  date:      { type: Date, default: Date.now }
}, { _id: false });

const doctorSchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:           { type: String, required: true, trim: true },
  title:          { type: String },
  specialization: { type: String, required: true },
  qualification:  { type: String },
  experience:     { type: Number, default: 0 },         // years
  fee:            { type: Number, required: true },      // INR
  rating:         { type: Number, default: 0, min: 0, max: 5 },
  reviewCount:    { type: Number, default: 0 },
  verified:       { type: Boolean, default: false },
  availableToday: { type: Boolean, default: false },
  bio:            { type: String },
  photo:          { type: String, default: '' },
  tags:           [String],
  hospital:       { type: String },
  hospitalId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  licenseNo:      { type: String },
  isActive:       { type: Boolean, default: true },

  // GeoJSON location (longitude, latitude)
  location: {
    type:        { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [77.4538, 28.6692] }  // Ghaziabad default
  },

  weeklySchedule: {
    Mon: [String], Tue: [String], Wed: [String],
    Thu: [String], Fri: [String], Sat: [String], Sun: [String]
  },

  reviews: [reviewSchema]

}, { timestamps: true });

// 2dsphere index for geo queries
doctorSchema.index({ location: '2dsphere' });
doctorSchema.index({ specialization: 1 });
doctorSchema.index({ rating: -1 });
doctorSchema.index({ fee: 1 });

module.exports = mongoose.model('Doctor', doctorSchema);
