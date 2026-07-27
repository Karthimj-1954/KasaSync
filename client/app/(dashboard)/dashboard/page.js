'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import TenantDashboard from '../../../components/dashboards/TenantDashboard';
import OwnerDashboard from '../../../components/dashboards/OwnerDashboard';
import StaffDashboard from '../../../components/dashboards/StaffDashboard';
import AdminDashboard from '../../../components/dashboards/AdminDashboard';
import { propertyService } from '../../../services/propertyService';
import { maintenanceService } from '../../../services/maintenanceService';
import { bookingService } from '../../../services/bookingService';
import { analyticsService } from '../../../services/analyticsService';
import { authService } from '../../../services/authService';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState({
    properties: [],
    maintenance: [],
    bookings: [],
    summary: {},
    activityLogs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [propsRes, maintRes, bookRes, analyticsRes] = await Promise.allSettled([
          propertyService.getProperties(),
          maintenanceService.getMaintenanceRequests(),
          bookingService.getBookings(),
          analyticsService.getAnalytics(),
        ]);

        let activityLogs = [];
        if (user?.role === 'Admin') {
          try {
            const logRes = await authService.getActivityLogs();
            activityLogs = logRes.logs || [];
          } catch (e) {}
        }

        const properties = propsRes.status === 'fulfilled' ? propsRes.value.properties || [] : [];
        const maintenance = maintRes.status === 'fulfilled' ? maintRes.value.requests || [] : [];
        const bookings = bookRes.status === 'fulfilled' ? bookRes.value.bookings || [] : [];
        const summary = analyticsRes.status === 'fulfilled' ? analyticsRes.value.data?.summary || {} : {};

        // Find tenant property if applicable
        const userProperty = properties.find((p) => p.tenantId?._id === user?.id || p.tenantId === user?.id) || properties[0];

        setData({
          properties,
          property: userProperty,
          maintenance,
          bookings,
          summary,
          activityLogs,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold">Loading real-time dashboard state...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {user?.role === 'Admin' && <AdminDashboard data={data} />}
      {user?.role === 'Property Owner' && <OwnerDashboard data={data} />}
      {user?.role === 'Maintenance Staff' && <StaffDashboard data={data} />}
      {user?.role === 'Tenant' && <TenantDashboard data={data} />}
    </div>
  );
}
