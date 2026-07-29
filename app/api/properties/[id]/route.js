import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import Property from '@/models/Property';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  try {
    await connectToDatabase();
    await seedInitialData();

    const property = await Property.findById(id).populate('ownerId', 'name email avatar').populate('tenantId', 'name avatar');
    if (!property) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error("Get Property By ID Error", error);
    return NextResponse.json({ message: 'Failed to fetch property details', error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const data = await req.json();

  try {
    await connectToDatabase();

    const property = await Property.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .populate('ownerId', 'name email avatar')
      .populate('tenantId', 'name avatar');

    if (!property) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error("Update Property Error", error);
    return NextResponse.json({ message: 'Failed to update property', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  try {
    await connectToDatabase();

    const property = await Property.findByIdAndDelete(id);
    if (!property) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error("Delete Property Error", error);
    return NextResponse.json({ message: 'Failed to delete property', error: error.message }, { status: 500 });
  }
}
