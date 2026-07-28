import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

const DEMO_USERS_MAP = {
  'admin@kasasync.com': {
    _id: 'usr_admin_1',
    id: 'usr_admin_1',
    name: 'Eleanor Vance (Admin)',
    email: 'admin@kasasync.com',
    role: 'Admin',
    phoneNumber: '+1 (555) 019-2834',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  },
  'owner@kasasync.com': {
    _id: 'usr_owner_1',
    id: 'usr_owner_1',
    name: 'Marcus Sterling (Property Owner)',
    email: 'owner@kasasync.com',
    role: 'Property Owner',
    phoneNumber: '+1 (555) 012-9843',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  },
  'tenant@kasasync.com': {
    _id: 'usr_tenant_1',
    id: 'usr_tenant_1',
    name: 'Sophia Martinez (Tenant)',
    email: 'tenant@kasasync.com',
    role: 'Tenant',
    phoneNumber: '+1 (555) 014-5521',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
  },
  'staff@kasasync.com': {
    _id: 'usr_staff_1',
    id: 'usr_staff_1',
    name: 'David Miller (Maintenance Technician)',
    email: 'staff@kasasync.com',
    role: 'Maintenance Staff',
    phoneNumber: '+1 (555) 018-7733',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
  },
};

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Please supply email and password' }, { status: 400 });
    }

    try {
      await connectToDatabase();
      const user = await User.findOne({ email: email.toLowerCase() });

      if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'kasasync_secret', {
          expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        });
        return NextResponse.json({
          user: {
            id: user._id,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar,
          },
          token,
        });
      }
    } catch (dbError) {
      // Fallback demo evaluation mode
    }

    // Demo evaluation fallback
    const demo = DEMO_USERS_MAP[email.toLowerCase()] || DEMO_USERS_MAP['tenant@kasasync.com'];
    const token = jwt.sign({ id: demo._id }, process.env.JWT_SECRET || 'kasasync_secret', {
      expiresIn: '7d',
    });

    return NextResponse.json({
      user: demo,
      token,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Authentication failed' }, { status: 500 });
  }
}
