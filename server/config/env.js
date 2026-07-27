require('dotenv').config();

const REQUIRED_ENV_VARS = [
  'PORT',
  'NODE_ENV',
  'CLIENT_URL',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_EMAIL',
  'SMTP_PASSWORD',
  'SOCKET_CORS_ORIGIN',
];

const validateEnv = () => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    const errorMsg = `[CRITICAL CONFIG ERROR] Missing required environment variables:\n - ${missing.join('\n - ')}\n\nPlease ensure all variables are defined in your server/.env file.`;
    console.error(errorMsg);
    process.exit(1);
  }

  console.log('[Config Validation] All required environment variables loaded and validated successfully.');
};

module.exports = {
  validateEnv,
  config: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    smtp: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 2525,
      email: process.env.SMTP_EMAIL,
      password: process.env.SMTP_PASSWORD,
      from: process.env.SMTP_FROM || 'KasaSync <noreply@kasasync.com>',
    },
    socketCorsOrigin: process.env.SOCKET_CORS_ORIGIN || process.env.CLIENT_URL,
  },
};
