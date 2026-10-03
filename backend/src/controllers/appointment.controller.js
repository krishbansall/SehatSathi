const Appointment = require('../models/Appointment');
const Doctor      = require('../models/Doctor');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// @route  POST /api/appointments
exports.createAppointment = async (req, res, next) => {
  try {
    const { doctorId, date, timeSlot, reason, type } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return sendError(res, 'Doctor not found', 404);

    // Check slot not already booked
    const clash = await Appointment.findOne({
      doctor: doctorId,
      date,
      timeSlot,
      status: { $in: ['Pending', 'Confirmed'] }
    });
    if (clash) return sendError(res, 'This slot is already booked. Please choose another.', 409);

    const patient = req.user;
    const appt = await Appointment.create({
      patient:              patient._id,
      doctor:               doctorId,
      hospital:             doctor.hospital,
      patientName:          patient.fullName,
      patientAge:           patient.patientProfile?.age,
      patientGender:        patient.patientProfile?.gender,
      patientPhone:         patient.phone,
      patientEmail:         patient.email,
      doctorName:           doctor.name,
      doctorSpecialization: doctor.specialization,
      doctorPhoto:          doctor.photo,
      date, timeSlot, reason,
      type:   type  || 'In-Clinic',
      fee:    doctor.fee
    });

    sendSuccess(res, appt, 'Appointment booked successfully', 201);
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/appointments  (patient gets own; doctor gets their queue)
exports.getMyAppointments = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (req.user.role === 'patient') {
      filter.patient = req.user._id;
    } else if (req.user.role === 'doctor') {
      const doctorProfile = await Doctor.findOne({ user: req.user._id });
      if (!doctorProfile) return sendError(res, 'Doctor profile not found', 404);
      filter.doctor = doctorProfile._id;
    }

    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [appointments, total] = await Promise.all([
      Appointment.find(filter).sort({ date: -1, timeSlot: 1 }).skip(skip).limit(parseInt(limit)),
      Appointment.countDocuments(filter)
    ]);

    sendSuccess(res, {
      appointments,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) }
    }, 'Appointments fetched');
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/appointments/:id
exports.getAppointmentById = async (req, res, next) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return sendError(res, 'Appointment not found', 404);

    // Ownership check
    const doctorProfile = req.user.role === 'doctor'
      ? await Doctor.findOne({ user: req.user._id })
      : null;

    const isOwner = appt.patient.toString() === req.user._id.toString() ||
      (doctorProfile && appt.doctor.toString() === doctorProfile._id.toString());
    if (!isOwner) return sendError(res, 'Not authorised', 403);

    sendSuccess(res, appt, 'Appointment fetched');
  } catch (err) {
    next(err);
  }
};

// @route  PATCH /api/appointments/:id/status
exports.updateStatus = async (req, res, next) => {
  try {
    const { status, cancelReason, doctorNotes, prescription } = req.body;
    const allowed = ['Confirmed', 'Completed', 'Cancelled'];
    if (!allowed.includes(status)) return sendError(res, `Status must be one of: ${allowed.join(', ')}`, 400);

    const appt = await Appointment.findById(req.params.id);
    if (!appt) return sendError(res, 'Appointment not found', 404);

    // Patients can only cancel their own
    if (req.user.role === 'patient') {
      if (appt.patient.toString() !== req.user._id.toString()) return sendError(res, 'Not authorised', 403);
      if (status !== 'Cancelled') return sendError(res, 'Patients can only cancel appointments', 403);
    }

    appt.status = status;
    if (cancelReason)  appt.cancelReason  = cancelReason;
    if (doctorNotes)   appt.doctorNotes   = doctorNotes;
    if (prescription)  appt.prescription  = prescription;
    await appt.save();

    sendSuccess(res, appt, `Appointment ${status.toLowerCase()}`);
  } catch (err) {
    next(err);
  }
};
