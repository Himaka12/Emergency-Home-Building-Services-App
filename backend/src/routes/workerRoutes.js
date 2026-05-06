const express = require('express');
const {
  getMyWorkerProfile,
  updateAvailability,
  upsertMyWorkerProfile
} = require('../controllers/workerController');
const { authorize, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/profile', protect, authorize('worker'), upsertMyWorkerProfile);
router.get('/profile/me', protect, authorize('worker'), getMyWorkerProfile);
router.patch('/availability', protect, authorize('worker'), updateAvailability);

module.exports = router;
