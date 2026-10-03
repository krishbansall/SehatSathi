const jwt  = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/apiResponse');

/**
 * Protect routes — verifies JWT Bearer token
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Not authorised — no token provided', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return sendError(res, 'User not found', 401);
    next();
  } catch (err) {
    return sendError(res, 'Token invalid or expired', 401);
  }
};

/**
 * Role-based access
 * Usage: authorize('doctor') or authorize('patient', 'doctor')
 */
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return sendError(res, `Role '${req.user.role}' is not permitted to access this resource`, 403);
  }
  next();
};

module.exports = { protect, authorize };
