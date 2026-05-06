const asyncHandler = require('../utils/asyncHandler');
const Booking = require('../models/Booking');
const Rating = require('../models/Rating');
const WorkerProfile = require('../models/WorkerProfile');

const createRating = asyncHandler(async (req, res) => {
  const booking = await Booking.findOne({
    _id: req.body.bookingId,
    customerId: req.user._id,
    status: 'completed'
  });

  if (!booking || !booking.workerId) {
    res.status(400);
    throw new Error('Only completed bookings with an assigned worker can be rated');
  }

  const rating = await Rating.create({
    bookingId: booking._id,
    customerId: req.user._id,
    workerId: booking.workerId,
    rating: req.body.rating,
    comment: req.body.comment || ''
  });

  const stats = await Rating.aggregate([
    { $match: { workerId: booking.workerId } },
    { $group: { _id: '$workerId', averageRating: { $avg: '$rating' } } }
  ]);

  if (stats[0]) {
    await WorkerProfile.findOneAndUpdate(
      { userId: booking.workerId },
      { rating: Number(stats[0].averageRating.toFixed(1)) }
    );
  }

  res.status(201).json({
    success: true,
    data: rating
  });
});

const getWorkerRatings = asyncHandler(async (req, res) => {
  const ratings = await Rating.find({ workerId: req.params.workerId })
    .populate('customerId', 'name')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: ratings
  });
});

module.exports = {
  createRating,
  getWorkerRatings
};
