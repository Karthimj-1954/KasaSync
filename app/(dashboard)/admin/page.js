'use client';

import React, { useState, useEffect } from 'react';
import { authService } from '../../../services/authService';
import { Card } from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Select from '../../../components/ui/Select';
import { formatDate } from '../../../lib/utils';
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
          <h2 className="text-2xl font-bold text-[#1F3A5F] font-poppins">Platform Administration Panel</h2>
          <p className="text-xs text-[#6B7A90]">Governance, user access control, and security activity audit logs</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'users' ? 'bg-[#5E8FBF] text-white shadow-md' : 'bg-white border border-[#C7D7EA] text-[#425466] hover:bg-[#EAF3FA]'}`}
          >
            User Management ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'logs' ? 'bg-[#5E8FBF] text-white shadow-md' : 'bg-white border border-[#C7D7EA] text-[#425466] hover:bg-[#EAF3FA]'}`}
          >
            Audit Trail Logs ({activityLogs.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-[#6B7A90]">
          <div className="w-8 h-8 border-4 border-[#5E8FBF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold">Fetching administrative state...</p>
        </div>
      ) : activeTab === 'users' ? (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#4A5F77]">
              <thead className="bg-[#EAF3FA] border-b border-[#C7D7EA] text-[#17324D] font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Joined Date</th>
                  <th className="p-4">Role Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAF3FA]">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-[#F7FAFC] transition">
                    <td className="p-4 flex items-center gap-3">
                      <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-[#5E8FBF]" />
                      <span className="font-bold text-[#183153] font-poppins">{u.name}</span>
                    </td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">
                      <Badge status="Available">{u.role}</Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-[#2E8B57] font-semibold">Active</span>
                    </td>
                    <td className="p-4 text-[#6B7A90]">{formatDate(u.createdAt)}</td>
                    <td className="p-4">
                      <Select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        options={['Admin', 'Property Owner', 'Tenant', 'Maintenance Staff']}
                        className="py-1 px-2 text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {activityLogs.map((log) => (
            <Card key={log._id}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3E7CB1]">{log.action}</span>
                  <h5 className="text-xs font-semibold text-[#183153] font-poppins mt-0.5">{log.details}</h5>
                  <p className="text-[10px] text-[#6B7A90]">{log.userEmail || 'System'} • {formatDate(log.createdAt)}</p>
                </div>
                <Badge status="Confirmed">{log.entityType}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
