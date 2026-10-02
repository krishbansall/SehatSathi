const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullName:  { type: String, required: [true, 'Full name is required'], trim: true },
  email:     { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
  password:  { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
  phone:     { type: String, trim: true },
  role:      { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  photo:     { type: String, default: '' },
  isActive:  { type: Boolean, default: true },

  // Patient-specific
  patientProfile: {
    age:                Number,
    gender:             { type: String, enum: ['Male', 'Female', 'Other'] },
    bloodGroup:         String,
    height:             String,
    weight:             String,
    allergies:          [String],
    chronicConditions:  [String],
    emergencyContact: {
      name:     String,
      relation: String,
      phone:    String
    }
  },

  // Doctor-specific (references Doctor profile doc)
  doctorProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }

}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare plain password with hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Sign and return JWT
userSchema.methods.getSignedJWT = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

module.exports = mongoose.model('User', userSchema);
