const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  profileImage: user.profileImage,
  role: user.role,
  isActive: user.isActive
});

const sendAuthResponse = (res, statusCode, user) => {
  res.status(statusCode).json({
    success: true,
    token: generateToken(user._id),
    user: serializeUser(user)
  });
};

const getPublicUploadUrl = (req, filename) => `${req.protocol}://${req.get('host')}/uploads/${filename}`;

const register = asyncHandler(async (req, res) => {
  const { name, phone, password, role = 'customer' } = req.body;
  const email = req.body.email.trim().toLowerCase();

  if (role === 'admin') {
    res.status(400);
    throw new Error('Admin users must be created with the local seed script');
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409);
    throw new Error('Email is already registered');
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role
  });

  sendAuthResponse(res, 201, user);
});

const login = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const email = req.body.email.trim().toLowerCase();
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (!user.isActive) {
    res.status(403);
    throw new Error('Your account is inactive');
  }

  sendAuthResponse(res, 200, user);
});

const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: serializeUser(req.user)
  });
});

const updateMe = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (typeof name === 'string') {
    user.name = name.trim();
  }

  if (typeof phone === 'string') {
    user.phone = phone.trim();
  }

  await user.save();

  sendAuthResponse(res, 200, user);
});

const updateProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Profile image is required');
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.profileImage = getPublicUploadUrl(req, req.file.filename);
  await user.save();

  sendAuthResponse(res, 200, user);
});

module.exports = {
  register,
  login,
  getMe,
  updateMe,
  updateProfileImage
};
