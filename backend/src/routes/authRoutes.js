const express = require('express');
const { getMe, login, register, updateMe, updateProfileImage } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { loginValidation, registerValidation, updateMeValidation } = require('../validations/authValidation');

const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.get('/me', protect, getMe);
router.patch('/me', protect, updateMeValidation, validateRequest, updateMe);
router.patch('/me/profile-image', protect, upload.single('profileImage'), updateProfileImage);

module.exports = router;
