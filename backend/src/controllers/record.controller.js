const MedicalRecord = require('../models/MedicalRecord');
const path  = require('path');
const multer = require('multer');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.env.UPLOAD_PATH || 'uploads/'),
  filename: (req, file, cb) => {
    const unique = `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, unique);
  }
});
exports.upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || 10485760) },
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.jpg', '.jpeg', '.png', '.dicom'];
    if (allowed.includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error('File type not supported. Allowed: PDF, JPG, PNG, DICOM'));
  }
});

// @route  GET /api/records
exports.getMyRecords = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const filter = { patient: req.user._id };
    if (category) filter.category = category;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [records, total] = await Promise.all([
      MedicalRecord.find(filter).sort({ date: -1 }).skip(skip).limit(parseInt(limit)),
      MedicalRecord.countDocuments(filter)
    ]);
    sendSuccess(res, {
      records,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) }
    }, 'Records fetched');
  } catch (err) {
    next(err);
  }
};

// @route  POST /api/records
exports.createRecord = async (req, res, next) => {
  try {
    const data = { ...req.body, patient: req.user._id };
    if (req.file) {
      data.fileAttached = req.file.originalname;
      data.fileUrl      = `/uploads/${req.file.filename}`;
      data.fileSize     = `${(req.file.size / 1024 / 1024).toFixed(1)} MB`;
      data.mimeType     = req.file.mimetype;
    }
    const record = await MedicalRecord.create(data);
    sendSuccess(res, record, 'Medical record created', 201);
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/records/:id
exports.getRecordById = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) return sendError(res, 'Record not found', 404);
    if (record.patient.toString() !== req.user._id.toString()) return sendError(res, 'Not authorised', 403);
    sendSuccess(res, record, 'Record fetched');
  } catch (err) {
    next(err);
  }
};

// @route  PUT /api/records/:id
exports.updateRecord = async (req, res, next) => {
  try {
    let record = await MedicalRecord.findById(req.params.id);
    if (!record) return sendError(res, 'Record not found', 404);
    if (record.patient.toString() !== req.user._id.toString()) return sendError(res, 'Not authorised', 403);
    record = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    sendSuccess(res, record, 'Record updated');
  } catch (err) {
    next(err);
  }
};

// @route  DELETE /api/records/:id
exports.deleteRecord = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) return sendError(res, 'Record not found', 404);
    if (record.patient.toString() !== req.user._id.toString()) return sendError(res, 'Not authorised', 403);
    await record.deleteOne();
    sendSuccess(res, null, 'Record deleted');
  } catch (err) {
    next(err);
  }
};
