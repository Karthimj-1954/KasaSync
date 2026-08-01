'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { FiShield, FiUsers, FiHome, FiTool, FiActivity } from 'react-icons/fi';
import { formatDate } from '../../lib/utils';

export default function AdminDashboard({ data }) {
  const { summary = {}, activityLogs = [] } = data;

  return (
    <div className="space-y-6">
      {/* Global Platform Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#B4E1EB]/30 border-[#95BDD7]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#5A6E7C] font-bold uppercase tracking-wider">Total Users</p>
              <h3 className="text-2xl font-black text-[#24425C] font-poppins mt-1">{summary.totalUsers || 24}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#78A4CB] shadow-sm">
              <FiUsers className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#95BDD7]/30 border-[#78A4CB]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#5A6E7C] font-bold uppercase tracking-wider">Properties</p>
              <h3 className="text-2xl font-black text-[#24425C] font-poppins mt-1">{summary.totalProperties || 12}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#78A4CB] shadow-sm">
              <FiHome className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F9E8A2]/60 border-[#E7D688]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#5A6E7C] font-bold uppercase tracking-wider">Maintenance Tasks</p>
              <h3 className="text-2xl font-black text-[#24425C] font-poppins mt-1">{summary.totalMaintenance || 18}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#78A4CB] shadow-sm">
              <FiTool className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#B4E1EB]/30 border-[#95BDD7]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#5A6E7C] font-bold uppercase tracking-wider">Resolution Rate</p>
              <h3 className="text-2xl font-black text-[#24425C] font-poppins mt-1">{summary.completionRate || 92}%</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#78A4CB] shadow-sm">
              <FiShield className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time System Activity Feed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Platform Audit & Activity Log</CardTitle>
            <CardDescription>Real-time security and operations timeline</CardDescription>
          </div>
          <Badge status="Available">Live Feed</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {activityLogs.length === 0 ? (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#F5FBFD] border border-[#E7EEF4] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FiActivity className="w-4 h-4 text-[#78A4CB]" />
                  <div>
                    <p className="font-bold text-[#24425C] font-poppins">System Audit Initiated</p>
                    <p className="text-[11px] text-[#6F8190]">MongoDB Atlas collections synced successfully.</p>
                  </div>
                </div>
                <span className="text-[10px] text-[#6F8190]">Just now</span>
              </div>
            </div>
          ) : (
            activityLogs.slice(0, 5).map((log) => (
              <div key={log._id} className="p-3.5 rounded-xl bg-[#F5FBFD] border border-[#E7EEF4] flex items-center justify-between text-xs hover:border-[#95BDD7] transition">
                <div className="flex items-center gap-3">
                  <FiActivity className="w-4 h-4 text-[#78A4CB]" />
                  <div>
                    <p className="font-bold text-[#24425C] font-poppins">{log.action}</p>
                    <p className="text-[11px] text-[#6F8190]">{log.details}</p>
                  </div>
                </div>
                <span className="text-[10px] text-[#6F8190]">{formatDate(log.createdAt)}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
