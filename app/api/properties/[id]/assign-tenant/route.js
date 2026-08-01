import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/models/Property';

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { tenantId } = await req.json();

    const property = await Property.findByIdAndUpdate(
      id,
      { tenantId, status: tenantId ? 'Occupied' : 'Available' },
      { new: true }
    );

    if (!property) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error("Assign Tenant Error", error);
    return NextResponse.json({ message: 'Failed to assign tenant', error: error.message }, { status: 500 });
  }
}
