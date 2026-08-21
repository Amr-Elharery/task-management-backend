const mongoose = require('mongoose');
const Logger = require('../shared/utils/logger');

async function connectToDatabase(uri) {
  Logger.log('Connecting to MongoDB...');
  const clientOptions = {
    serverApi: { version: '1', strict: true, deprecationErrors: true },
  };
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    Logger.log('MongoDB connection established successfully.');
  } catch (error) {
    Logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
module.exports = {
  connectToDatabase,
};
