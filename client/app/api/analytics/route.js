import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      summary: {
        totalProperties: 12,
        occupiedProperties: 10,
        occupancyRate: 83,
        totalMaintenance: 18,
        completedMaintenance: 16,
        completionRate: 88,
        totalUsers: 24,
        ownerCount: 4,
        tenantCount: 16,
        staffCount: 3,
      },
      maintenanceStatus: [
        { name: 'Pending', count: 2, fill: '#f59e0b' },
        { name: 'Accepted', count: 3, fill: '#3b82f6' },
        { name: 'Assigned', count: 2, fill: '#8b5cf6' },
        { name: 'In Progress', count: 3, fill: '#ec4899' },
        { name: 'Completed', count: 16, fill: '#10b981' },
        { name: 'Rejected', count: 1, fill: '#ef4444' },
      ],
      bookingTrends: [
        { day: 'Mon', bookings: 8, requests: 3 },
        { day: 'Tue', bookings: 12, requests: 5 },
        { day: 'Wed', bookings: 10, requests: 2 },
        { day: 'Thu', bookings: 15, requests: 6 },
        { day: 'Fri', bookings: 18, requests: 4 },
        { day: 'Sat', bookings: 22, requests: 1 },
        { day: 'Sun', bookings: 14, requests: 2 },
      ],
      popularAmenities: [
        { name: 'Equinox Fitness', bookings: 42 },
        { name: 'Skyline Pool', bookings: 38 },
        { name: 'Grand Clubhouse', bookings: 29 },
        { name: 'Boardroom', bookings: 24 },
        { name: 'EV Bays', bookings: 19 },
      ],
    },
  });
}
