import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import Amenity from '@/models/Amenity';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  try {
    await connectToDatabase();
    await seedInitialData();

    const amenity = await Amenity.findById(id);
    if (!amenity) {
      return NextResponse.json({ message: 'Amenity not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, amenity });
  } catch (error) {
    console.error("Get Amenity Error", error);
    return NextResponse.json({ message: 'Failed to fetch amenity details', error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const data = await req.json();

  try {
    await connectToDatabase();

    const amenity = await Amenity.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!amenity) {
      return NextResponse.json({ message: 'Amenity not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, amenity });
  } catch (error) {
    console.error("Update Amenity Error", error);
    return NextResponse.json({ message: 'Failed to update amenity', error: error.message }, { status: 500 });
  }
}
