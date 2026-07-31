import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import Property from '@/models/Property';
import User from '@/models/User';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    console.log("Connecting to MongoDB...");
    await connectToDatabase();
    console.log("MongoDB Connected");

    await seedInitialData();

    console.log("Fetching properties...");

    const searchParams = req.nextUrl ? req.nextUrl.searchParams : new URL(req.url, 'http://localhost').searchParams;
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const bedrooms = searchParams.get('bedrooms');
    const status = searchParams.get('status');
    const maxPrice = searchParams.get('maxPrice');

    let query = {};

    if (type && type !== 'All') {
      query.type = type;
    }
    if (status && status !== 'All') {
      query.status = status;
    }
    if (bedrooms && bedrooms !== 'All') {
      query.bedrooms = Number(bedrooms);
    }
    if (maxPrice && !isNaN(Number(maxPrice)) && Number(maxPrice) > 0) {
      query.price = { $lte: Number(maxPrice) };
    }
    if (search && search.trim() !== '') {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { 'address.city': { $regex: search.trim(), $options: 'i' } },
        { 'address.street': { $regex: search.trim(), $options: 'i' } }
      ];
    }

    const properties = await Property.find(query)
      .populate('ownerId', 'name email avatar')
      .populate('tenantId', 'name avatar')
      .sort({ createdAt: -1 });

    console.log(`Loaded ${properties.length} properties`);

    return NextResponse.json({ success: true, properties }, { status: 200 });
  } catch (error) {
    console.error("Failed to load properties", error);
    return NextResponse.json(
      { error: "Failed to load properties", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    console.log("Connecting to MongoDB...");
    await connectToDatabase();
    console.log("MongoDB Connected");

    const data = await req.json();

    console.log("Creating Property...");

    let ownerId = data.ownerId;
    if (!ownerId) {
      const ownerUser = await User.findOne({ role: 'Property Owner' }) || await User.findOne({ role: 'Admin' });
      ownerId = ownerUser ? ownerUser._id : null;
    }

    if (!ownerId) {
      return NextResponse.json({ error: "Failed to create property: No owner account found" }, { status: 400 });
    }

    let imageUrls = [];
    if (Array.isArray(data.images) && data.images.length > 0) {
      imageUrls = await Promise.all(
        data.images.map(async (img) => {
          if (typeof img === 'string' && img.startsWith('data:image')) {
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
      address: data.address || { street: 'Main St', city: 'Bengaluru', state: 'KA', zipCode: '560001' },
      bedrooms: Number(data.bedrooms || 1),
      bathrooms: Number(data.bathrooms || 1),
      areaSqFt: Number(data.areaSqFt || 500),
      images: imageUrls,
      ownerId,
      status: data.status || 'Available',
    });

    console.log(`Property Created with ID ${property._id}`);

    const populatedProperty = await Property.findById(property._id)
      .populate('ownerId', 'name email avatar')
      .populate('tenantId', 'name avatar');

    return NextResponse.json({ success: true, property: populatedProperty }, { status: 201 });
  } catch (error) {
    console.error("Failed to create property listing", error);
    return NextResponse.json(
      { error: "Failed to create property listing", message: error.message },
      { status: 500 }
    );
  }
}
