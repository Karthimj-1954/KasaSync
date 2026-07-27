const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload an image file (PNG, JPG, WEBP)'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

// Cloudinary upload simulation helper or direct data URI transformer
const processUpload = async (file) => {
  if (!file) return null;
  const b64 = Buffer.from(file.buffer).toString('base64');
  const mime = file.mimetype;
  return `data:${mime};base64,${b64}`;
};

module.exports = { upload, processUpload };
