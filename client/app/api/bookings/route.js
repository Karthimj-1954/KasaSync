import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import Booking from '@/models/Booking';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

const timeToMinutes = (t) => {
  if (!t) return 0;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export async function GET() {
  try {
    await connectToDatabase();
    await seedInitialData();

    const bookings = await Booking.find()
      .populate('amenityId')
      .populate('tenantId', 'name email avatar')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Fetch Bookings Error", error);
    return NextResponse.json({ message: 'Failed to fetch amenity bookings', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    await seedInitialData();

    const data = await req.json();
    const { amenityId, tenantId, bookingDate, startTime, endTime, totalGuests, notes } = data;

    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);

    if (newStart >= newEnd) {
      return NextResponse.json({ message: 'Check-out time must be after check-in time' }, { status: 400 });
    }

    console.log("Creating Booking...");

    let activeTenantId = tenantId;
    if (!activeTenantId) {
      const tenantUser = await User.findOne({ role: 'Tenant' });
      activeTenantId = tenantUser ? tenantUser._id : null;
    }

    const existing = await Booking.find({
      amenityId,
      bookingDate,
      status: 'Confirmed',
    });

    const conflict = existing.some((b) => {
      const bStart = timeToMinutes(b.startTime);
      const bEnd = timeToMinutes(b.endTime);
      return bStart < newEnd && bEnd > newStart;
    });

    if (conflict) {
      return NextResponse.json({ message: 'Conflict detected: Selected time slot overlaps with an existing reservation.' }, { status: 400 });
    }

    const booking = await Booking.create({
      amenityId,
      tenantId: activeTenantId,
      bookingDate,
      startTime,
      endTime,
      totalGuests: Number(totalGuests) || 1,
      notes: notes || '',
      status: 'Confirmed',
    });

    console.log("Booking Saved");

    const populatedBooking = await Booking.findById(booking._id).populate('amenityId').populate('tenantId', 'name email');

    return NextResponse.json({ success: true, booking: populatedBooking }, { status: 201 });
  } catch (error) {
    console.error("Create Booking Error", error);
    return NextResponse.json({ message: 'Failed to save booking', error: error.message }, { status: 500 });
  }
}
