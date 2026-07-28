import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Notification from '../../../models/Notification';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20);
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    return NextResponse.json({ unreadCount, notifications });
  } catch (e) {
    return NextResponse.json({ unreadCount: 0, notifications: [] });
  }
}

export async function PUT(req) {
  try {
    const { notificationIds } = await req.json();
    await connectToDatabase();
    if (notificationIds && notificationIds.length > 0) {
      await Notification.updateMany({ _id: { $in: notificationIds } }, { isRead: true });
    }
  } catch (e) {}
  return NextResponse.json({ success: true });
}
