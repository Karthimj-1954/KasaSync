'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { FiTool, FiCheckCircle, FiClock, FiAlertTriangle } from 'react-icons/fi';
import { formatDate } from '../../lib/utils';

export default function StaffDashboard({ data }) {
  const { maintenance = [] } = data;

  const assignedTasks = maintenance.filter((m) => m.status === 'Assigned' || m.status === 'In Progress');
  const completedTasks = maintenance.filter((m) => m.status === 'Completed');

  return (
    <div className="space-y-6">
      {/* Task Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#F9E8A2]/60 border-[#E7D688]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#5A6E7C] font-bold uppercase tracking-wider">Assigned Work Orders</p>
              <h3 className="text-2xl font-black text-[#24425C] font-poppins mt-1">{assignedTasks.length}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#78A4CB] shadow-sm">
              <FiClock className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#B4E1EB]/30 border-[#95BDD7]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#5A6E7C] font-bold uppercase tracking-wider">Completed Jobs</p>
              <h3 className="text-2xl font-black text-[#24425C] font-poppins mt-1">{completedTasks.length}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#78A4CB] shadow-sm">
              <FiCheckCircle className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#95BDD7]/30 border-[#78A4CB]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#5A6E7C] font-bold uppercase tracking-wider">Emergency Dispatch</p>
              <h3 className="text-2xl font-black text-rose-600 font-poppins mt-1">
                {maintenance.filter((m) => m.priority === 'Emergency' && m.status !== 'Completed').length}
              </h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-rose-500 shadow-sm">
              <FiAlertTriangle className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Work Queue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Active Dispatch Queue</CardTitle>
            <CardDescription>Work orders assigned to technical field staff</CardDescription>
          </div>
          <Link href="/maintenance">
            <Button variant="primary" size="sm">
              Open Board &rarr;
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {maintenance.length === 0 ? (
            <p className="text-xs text-[#6F8190] text-center py-8">No maintenance tickets in queue.</p>
          ) : (
            maintenance.slice(0, 5).map((task) => (
              <div key={task._id} className="p-4 rounded-xl bg-white border border-[#E7EEF4] hover:border-[#95BDD7] flex items-center justify-between gap-4 transition shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#24425C] font-poppins">{task.title}</p>
                    {task.priority === 'High' || task.priority === 'Emergency' ? (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold border border-rose-200">
                        {task.priority}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-[#6F8190]">{task.description}</p>
                  <p className="text-[10px] text-[#6F8190]">{formatDate(task.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={task.status} />
                  <Link href={`/maintenance/${task._id}`}>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
