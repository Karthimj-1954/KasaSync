'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import {
  FiShield,
  FiUsers,
  FiHome,
  FiTool,
  FiActivity,
  FiCalendar,
  FiMessageSquare,
  FiCoffee,
  FiClock,
  FiRefreshCw
} from 'react-icons/fi';
import { formatRelativeTime, getActivityMeta } from '../../lib/utils';

function renderActivityIcon(iconName, className = 'w-4 h-4') {
  switch (iconName) {
    case 'FiHome': return <FiHome className={className} />;
    case 'FiTool': return <FiTool className={className} />;
    case 'FiCalendar': return <FiCalendar className={className} />;
    case 'FiMessageSquare': return <FiMessageSquare className={className} />;
    case 'FiShield': return <FiShield className={className} />;
    case 'FiCoffee': return <FiCoffee className={className} />;
    case 'FiActivity': return <FiActivity className={className} />;
    default: return <FiClock className={className} />;
  }
}

export default function AdminDashboard({ data = {}, onRefresh }) {
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
            <CardDescription>Real-time operations timeline and system events</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-1.5 rounded-lg bg-white border border-[#D6E4F2] text-[#425466] hover:bg-[#EAF3FA] hover:text-[#2B5F9E] transition"
                title="Refresh Activity"
              >
                <FiRefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
            <Badge status="Available">Live Feed</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {activityLogs.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-4 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#D6E4F2]">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3FA] text-[#5E8FBF] border border-[#D6E4F2] flex items-center justify-center mx-auto shadow-sm">
                <FiActivity className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h4 className="text-sm font-bold text-[#183153] font-poppins">No recent activity</h4>
                <p className="text-xs text-[#6B7A90] leading-relaxed">
                  Platform activity will appear here as users interact with the system.
                </p>
              </div>
              {onRefresh && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onRefresh}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2"
                >
                  <FiRefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Activity</span>
                </Button>
              )}
            </div>
          ) : (
            activityLogs.slice(0, 8).map((log, idx) => {
              const meta = getActivityMeta(log.entityType, log.action);
              return (
                <div
                  key={log._id || idx}
                  className="p-3.5 rounded-2xl bg-white border border-[#E7EEF4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-[#95BDD7] transition duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl shrink-0 ${meta.iconContainerClass}`}>
                      {renderActivityIcon(meta.iconName, 'w-4 h-4')}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${meta.badgeClass}`}>
                          {meta.typeLabel}
                        </span>
                        <h4 className="text-xs font-bold text-[#183153] font-poppins">{log.action}</h4>
                      </div>
                      <p className="text-xs text-[#425466] leading-relaxed">{log.details}</p>
                      {log.userEmail && (
                        <p className="text-[10px] text-[#6B7A90] pt-0.5 font-medium">Performed by {log.userEmail}</p>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-[11px] font-semibold text-[#6B7A90] inline-block px-2.5 py-1 bg-[#F5F8FC] rounded-lg border border-[#E2EAF2]">
                      {formatRelativeTime(log.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
