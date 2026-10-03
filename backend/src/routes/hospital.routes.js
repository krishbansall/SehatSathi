const express = require('express');
const router  = express.Router();
const {
  getHospitals, getHospitalById,
  createHospital, updateHospital,
  getOsmNearby
} = require('../controllers/hospital.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/',            getHospitals);
router.get('/osm-nearby',  getOsmNearby);
router.get('/:id',         getHospitalById);
router.post('/',           protect, authorize('admin'), createHospital);
router.put('/:id',         protect, authorize('admin'), updateHospital);

module.exports = router;
