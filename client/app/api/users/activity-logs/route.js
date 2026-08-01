import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import ActivityLog from '@/models/ActivityLog';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    await seedInitialData();

    // Clean up any legacy development/seed entries
    await ActivityLog.deleteMany({
      $or: [
        { action: 'INITIAL_SEED' },
        { details: { $regex: /MongoDB Atlas initial collections|Database seeded|Mock data|Test records|System Audit Initiated/i } }
      ]
    });

    const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ success: true, count: logs.length, logs });
  } catch (error) {
    console.error("Fetch Activity Logs Error", error);
    return NextResponse.json({ message: 'Failed to fetch activity logs', error: error.message }, { status: 500 });
  }
}
