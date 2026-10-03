const { validationResult } = require('express-validator');
const User   = require('../models/User');
const Doctor = require('../models/Doctor');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// Helper — build JWT response
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = user.getSignedJWT();
  sendSuccess(res, {
    token,
    user: {
      id:       user._id,
      fullName: user.fullName,
      email:    user.email,
      role:     user.role,
      photo:    user.photo,
      phone:    user.phone,
      patientProfile: user.patientProfile,
      doctorProfileId: user.doctorProfileId
    }
  }, message, statusCode);
};

// @route  POST /api/auth/register
exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendError(res, 'Validation failed', 400, errors.array());

  try {
    const { fullName, email, password, phone, role, patientProfile, doctorFields } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return sendError(res, 'Email already registered', 400);

    const user = await User.create({ fullName, email, password, phone, role: role || 'patient', patientProfile });

    // If doctor, create Doctor profile doc
    if (role === 'doctor' && doctorFields) {
      const doctor = await Doctor.create({
        user:           user._id,
        name:           fullName,
        specialization: doctorFields.specialization || 'General',
        fee:            doctorFields.fee             || 500,
        licenseNo:      doctorFields.licenseNo,
        experience:     doctorFields.experience      || 0,
        hospital:       doctorFields.hospital        || ''
      });
      user.doctorProfileId = doctor._id;
      await user.save();
    }

    sendTokenResponse(user, 201, res, 'Account created successfully');
  } catch (err) {
    next(err);
  }
};

// @route  POST /api/auth/login
exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendError(res, 'Validation failed', 400, errors.array());

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return sendError(res, 'Invalid email or password', 401);

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return sendError(res, 'Invalid email or password', 401);

    if (!user.isActive) return sendError(res, 'Account has been deactivated', 401);

    sendTokenResponse(user, 200, res, 'Logged in successfully');
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('doctorProfileId');
    sendSuccess(res, user, 'User profile fetched');
  } catch (err) {
    next(err);
  }
};

// @route  PUT /api/auth/me
exports.updateMe = async (req, res, next) => {
  try {
    const allowed = ['fullName', 'phone', 'photo', 'patientProfile'];
    const updates = {};
    allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    sendSuccess(res, user, 'Profile updated');
  } catch (err) {
    next(err);
  }
};

// @route  PUT /api/auth/change-password
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) return sendError(res, 'Current password is incorrect', 400);

    user.password = newPassword;
    await user.save();
    sendSuccess(res, null, 'Password changed successfully');
  } catch (err) {
    next(err);
  }
};
