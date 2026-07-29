import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    await seedInitialData();

    const users = await User.find().select('-password').sort({ name: 1 });
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Fetch Users Error", error);
    return NextResponse.json({ message: 'Failed to fetch users', error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();

    const { userId, name, phoneNumber, avatar, notificationPreferences } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: 'User ID required' }, { status: 400 });
    }

    console.log("Updating User Profile...");

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(phoneNumber !== undefined && { phoneNumber }),
        ...(avatar && { avatar }),
        ...(notificationPreferences && { notificationPreferences }),
      },
      { new: true, runValidators: true }
    ).select('-password');

    console.log("User Profile Updated");

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update User Error", error);
    return NextResponse.json({ message: 'Failed to update user profile', error: error.message }, { status: 500 });
  }
}
