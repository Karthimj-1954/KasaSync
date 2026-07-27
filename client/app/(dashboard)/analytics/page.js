'use client';

import React, { useEffect, useState } from 'react';
import { analyticsService } from '../../../services/analyticsService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import MaintenanceChart from '../../../components/charts/MaintenanceChart';
import BookingTrendChart from '../../../components/charts/BookingTrendChart';
import AmenityPopularityChart from '../../../components/charts/AmenityPopularityChart';
import { BarChart3, TrendingUp, Users, Building2, Wrench, Sparkles } from 'lucide-react';
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
      <div className="py-20 text-center text-slate-400">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold">Generating Recharts analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white">Platform Analytics & Intelligence</h2>
        <p className="text-xs text-slate-400">Interactive charts visualizing maintenance throughput, booking trends, and occupancy</p>
      </div>

      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/60">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Total Properties</p>
              <h3 className="text-2xl font-black text-white mt-1">{data?.summary?.totalProperties || 0}</h3>
            </div>
            <Building2 className="w-6 h-6 text-blue-400" />
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Occupancy Rate</p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">{data?.summary?.occupancyRate || 0}%</h3>
            </div>
            <Users className="w-6 h-6 text-emerald-400" />
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Ticket Completion</p>
              <h3 className="text-2xl font-black text-purple-400 mt-1">{data?.summary?.completionRate || 0}%</h3>
            </div>
            <Wrench className="w-6 h-6 text-purple-400" />
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Platform Users</p>
              <h3 className="text-2xl font-black text-amber-400 mt-1">{data?.summary?.totalUsers || 0}</h3>
            </div>
            <BarChart3 className="w-6 h-6 text-amber-400" />
          </CardContent>
        </Card>
      </div>

      {/* Visual Graphs Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>Weekly Booking & Ticket Trends</span>
            </CardTitle>
            <CardDescription>Volume activity over past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <BookingTrendChart data={data?.bookingTrends || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-emerald-400" />
              <span>Maintenance Requests Status Distribution</span>
            </CardTitle>
            <CardDescription>Tickets by lifecycle stage</CardDescription>
          </CardHeader>
          <CardContent>
            <MaintenanceChart data={data?.maintenanceStatus || []} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Popular Community Amenities Ranking</span>
            </CardTitle>
            <CardDescription>Reservations count per amenity facility</CardDescription>
          </CardHeader>
          <CardContent>
            <AmenityPopularityChart data={data?.popularAmenities || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
