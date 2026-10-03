const express = require('express');
const router  = express.Router();
const {
  getDoctors, getDoctorById, getAvailableSlots,
  addReview, updateDoctorProfile
} = require('../controllers/doctor.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/',              getDoctors);
router.get('/:id',           getDoctorById);
router.get('/:id/slots',     getAvailableSlots);
router.post('/:id/reviews',  protect, addReview);
router.put('/profile/me',    protect, authorize('doctor'), updateDoctorProfile);

module.exports = router;
