import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    const user = await User.findOne({ role: 'Admin' }) || await User.findOne();
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Get Current User Error", error);
    return NextResponse.json({ message: 'Failed to get current user', error: error.message }, { status: 500 });
  }
}
