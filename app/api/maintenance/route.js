import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import MaintenanceRequest from '@/models/MaintenanceRequest';
import User from '@/models/User';
import Property from '@/models/Property';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    await seedInitialData();

    const requests = await MaintenanceRequest.find()
      .populate('propertyId', 'title address')
      .populate('tenantId', 'name email avatar')
      .populate('assignedStaffId', 'name email avatar')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("Fetch Maintenance Requests Error", error);
    return NextResponse.json({ message: 'Failed to fetch maintenance tickets', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    await seedInitialData();

    const data = await req.json();
    const { title, description, propertyId, tenantId, priority, images } = data;

    console.log("Creating Maintenance Ticket...");

    // Find default tenant & property if not provided
    let activeTenantId = tenantId;
    if (!activeTenantId) {
      const tenantUser = await User.findOne({ role: 'Tenant' });
      activeTenantId = tenantUser ? tenantUser._id : null;
    }

    let activePropertyId = propertyId;
    if (!activePropertyId) {
      const defaultProp = await Property.findOne();
      activePropertyId = defaultProp ? defaultProp._id : null;
    }

    // Process images via Cloudinary
    let imageUrls = [];
    if (Array.isArray(images) && images.length > 0) {
      imageUrls = await Promise.all(
        images.map(async (img) => {
          if (img.startsWith('data:image')) {
            return await uploadToCloudinary(img, 'kasasync/maintenance');
          }
          return img;
        })
      );
    }

    const request = await MaintenanceRequest.create({
      title,
      description,
      propertyId: activePropertyId,
      tenantId: activeTenantId,
      priority: priority || 'Medium',
      status: 'Pending',
      images: imageUrls,
    });

    console.log("Maintenance Ticket Saved");

    const populatedRequest = await MaintenanceRequest.findById(request._id)
      .populate('propertyId', 'title')
      .populate('tenantId', 'name email');

    return NextResponse.json({ success: true, request: populatedRequest }, { status: 201 });
  } catch (error) {
    console.error("Create Maintenance Ticket Error", error);
    return NextResponse.json({ message: 'Failed to create maintenance ticket', error: error.message }, { status: 500 });
  }
}
