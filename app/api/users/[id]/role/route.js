import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import ActivityLog from '@/models/ActivityLog';

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { role } = await req.json();

    if (!id || !role) {
      return NextResponse.json({ message: 'User ID and new role are required' }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await ActivityLog.create({
      action: 'ROLE_UPDATED',
      details: `Changed role of ${user.email} to ${role}`,
      userEmail: user.email,
      entityType: 'USER',
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Update User Role Error", error);
    return NextResponse.json({ message: 'Failed to update user role', error: error.message }, { status: 500 });
  }
}
