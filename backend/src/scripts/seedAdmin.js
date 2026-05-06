const connectDB = require('../config/db');
const env = require('../config/env');
const User = require('../models/User');

const seedAdmin = async () => {
  await connectDB();

  if (!env.admin.email || !env.admin.password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required in .env');
  }

  const adminData = {
    name: env.admin.name,
    email: env.admin.email,
    phone: env.admin.phone,
    password: env.admin.password,
    role: 'admin',
    isActive: true
  };

  const existingAdmin = await User.findOne({ email: env.admin.email }).select('+password');

  if (existingAdmin) {
    existingAdmin.name = adminData.name;
    existingAdmin.phone = adminData.phone;
    existingAdmin.password = adminData.password;
    existingAdmin.role = 'admin';
    existingAdmin.isActive = true;
    await existingAdmin.save();
    console.log(`Admin user updated: ${env.admin.email}`);
    return;
  }

  await User.create(adminData);
  console.log(`Admin user created: ${env.admin.email}`);
};

seedAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
