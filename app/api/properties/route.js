import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import Property from '@/models/Property';
import User from '@/models/User';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectToDatabase();
    await seedInitialData();

    const properties = await Property.find()
      .populate('ownerId', 'name email avatar')
      .populate('tenantId', 'name avatar')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, properties });
  } catch (error) {
    console.error("Fetch Properties Error", error);
    return NextResponse.json({ message: 'Failed to fetch properties', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    await seedInitialData();

    const data = await req.json();

    console.log("Creating Property...");

    // Find default owner if ownerId not supplied
    let ownerId = data.ownerId;
    if (!ownerId) {
      const ownerUser = await User.findOne({ role: 'Property Owner' });
      ownerId = ownerUser ? ownerUser._id : null;
    }

    // Process images via Cloudinary if base64 provided
    let imageUrls = [];
    if (Array.isArray(data.images) && data.images.length > 0) {
      imageUrls = await Promise.all(
        data.images.map(async (img) => {
          if (img.startsWith('data:image')) {
            return await uploadToCloudinary(img, 'kasasync/properties');
          }
          return img;
        })
      );
    } else {
      imageUrls = ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800'];
    }

    const property = await Property.create({
      title: data.title,
      description: data.description,
      type: data.type || 'Apartment',
      price: Number(data.price),
      address: data.address,
      bedrooms: Number(data.bedrooms),
      bathrooms: Number(data.bathrooms),
      areaSqFt: Number(data.areaSqFt),
      images: imageUrls,
      ownerId,
      status: data.status || 'Available',
    });

    console.log("Property Created");

    const populatedProperty = await Property.findById(property._id).populate('ownerId', 'name email avatar');

    return NextResponse.json({ success: true, property: populatedProperty }, { status: 201 });
  } catch (error) {
    console.error("Create Property Error", error);
    return NextResponse.json({ message: 'Failed to create property listing', error: error.message }, { status: 500 });
  }
}
