import { v2 as cloudinary } from 'cloudinary';

export const uploadToCloudinary = async (fileString, folder = 'kasasync') => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ackkl8mu',
      api_key: process.env.CLOUDINARY_API_KEY || '713461755579324',
      api_secret: process.env.CLOUDINARY_API_SECRET || 'tuS-iUrHbbQCiQ8sr4qu_c4cnEU',
      secure: true,
    });

    console.log("Uploading Image...");
    const res = await cloudinary.uploader.upload(fileString, {
      folder,
      resource_type: 'auto',
    });
    console.log("Cloudinary Upload Success");
    return res.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error", error);
    return fileString; // Fallback to provided URL or string if direct upload fails
  }
};

export default cloudinary;
