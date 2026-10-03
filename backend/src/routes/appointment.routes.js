const express = require('express');
const router  = express.Router();
const {
  createAppointment, getMyAppointments,
  getAppointmentById, updateStatus
} = require('../controllers/appointment.controller');
const { protect } = require('../middleware/auth');

router.use(protect);   // all appointment routes require login

router.post('/',              createAppointment);
router.get('/',               getMyAppointments);
router.get('/:id',            getAppointmentById);
router.patch('/:id/status',   updateStatus);

module.exports = router;
