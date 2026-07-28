import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadToCloudinary = async (fileString, folder = 'kasasync') => {
  try {
    const res = await cloudinary.uploader.upload(fileString, {
      folder,
      resource_type: 'auto',
    });
    return res.secure_url;
  } catch (error) {
    console.error('[Cloudinary Upload Error]:', error);
    throw error;
  }
};

export default cloudinary;
