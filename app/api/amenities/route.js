import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Amenity from '../../../models/Amenity';

const MOCK_AMENITIES = [
  { _id: 'amenity_1', id: 'amenity_1', name: 'Equinox Elite Fitness Center', category: 'Gym', capacity: 35, openingTime: '05:00', closingTime: '23:00', images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48'], isActive: true },
  { _id: 'amenity_2', id: 'amenity_2', name: 'Skyline Infinity Pool & Lounge', category: 'Swimming Pool', capacity: 25, openingTime: '07:00', closingTime: '21:00', images: ['https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7'], isActive: true },
  { _id: 'amenity_3', id: 'amenity_3', name: 'Grand Horizon Clubhouse', category: 'Club House', capacity: 50, openingTime: '08:00', closingTime: '23:00', images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750'], isActive: true },
];

export async function GET() {
  try {
    await connectToDatabase();
    const amenities = await Amenity.find().sort({ name: 1 });
    if (!amenities || amenities.length === 0) return NextResponse.json({ amenities: MOCK_AMENITIES });
    return NextResponse.json({ amenities });
  } catch (e) {
    return NextResponse.json({ amenities: MOCK_AMENITIES });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    await connectToDatabase();
    const amenity = await Amenity.create(data);
    return NextResponse.json({ amenity }, { status: 201 });
  } catch (e) {
    const data = await req.json().catch(() => ({}));
    return NextResponse.json({ amenity: { _id: `amenity_${Date.now()}`, ...data } }, { status: 201 });
  }
}
