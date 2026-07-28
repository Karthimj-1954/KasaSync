import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Message from '../../../../models/Message';

export async function GET(req, { params }) {
  const resolvedParams = await params;
  const otherUserId = resolvedParams?.otherUserId;

  try {
    await connectToDatabase();
    const messages = await Message.find().sort({ createdAt: 1 });
    return NextResponse.json({ messages });
  } catch (e) {
    return NextResponse.json({ messages: [] });
  }
}
