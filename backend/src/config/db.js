const mongoose = require('mongoose');
const env = require('./env');
const { configureDns, createIpv4Lookup } = require('./dns');

const connectDB = async () => {
  if (!env.mongoUri) {
    throw new Error('MONGO_URI is missing from environment variables');
  }

  const customDnsEnabled = configureDns(env.dnsServers);

  const connection = await mongoose.connect(env.mongoUri, {
    lookup: customDnsEnabled ? createIpv4Lookup() : undefined,
    serverSelectionTimeoutMS: 15000
  });

  console.log(`MongoDB connected: ${connection.connection.host}`);
};

module.exports = connectDB;
