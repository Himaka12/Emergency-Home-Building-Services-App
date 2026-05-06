const asyncHandler = require('../utils/asyncHandler');
const WorkerProfile = require('../models/WorkerProfile');

const profilePopulate = [
  { path: 'userId', select: 'name email phone role isActive' },
  { path: 'services', select: 'name description baseVisitFee' }
];

const upsertMyWorkerProfile = asyncHandler(async (req, res) => {
  const profile = await WorkerProfile.findOneAndUpdate(
    { userId: req.user._id },
    {
      userId: req.user._id,
      services: req.body.services || [],
      experience: req.body.experience || '',
      serviceAreas: req.body.serviceAreas || [],
      profileImage: req.body.profileImage || '',
      documents: req.body.documents || []
    },
    {
      new: true,
      upsert: true,
      runValidators: true
    }
  ).populate(profilePopulate);

  res.json({
    success: true,
    data: profile
  });
});

const getMyWorkerProfile = asyncHandler(async (req, res) => {
  const profile = await WorkerProfile.findOne({ userId: req.user._id }).populate(profilePopulate);

  if (!profile) {
    res.status(404);
    throw new Error('Worker profile not found');
  }

  res.json({
    success: true,
    data: profile
  });
});

const updateAvailability = asyncHandler(async (req, res) => {
  const profile = await WorkerProfile.findOneAndUpdate(
    { userId: req.user._id },
    { availabilityStatus: req.body.availabilityStatus },
    {
      new: true,
      runValidators: true
    }
  ).populate(profilePopulate);

  if (!profile) {
    res.status(404);
    throw new Error('Worker profile not found');
  }

  res.json({
    success: true,
    data: profile
  });
});

module.exports = {
  upsertMyWorkerProfile,
  getMyWorkerProfile,
  updateAvailability
};
