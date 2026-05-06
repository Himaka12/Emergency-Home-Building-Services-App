const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');

const sendAuthResponse = (res, statusCode, user) => {
  res.status(statusCode).json({
    success: true,
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive
    }
  });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role = 'customer' } = req.body;

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
  const { email, password } = req.body;
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
    user: req.user
  });
});

module.exports = {
  register,
  login,
  getMe
};
