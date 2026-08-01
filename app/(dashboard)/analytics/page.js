'use client';

import React, { useEffect, useState } from 'react';
import { analyticsService } from '../../../services/analyticsService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import MaintenanceChart from '../../../components/charts/MaintenanceChart';
import BookingTrendChart from '../../../components/charts/BookingTrendChart';
import AmenityPopularityChart from '../../../components/charts/AmenityPopularityChart';
import { FiHome, FiUsers, FiTool, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsService
      .getAnalytics()
      .then((res) => setData(res.data))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-[#6B7A90]">
        <div className="w-8 h-8 border-4 border-[#5E8FBF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold">Generating Recharts analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1F3A5F] font-poppins">Platform Analytics & Intelligence</h2>
        <p className="text-xs text-[#6B7A90]">Interactive charts visualizing maintenance throughput, booking trends, and occupancy</p>
      </div>

      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#EAF3FA]/50 border-[#C7D7EA]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#34495E] font-bold uppercase tracking-wider">Total Properties</p>
              <h3 className="text-2xl font-bold text-[#183153] font-poppins mt-1">{data?.summary?.totalProperties || 0}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#5E8FBF] shadow-sm">
              <FiHome className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#EAF3FA]/50 border-[#C7D7EA]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#34495E] font-bold uppercase tracking-wider">Occupancy Rate</p>
              <h3 className="text-2xl font-bold text-[#183153] font-poppins mt-1">{data?.summary?.occupancyRate || 0}%</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#2E8B57] shadow-sm">
              <FiUsers className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#EAF3FA]/50 border-[#C7D7EA]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#34495E] font-bold uppercase tracking-wider">Work Orders</p>
              <h3 className="text-2xl font-bold text-[#183153] font-poppins mt-1">{data?.summary?.totalMaintenance || 0}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#C68A00] shadow-sm">
              <FiTool className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#EAF3FA]/50 border-[#C7D7EA]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#34495E] font-bold uppercase tracking-wider">Completion Rate</p>
              <h3 className="text-2xl font-bold text-[#183153] font-poppins mt-1">{data?.summary?.completionRate || 0}%</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#5E8FBF] shadow-sm">
              <FiShield className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Status Distribution</CardTitle>
            <CardDescription>Live breakdown of active and completed tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <MaintenanceChart data={data?.maintenanceStatus || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Booking Activity</CardTitle>
            <CardDescription>Amenity reservations vs maintenance dispatches</CardDescription>
          </CardHeader>
          <CardContent>
            <BookingTrendChart data={data?.bookingTrends || []} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Amenity Popularity Ranking</CardTitle>
          <CardDescription>Most frequently reserved community facilities</CardDescription>
        </CardHeader>
        <CardContent>
          <AmenityPopularityChart data={data?.popularAmenities || []} />
        </CardContent>
      </Card>
    </div>
  );
}
