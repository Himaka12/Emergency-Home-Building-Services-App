const asyncHandler = require('../utils/asyncHandler');
const Complaint = require('../models/Complaint');

const createComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.create({
    bookingId: req.body.bookingId || null,
    reportedBy: req.user._id,
    reportedUser: req.body.reportedUser || null,
    reason: req.body.reason,
    description: req.body.description || ''
  });

  res.status(201).json({
    success: true,
    data: complaint
  });
});

const getComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find()
    .populate('reportedBy', 'name email role')
    .populate('reportedUser', 'name email role')
    .populate('bookingId')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: complaints
  });
});

const updateComplaintStatus = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  res.json({
    success: true,
    data: complaint
  });
});

module.exports = {
  createComplaint,
  getComplaints,
  updateComplaintStatus
};
