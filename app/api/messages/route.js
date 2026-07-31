import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import Message from '@/models/Message';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectToDatabase();
    await seedInitialData();

    const searchParams = req.nextUrl ? req.nextUrl.searchParams : new URL(req.url, 'http://localhost').searchParams;
    const userId = searchParams.get('userId');

    let query = {};
    if (userId) {
      query = { $or: [{ senderId: userId }, { receiverId: userId }] };
    }

    const messages = await Message.find(query)
      .populate('senderId', 'name avatar email role')
      .populate('receiverId', 'name avatar email role')
      .sort({ createdAt: 1 });

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("Fetch Messages Error", error);
    return NextResponse.json({ message: 'Failed to fetch messages', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    await seedInitialData();

    const { senderId, receiverId, text } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ message: 'Message text is required' }, { status: 400 });
    }

    console.log("Sending Message...");

    let activeSenderId = senderId;
    let activeReceiverId = receiverId;

    if (!activeSenderId) {
      const tenantUser = await User.findOne({ role: 'Tenant' });
      activeSenderId = tenantUser ? tenantUser._id : null;
    }

    if (!activeReceiverId) {
      const ownerUser = await User.findOne({ role: 'Property Owner' });
      activeReceiverId = ownerUser ? ownerUser._id : null;
    }

    const message = await Message.create({
      senderId: activeSenderId,
      receiverId: activeReceiverId,
      text: text.trim(),
      isRead: false,
    });

    console.log("Message Sent");

    const populatedMessage = await Message.findById(message._id)
      .populate('senderId', 'name avatar email role')
      .populate('receiverId', 'name avatar email role');

    return NextResponse.json({ success: true, message: populatedMessage }, { status: 201 });
  } catch (error) {
    console.error("Send Message Error", error);
    return NextResponse.json({ message: 'Failed to send message', error: error.message }, { status: 500 });
  }
}
