const asyncHandler = require('../utils/asyncHandler');
const Booking = require('../models/Booking');
const ServiceCategory = require('../models/ServiceCategory');

const bookingPopulate = [
  { path: 'customerId', select: 'name email phone' },
  { path: 'workerId', select: 'name email phone' },
  { path: 'serviceCategoryId', select: 'name baseVisitFee' }
];

const createBooking = asyncHandler(async (req, res) => {
  const service = await ServiceCategory.findById(req.body.serviceCategoryId);

  if (!service || !service.isActive) {
    res.status(400);
    throw new Error('Selected service category is unavailable');
  }

  const booking = await Booking.create({
    customerId: req.user._id,
    serviceCategoryId: req.body.serviceCategoryId,
    description: req.body.description,
    address: req.body.address,
    location: req.body.location,
    images: req.body.images || [],
    visitFee: service.baseVisitFee,
    paymentMethod: req.body.paymentMethod || 'cash'
  });

  const populatedBooking = await booking.populate(bookingPopulate);

  res.status(201).json({
    success: true,
    data: populatedBooking
  });
});

const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ customerId: req.user._id })
    .populate(bookingPopulate)
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: bookings
  });
});

const getAssignedJobs = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ workerId: req.user._id })
    .populate(bookingPopulate)
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: bookings
  });
});

const updateWorkerJobStatus = (allowedCurrentStatus, nextStatus) =>
  asyncHandler(async (req, res) => {
    const booking = await Booking.findOne({
      _id: req.params.id,
      workerId: req.user._id
    });

    if (!booking) {
      res.status(404);
      throw new Error('Assigned booking not found');
    }

    if (booking.status !== allowedCurrentStatus) {
      res.status(400);
      throw new Error(`Booking must be ${allowedCurrentStatus} before it can become ${nextStatus}`);
    }

    booking.status = nextStatus;
    await booking.save();
    await booking.populate(bookingPopulate);

    res.json({
      success: true,
      data: booking
    });
  });

const cancelBooking = asyncHandler(async (req, res) => {
  const filter = {
    _id: req.params.id,
    status: { $nin: ['completed', 'cancelled'] }
  };

  if (req.user.role === 'customer') {
    filter.customerId = req.user._id;
  }

  const booking = await Booking.findOne(filter);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found or cannot be cancelled');
  }

  booking.status = 'cancelled';
  await booking.save();
  await booking.populate(bookingPopulate);

  res.json({
    success: true,
    data: booking
  });
});

module.exports = {
  createBooking,
  getMyBookings,
  getAssignedJobs,
  acceptJob: updateWorkerJobStatus('assigned', 'accepted'),
  startJob: updateWorkerJobStatus('accepted', 'in_progress'),
  completeJob: updateWorkerJobStatus('in_progress', 'completed'),
  cancelBooking
};
