import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectToDatabase();
    await seedInitialData();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Please supply email and password' }, { status: 400 });
    }

    console.log("Authenticating User...");

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
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
