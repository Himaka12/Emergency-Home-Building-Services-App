require('dotenv').config();

const connectDB = require('../config/db');
const User = require('../models/User');

const seedAdmin = async () => {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required in .env');
  }

  const adminData = {
    name: process.env.ADMIN_NAME || 'Local Admin',
    email: adminEmail,
    phone: process.env.ADMIN_PHONE || '0000000000',
    password: adminPassword,
    role: 'admin',
    isActive: true
  };

  const existingAdmin = await User.findOne({ email: adminEmail }).select('+password');

  if (existingAdmin) {
    existingAdmin.name = adminData.name;
    existingAdmin.phone = adminData.phone;
    existingAdmin.password = adminData.password;
    existingAdmin.role = 'admin';
    existingAdmin.isActive = true;
    await existingAdmin.save();
    console.log(`Admin user updated: ${adminEmail}`);
    return;
  }

  await User.create(adminData);
  console.log(`Admin user created: ${adminEmail}`);
};

seedAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
