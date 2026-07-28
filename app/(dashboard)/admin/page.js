'use client';

import React, { useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import { ShieldCheck, Users, Activity, UserCheck } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminPanelPage() {
  const [users, setUsers] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [uRes, aRes] = await Promise.all([
        authService.getUsers(),
        authService.getActivityLogs(),
      ]);
      setUsers(uRes.users || []);
      setActivityLogs(aRes.logs || []);
    } catch (err) {
      toast.error('Failed to load admin management data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await authService.updateUserRole(userId, newRole);
      toast.success('User role updated!');
      loadAdminData();
    } catch (err) {
      toast.error('Failed to change user role.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Platform Administration Panel</h2>
          <p className="text-xs text-slate-400">Governance, user access control, and security activity audit logs</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400'}`}
          >
            User Management ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'logs' ? 'bg-blue-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400'}`}
          >
            Audit Logs ({activityLogs.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-400">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold">Loading administration data...</p>
        </div>
      ) : activeTab === 'users' ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Registered Accounts & Roles</span>
            </CardTitle>
            <CardDescription>Manage user roles and authorization permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {users.map((userItem) => (
              <div key={userItem._id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={userItem.avatar} alt={userItem.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{userItem.name}</h4>
                    <p className="text-xs text-slate-400">{userItem.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Select
                    value={userItem.role}
                    onChange={(e) => handleRoleChange(userItem._id, e.target.value)}
                    options={['Tenant', 'Property Owner', 'Maintenance Staff', 'Admin']}
                  />
                  <Badge status="Confirmed">{userItem.role}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Security & Event Audit Trail</span>
            </CardTitle>
            <CardDescription>Chronological stream of system activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activityLogs.map((log) => (
              <div key={log._id} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">{log.action}</span>
                  <p className="text-xs text-white mt-0.5">{log.details}</p>
                  <p className="text-[10px] text-slate-500">{log.userEmail || 'System'} • {formatDate(log.createdAt)}</p>
                </div>
                <Badge status="Confirmed">{log.entityType}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
