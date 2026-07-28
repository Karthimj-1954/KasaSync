import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Amenity from '../../../../models/Amenity';

const MOCK_AMENITIES = [
  { _id: 'amenity_1', id: 'amenity_1', name: 'Equinox Elite Fitness Center', category: 'Gym', capacity: 35, openingTime: '05:00', closingTime: '23:00', images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48'], isActive: true },
];

export async function GET(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  try {
    await connectToDatabase();
    const amenity = await Amenity.findById(id);
    if (amenity) return NextResponse.json({ amenity });
  } catch (e) {}

  return NextResponse.json({ amenity: MOCK_AMENITIES[0] });
}
