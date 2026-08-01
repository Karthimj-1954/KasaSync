import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Notification from '@/models/Notification';

export async function PUT(req) {
  try {
    await connectToDatabase();
    const { notificationIds } = await req.json().catch(() => ({}));
    if (Array.isArray(notificationIds) && notificationIds.length > 0) {
      await Notification.updateMany(
        { _id: { $in: notificationIds } },
        { isRead: true }
      );
    } else {
      await Notification.updateMany({}, { isRead: true });
    }
    return NextResponse.json({ success: true, message: 'Notifications marked as read' });
  } catch (error) {
    console.error("Mark Notifications Read Error", error);
    return NextResponse.json({ message: 'Failed to update notifications', error: error.message }, { status: 500 });
  }
}
