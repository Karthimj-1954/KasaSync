import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const DEMO_USER_PROFILES = {
  'admin@kasasync.com': {
    name: 'Eleanor Vance (Admin)',
    role: 'Admin',
    phoneNumber: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  },
  'owner@kasasync.com': {
    name: 'Marcus Sterling (Property Owner)',
    role: 'Property Owner',
    phoneNumber: '+91 98765 43211',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  },
  'tenant@kasasync.com': {
    name: 'Sophia Martinez (Tenant)',
    role: 'Tenant',
    phoneNumber: '+91 98765 43212',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
  },
  'staff@kasasync.com': {
    name: 'David Miller (Maintenance Technician)',
    role: 'Maintenance Staff',
    phoneNumber: '+91 98765 43213',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
  },
};

export async function POST(req) {
  try {
    await connectToDatabase();
    await seedInitialData();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Please supply email and password' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    console.log("Authenticating User:", cleanEmail);

    let user = await User.findOne({ email: cleanEmail });

    // Handle Quick Demo Login Accounts
    if (DEMO_USER_PROFILES[cleanEmail]) {
      const profile = DEMO_USER_PROFILES[cleanEmail];
      const hashedPassword = await bcrypt.hash(password, 10);

      if (!user) {
        user = await User.create({
          name: profile.name,
          email: cleanEmail,
          password: hashedPassword,
          role: profile.role,
          phoneNumber: profile.phoneNumber,
          avatar: profile.avatar,
        });
      } else {
        // Ensure demo password matches input
        user.password = hashedPassword;
        await user.save();
      }
    } else {
      // Standard Non-Demo User Login
      if (!user) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
      }
    }

    console.log("User Authenticated Successfully:", user.name);

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'kasasync_secret',
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
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
  } catch (error) {
    console.error("Login Error", error);
    return NextResponse.json({ message: 'Authentication failed', error: error.message }, { status: 500 });
  }
}
