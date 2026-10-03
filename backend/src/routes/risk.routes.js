const express = require('express');
const router  = express.Router();
const { assess, getHistory, getById } = require('../controllers/risk.controller');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/assess',  assess);
router.get('/history',  getHistory);
router.get('/:id',      getById);

module.exports = router;
