const asyncHandler = require('../utils/asyncHandler');
const Booking = require('../models/Booking');
const ServiceCategory = require('../models/ServiceCategory');
const User = require('../models/User');
const WorkerProfile = require('../models/WorkerProfile');

const getSummary = asyncHandler(async (req, res) => {
  const [customers, workers, pendingWorkers, bookings, pendingBookings, services] =
    await Promise.all([
      User.countDocuments({ role: 'customer' }),
      User.countDocuments({ role: 'worker' }),
      WorkerProfile.countDocuments({ approvalStatus: 'pending' }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      ServiceCategory.countDocuments({ isActive: true })
    ]);

  res.json({
    success: true,
    data: {
      customers,
      workers,
      pendingWorkers,
      bookings,
      pendingBookings,
      services
    }
  });
});

const getCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({ role: 'customer' }).select('-password').sort({ createdAt: -1 });

  res.json({
    success: true,
    data: customers
  });
});

const getWorkers = asyncHandler(async (req, res) => {
  const workers = await WorkerProfile.find()
    .populate('userId', 'name email phone role isActive')
    .populate('services', 'name')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: workers
  });
});

const updateWorkerApproval = asyncHandler(async (req, res) => {
  const { approvalStatus } = req.body;

  if (!['pending', 'approved', 'rejected', 'blocked'].includes(approvalStatus)) {
    res.status(400);
    throw new Error('Invalid approval status');
  }

  const profile = await WorkerProfile.findByIdAndUpdate(
    req.params.profileId,
    { approvalStatus },
    { new: true, runValidators: true }
  ).populate('userId', 'name email phone role isActive');

  if (!profile) {
    res.status(404);
    throw new Error('Worker profile not found');
  }

  res.json({
    success: true,
    data: profile
  });
});

const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate('customerId', 'name email phone')
    .populate('workerId', 'name email phone')
    .populate('serviceCategoryId', 'name baseVisitFee')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: bookings
  });
});

const assignWorker = asyncHandler(async (req, res) => {
  const { workerId } = req.body;
  const workerProfile = await WorkerProfile.findOne({
    userId: workerId,
    approvalStatus: 'approved'
  });

  if (!workerProfile) {
    res.status(400);
    throw new Error('Worker must have an approved profile before assignment');
  }

  const booking = await Booking.findByIdAndUpdate(
    req.params.bookingId,
    {
      workerId,
      status: 'assigned'
    },
    {
      new: true,
      runValidators: true
    }
  )
    .populate('customerId', 'name email phone')
    .populate('workerId', 'name email phone')
    .populate('serviceCategoryId', 'name baseVisitFee');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  res.json({
    success: true,
    data: booking
  });
});

module.exports = {
  getSummary,
  getCustomers,
  getWorkers,
  updateWorkerApproval,
  getBookings,
  assignWorker
};
