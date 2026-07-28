import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Booking from '../../../../models/Booking';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const amenityId = searchParams.get('amenityId');
  const bookingDate = searchParams.get('bookingDate');

  try {
    await connectToDatabase();
    const bookedSlots = await Booking.find({ amenityId, bookingDate, status: 'Confirmed' });
    return NextResponse.json({ success: true, bookedSlots });
  } catch (e) {
    return NextResponse.json({ success: true, bookedSlots: [] });
  }
}
