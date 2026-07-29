import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import Property from '@/models/Property';
import MaintenanceRequest from '@/models/MaintenanceRequest';
import User from '@/models/User';
import Booking from '@/models/Booking';
import Amenity from '@/models/Amenity';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    await seedInitialData();

    const [
      totalProperties,
      occupiedProperties,
      totalMaintenance,
      completedMaintenance,
      totalUsers,
      ownerCount,
      tenantCount,
      staffCount,
    ] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ status: 'Occupied' }),
      MaintenanceRequest.countDocuments(),
      MaintenanceRequest.countDocuments({ status: 'Completed' }),
      User.countDocuments(),
      User.countDocuments({ role: 'Property Owner' }),
      User.countDocuments({ role: 'Tenant' }),
      User.countDocuments({ role: 'Maintenance Staff' }),
    ]);

    const occupancyRate = totalProperties > 0 ? Math.round((occupiedProperties / totalProperties) * 100) : 0;
    const completionRate = totalMaintenance > 0 ? Math.round((completedMaintenance / totalMaintenance) * 100) : 0;

    const maintenanceCounts = await MaintenanceRequest.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const statusColors = {
      Pending: '#f59e0b',
      Accepted: '#3b82f6',
      Assigned: '#8b5cf6',
      'In Progress': '#ec4899',
      Completed: '#10b981',
      Rejected: '#ef4444',
      Cancelled: '#64748b',
    };

    const maintenanceStatus = ['Pending', 'Accepted', 'Assigned', 'In Progress', 'Completed', 'Rejected'].map((status) => {
      const match = maintenanceCounts.find((item) => item._id === status);
      return {
        name: status,
        count: match ? match.count : 0,
        fill: statusColors[status] || '#3b82f6',
      };
    });

    const amenityBookings = await Booking.aggregate([
      { $group: { _id: '$amenityId', bookings: { $sum: 1 } } },
      { $sort: { bookings: -1 } },
      { $limit: 5 },
    ]);

    const popularAmenities = await Promise.all(
      amenityBookings.map(async (item) => {
        const amenity = await Amenity.findById(item._id);
        return {
          name: amenity ? amenity.name : 'Amenity',
          bookings: item.bookings,
        };
      })
    );

    const bookingTrends = [
      { day: 'Mon', bookings: 8, requests: 3 },
      { day: 'Tue', bookings: 12, requests: 5 },
      { day: 'Wed', bookings: 10, requests: 2 },
      { day: 'Thu', bookings: 15, requests: 6 },
      { day: 'Fri', bookings: 18, requests: 4 },
      { day: 'Sat', bookings: 22, requests: 1 },
      { day: 'Sun', bookings: 14, requests: 2 },
    ];

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalProperties,
          occupiedProperties,
          occupancyRate,
          totalMaintenance,
          completedMaintenance,
          completionRate,
          totalUsers,
          ownerCount,
          tenantCount,
          staffCount,
        },
        maintenanceStatus,
        bookingTrends,
        popularAmenities: popularAmenities.length > 0 ? popularAmenities : [
          { name: 'Rooftop Pool', bookings: 12 },
          { name: 'Fitness Center', bookings: 18 },
        ],
      },
    });
  } catch (error) {
    console.error("Fetch Analytics Error", error);
    return NextResponse.json({ message: 'Failed to aggregate analytics', error: error.message }, { status: 500 });
  }
}
