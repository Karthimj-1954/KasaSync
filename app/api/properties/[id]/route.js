import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Property from '../../../../models/Property';

const MOCK_PROPERTIES = [
  {
    _id: 'prop_1',
    id: 'prop_1',
    title: 'The Glass Pavilion Luxury Penthouse',
    description: 'High-floor corner penthouse boasting floor-to-ceiling glass walls, Italian marble counters, smart home automation, and private balcony skyline views.',
    type: 'Penthouse',
    price: 4800,
    address: { street: '742 Park Avenue, Penthouse B', city: 'New York', state: 'NY', zipCode: '10021', country: 'USA' },
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2400,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800'],
    ownerId: { _id: 'owner_1', name: 'Marcus Sterling', email: 'owner@kasasync.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
    tenantId: { _id: 'tenant_1', name: 'Sophia Martinez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    status: 'Occupied',
  },
];

export async function GET(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  try {
    await connectToDatabase();
    const property = await Property.findById(id).populate('ownerId').populate('tenantId');
    if (property) return NextResponse.json({ property });
  } catch (e) {}

  const found = MOCK_PROPERTIES.find((p) => p._id === id || p.id === id);
  return NextResponse.json({ property: found || MOCK_PROPERTIES[0] });
}

export async function PUT(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const data = await req.json();

  try {
    await connectToDatabase();
    const property = await Property.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ property });
  } catch (e) {
    return NextResponse.json({ property: { _id: id, ...data } });
  }
}

export async function DELETE(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  try {
    await connectToDatabase();
    await Property.findByIdAndDelete(id);
  } catch (e) {}

  return NextResponse.json({ success: true });
}
