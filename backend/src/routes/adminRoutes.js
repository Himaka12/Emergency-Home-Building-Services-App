const express = require('express');
const {
  assignWorker,
  getBookings,
  getCustomers,
  getSummary,
  getWorkers,
  updateWorkerApproval
} = require('../controllers/adminController');
const { authorize, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/summary', getSummary);
router.get('/customers', getCustomers);
router.get('/workers', getWorkers);
router.patch('/workers/:profileId/approval', updateWorkerApproval);
router.get('/bookings', getBookings);
router.patch('/bookings/:bookingId/assign', assignWorker);

module.exports = router;
