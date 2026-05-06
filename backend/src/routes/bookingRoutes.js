const express = require('express');
const {
  acceptJob,
  cancelBooking,
  completeJob,
  createBooking,
  getAssignedJobs,
  getMyBookings,
  startJob
} = require('../controllers/bookingController');
const { authorize, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorize('customer'), createBooking);
router.get('/my-bookings', protect, authorize('customer'), getMyBookings);
router.get('/assigned-jobs', protect, authorize('worker'), getAssignedJobs);
router.patch('/:id/accept', protect, authorize('worker'), acceptJob);
router.patch('/:id/start', protect, authorize('worker'), startJob);
router.patch('/:id/complete', protect, authorize('worker'), completeJob);
router.patch('/:id/cancel', protect, authorize('customer', 'admin'), cancelBooking);

module.exports = router;
