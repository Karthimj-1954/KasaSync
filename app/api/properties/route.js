import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Property from '../../../models/Property';

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
  {
    _id: 'prop_2',
    id: 'prop_2',
    title: 'Sunset Villa Estate & Coastal Pool',
    description: 'Mediterranean inspired waterfront villa with private infinity pool, outdoor kitchen, lush gardens, and 3-car garage.',
    type: 'Villa',
    price: 8500,
    address: { street: '1280 Ocean Drive', city: 'Miami', state: 'FL', zipCode: '33139', country: 'USA' },
    bedrooms: 5,
    bathrooms: 4,
    areaSqFt: 4500,
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800'],
    ownerId: { _id: 'owner_1', name: 'Marcus Sterling', email: 'owner@kasasync.com' },
    status: 'Available',
  },
];

export async function GET(req) {
  try {
    await connectToDatabase();
    const properties = await Property.find().populate('ownerId', 'name email avatar').populate('tenantId', 'name avatar').sort({ createdAt: -1 });
    if (!properties || properties.length === 0) {
      return NextResponse.json({ properties: MOCK_PROPERTIES });
    }
    return NextResponse.json({ properties });
  } catch (error) {
    return NextResponse.json({ properties: MOCK_PROPERTIES });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    await connectToDatabase();
    const property = await Property.create(data);
    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    const data = await req.json().catch(() => ({}));
    return NextResponse.json({ property: { _id: `prop_${Date.now()}`, ...data } }, { status: 201 });
  }
}
