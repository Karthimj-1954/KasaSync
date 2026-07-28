'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { ShieldCheck, Users, Building2, Wrench, CalendarCheck, Activity } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export default function AdminDashboard({ data }) {
  const { summary = {}, activityLogs = [] } = data;

  return (
    <div className="space-y-6">
      {/* Global Platform Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/40 to-slate-900/60 border-blue-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Total Users</p>
              <h3 className="text-2xl font-black text-white mt-1">{summary.totalUsers || 24}</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
              <Users className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-slate-900/60 border-emerald-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Properties</p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">{summary.totalProperties || 12}</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Building2 className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-900/40 to-slate-900/60 border-amber-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Maintenance Tasks</p>
              <h3 className="text-2xl font-black text-amber-400 mt-1">{summary.totalMaintenance || 18}</h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
              <Wrench className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-slate-900/60 border-purple-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Resolution Rate</p>
              <h3 className="text-2xl font-black text-purple-300 mt-1">{summary.completionRate || 92}%</h3>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Logs Stream */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Audit Trail</span>
            </CardTitle>
            <CardDescription>Live system activity and security logs</CardDescription>
          </div>
          <Link href="/admin" className="text-xs text-emerald-400 hover:underline">
            Manage System
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {activityLogs.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No recent audit logs recorded.</p>
          ) : (
            activityLogs.slice(0, 5).map((log) => (
              <div key={log._id} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">{log.action}</span>
                  <p className="text-xs text-white mt-0.5">{log.details}</p>
                  <p className="text-[10px] text-slate-500">{log.userEmail || 'System'} • {formatDate(log.createdAt)}</p>
                </div>
                <Badge status="Confirmed">{log.entityType}</Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
