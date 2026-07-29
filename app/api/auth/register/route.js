import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectToDatabase();
    await seedInitialData();

    const { name, email, password, role, phoneNumber, avatar } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Please provide all required fields' }, { status: 400 });
    }

    console.log("Creating User...");

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'Tenant',
      phoneNumber: phoneNumber || '',
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    });

    console.log("User Created");

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
    }, { status: 201 });
  } catch (error) {
    console.error("Register Error", error);
    return NextResponse.json({ message: 'Registration failed', error: error.message }, { status: 500 });
  }
}
