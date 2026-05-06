require('dotenv').config();

const parseList = (value = '') =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  dnsServers: parseList(process.env.DNS_SERVERS),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || '*',
  admin: {
    name: process.env.ADMIN_NAME || 'Local Admin',
    email: process.env.ADMIN_EMAIL,
    phone: process.env.ADMIN_PHONE || '0000000000',
    password: process.env.ADMIN_PASSWORD
  }
};

module.exports = env;
