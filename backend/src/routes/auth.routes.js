const express = require('express');
const router  = express.Router();
const { body } = require('express-validator');
const { register, login, getMe, updateMe, changePassword } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

const registerRules = [
  body('fullName').notEmpty().trim().withMessage('Full name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginRules = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

router.post('/register', registerRules, register);
router.post('/login',    loginRules,    login);
router.get('/me',        protect,       getMe);
router.put('/me',        protect,       updateMe);
router.put('/change-password', protect, changePassword);

module.exports = router;
