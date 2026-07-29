import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import Amenity from '@/models/Amenity';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    await seedInitialData();

    const amenities = await Amenity.find().sort({ name: 1 });
    return NextResponse.json({ success: true, amenities });
  } catch (error) {
    console.error("Fetch Amenities Error", error);
    return NextResponse.json({ message: 'Failed to fetch amenities', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    await seedInitialData();

    const data = await req.json();
    const { name, category, description, capacity, openingTime, closingTime, images } = data;

    console.log("Creating Amenity...");

    let imageUrls = [];
    if (Array.isArray(images) && images.length > 0) {
      imageUrls = await Promise.all(
        images.map(async (img) => {
          if (img.startsWith('data:image')) {
            return await uploadToCloudinary(img, 'kasasync/amenities');
          }
          return img;
        })
      );
    }

    const amenity = await Amenity.create({
      name,
      category,
      description: description || '',
      capacity: Number(capacity) || 20,
      openingTime: openingTime || '06:00',
      closingTime: closingTime || '22:00',
      images: imageUrls,
      isActive: true,
    });

    console.log("Amenity Saved");

    return NextResponse.json({ success: true, amenity }, { status: 201 });
  } catch (error) {
    console.error("Create Amenity Error", error);
    return NextResponse.json({ message: 'Failed to create amenity', error: error.message }, { status: 500 });
  }
}
