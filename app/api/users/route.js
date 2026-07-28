import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

const MOCK_USERS = [
  { _id: 'usr_1', name: 'Eleanor Vance (Admin)', email: 'admin@kasasync.com', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
  { _id: 'usr_2', name: 'Marcus Sterling (Owner)', email: 'owner@kasasync.com', role: 'Property Owner', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
  { _id: 'usr_3', name: 'Sophia Martinez (Tenant)', email: 'tenant@kasasync.com', role: 'Tenant', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
  { _id: 'usr_4', name: 'David Miller (Technician)', email: 'staff@kasasync.com', role: 'Maintenance Staff', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
];

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find().select('-password').sort({ name: 1 });
    if (!users || users.length === 0) return NextResponse.json({ users: MOCK_USERS });
    return NextResponse.json({ users });
  } catch (e) {
    return NextResponse.json({ users: MOCK_USERS });
  }
}
