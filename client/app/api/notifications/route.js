import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import Notification from '@/models/Notification';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    await seedInitialData();

    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20);
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return NextResponse.json({ success: true, unreadCount, notifications });
  } catch (error) {
    console.error("Fetch Notifications Error", error);
    return NextResponse.json({ message: 'Failed to fetch notifications', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const { userId, title, message, type, link } = await req.json();

    console.log("Creating Notification...");

    let targetUserId = userId;
    if (!targetUserId) {
      const defaultUser = await User.findOne();
      targetUserId = defaultUser ? defaultUser._id : null;
    }

    const notification = await Notification.create({
      userId: targetUserId,
      title,
      message,
      type: type || 'SYSTEM',
      link: link || '',
      isRead: false,
    });

    console.log("Notification Created");

    return NextResponse.json({ success: true, notification }, { status: 201 });
  } catch (error) {
    console.error("Create Notification Error", error);
    return NextResponse.json({ message: 'Failed to create notification', error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const { notificationIds } = await req.json();

    if (notificationIds && notificationIds.length > 0) {
      await Notification.updateMany({ _id: { $in: notificationIds } }, { isRead: true });
    } else {
      await Notification.updateMany({ isRead: false }, { isRead: true });
    }

    return NextResponse.json({ success: true, message: 'Notifications marked as read' });
  } catch (error) {
    console.error("Update Notifications Error", error);
    return NextResponse.json({ message: 'Failed to update notifications', error: error.message }, { status: 500 });
  }
}
