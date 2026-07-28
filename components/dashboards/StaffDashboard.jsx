'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Wrench, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

export default function StaffDashboard({ data }) {
  const { maintenance = [] } = data;

  const assignedTasks = maintenance.filter((m) => m.status === 'Assigned' || m.status === 'In Progress');
  const completedTasks = maintenance.filter((m) => m.status === 'Completed');

  return (
    <div className="space-y-6">
      {/* Task Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-amber-900/30 to-slate-900/60 border-amber-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Assigned Work Orders</p>
              <h3 className="text-2xl font-black text-amber-400 mt-1">{assignedTasks.length}</h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/30 to-slate-900/60 border-emerald-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Completed Jobs</p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">{completedTasks.length}</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-900/30 to-slate-900/60 border-rose-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Emergency Dispatch</p>
              <h3 className="text-2xl font-black text-rose-400 mt-1">
                {maintenance.filter((m) => m.priority === 'Emergency' && m.status !== 'Completed').length}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Work Queue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-400" />
              <span>Assigned Maintenance Queue</span>
            </CardTitle>
            <CardDescription>Update step-by-step progress and upload proof photos</CardDescription>
          </div>
          <Link href="/maintenance" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
            View All Orders <ArrowRight className="w-3 h-3" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          {maintenance.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No work orders currently in your queue.</p>
          ) : (
            maintenance.map((ticket) => (
              <div key={ticket._id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold text-white">{ticket.title}</h5>
                    <Badge status={ticket.status} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{ticket.description}</p>
                  <p className="text-[11px] text-slate-500 mt-1">Property: {ticket.propertyId?.title || 'Residential Unit'}</p>
                </div>
                <Link href={`/maintenance/${ticket._id}`}>
                  <Button variant="outline" size="sm">
                    Manage Order
                  </Button>
                </Link>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
