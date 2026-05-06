const express = require('express');
const {
  createComplaint,
  getComplaints,
  updateComplaintStatus
} = require('../controllers/complaintController');
const { authorize, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createComplaint);
router.get('/', protect, authorize('admin'), getComplaints);
router.patch('/:id/status', protect, authorize('admin'), updateComplaintStatus);

module.exports = router;
