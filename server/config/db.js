const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error('[MongoDB Error] MONGODB_URI environment variable is missing.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      autoIndex: true,
    });

    console.log("✅ MongoDB Connected");
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);

    // Reconnection & Error event listeners
    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB Warning] Connection lost. Attempting automatic reconnection...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('[MongoDB] Connection successfully re-established.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB Connection Failed', err);
    });

    // Graceful Shutdown handlers
    const gracefulExit = async () => {
      await mongoose.connection.close();
      console.log('[MongoDB] Connection closed gracefully via app termination.');
      process.exit(0);
    };

    process.on('SIGINT', gracefulExit);
    process.on('SIGTERM', gracefulExit);

  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
  }
};

module.exports = connectDB;
