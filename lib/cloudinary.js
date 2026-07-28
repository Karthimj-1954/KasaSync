import { v2 as cloudinary } from 'cloudinary';

export const uploadToCloudinary = async (fileString, folder = 'kasasync') => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const res = await cloudinary.uploader.upload(fileString, {
      folder,
      resource_type: 'auto',
    });
    return res.secure_url;
  } catch (error) {
    console.error('[Cloudinary Upload Error]:', error);
    return 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800';
  }
};

export default cloudinary;
