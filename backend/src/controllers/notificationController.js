const asyncHandler = require('../utils/asyncHandler');
const Notification = require('../models/Notification');

const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });

  res.json({
    success: true,
    data: notifications
  });
});

const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user._id
    },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.json({
    success: true,
    data: notification
  });
});

module.exports = {
  getMyNotifications,
  markNotificationAsRead
};
