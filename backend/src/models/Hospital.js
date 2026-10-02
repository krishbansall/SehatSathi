const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  type:        { type: String, enum: ['Government', 'Private', 'Clinic', 'Diagnostic Centre', 'Pharmacy'], default: 'Private' },
  address:     { type: String },
  city:        { type: String, default: 'Ghaziabad' },
  state:       { type: String, default: 'Uttar Pradesh' },
  pincode:     { type: String },
  phone:       { type: String },
  email:       { type: String },
  website:     { type: String },
  photo:       { type: String },
  rating:      { type: Number, default: 0, min: 0, max: 5 },
  bedCount:    { type: Number },
  specialties: [String],
  facilities:  [String],
  isActive:    { type: Boolean, default: true },
  isFlNode:    { type: Boolean, default: false },  // Federated Learning node

  // GeoJSON
  location: {
    type:        { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number]   // [longitude, latitude]
  }

}, { timestamps: true });

hospitalSchema.index({ location: '2dsphere' });
hospitalSchema.index({ city: 1 });
hospitalSchema.index({ type: 1 });

module.exports = mongoose.model('Hospital', hospitalSchema);
