const express = require('express');
const router  = express.Router();
const {
  getMyRecords, createRecord, getRecordById,
  updateRecord, deleteRecord, upload
} = require('../controllers/record.controller');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/',      getMyRecords);
router.post('/',     upload.single('file'), createRecord);
router.get('/:id',   getRecordById);
router.put('/:id',   upload.single('file'), updateRecord);
router.delete('/:id', deleteRecord);

module.exports = router;
