import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const booking = await Booking.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });
    if (!booking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Cancel Booking Error", error);
    return NextResponse.json({ message: 'Failed to cancel booking', error: error.message }, { status: 500 });
  }
}
