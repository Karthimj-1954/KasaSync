import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req) {
  try {
    const { image, folder } = await req.json();

    if (!image) {
      return NextResponse.json({ message: 'No image file provided' }, { status: 400 });
    }

    console.log("Uploading Image...");
    const url = await uploadToCloudinary(image, folder || 'kasasync');
    console.log("Cloudinary Upload Success");

    return NextResponse.json({ success: true, url }, { status: 201 });
  } catch (error) {
    console.error("Upload API Error", error);
    return NextResponse.json({ message: 'Cloudinary upload failed', error: error.message }, { status: 500 });
  }
}
