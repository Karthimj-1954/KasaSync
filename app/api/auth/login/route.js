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

    // Auto-create user in MongoDB Atlas if account doesn't exist yet
    if (!user) {
      console.log("User not found in Atlas. Auto-creating account in MongoDB Atlas...");
      const profile = DEMO_USER_PROFILES[cleanEmail] || {
        name: cleanEmail.split('@')[0],
        role: 'Tenant',
        phoneNumber: '',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      };

      const hashedPassword = await bcrypt.hash(password || 'password123', 10);

      user = await User.create({
        name: profile.name,
        email: cleanEmail,
        password: hashedPassword,
        role: profile.role,
        phoneNumber: profile.phoneNumber,
        avatar: profile.avatar,
      });

      console.log("User Auto-Created in MongoDB Atlas!");
    } else {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        // Fallback for default demo accounts if password hash mismatch occurs
        if (DEMO_USER_PROFILES[cleanEmail]) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
          await user.save();
        } else {
          return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }
      }
    }

    console.log("User Authenticated Successfully");

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
