'use client';

import React, { useState, useEffect } from 'react';
import { notificationService } from '../../../services/notificationService';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Bell, CheckCheck } from 'lucide-react';
import { formatDate } from '../../../lib/utils';
import toast from 'react-hot-toast';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = () => {
    setLoading(true);
    notificationService
      .getNotifications()
      .then((data) => setNotifications(data.notifications || []))
      .catch(() => toast.error('Failed to load notifications'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    await notificationService.markAsRead();
    toast.success('All notifications marked as read');
    loadNotifications();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">System Notifications</h2>
          <p className="text-xs text-slate-400">Real-time alerts for maintenance updates, bookings, and messages</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
          <CheckCheck className="w-4 h-4" /> Mark All as Read
        </Button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-400">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold">Loading notification log...</p>
        </div>
      ) : notifications.length === 0 ? (
        <Card className="text-center py-12">
          <Bell className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white">No notifications</h4>
          <p className="text-xs text-slate-400 mt-1">You are all caught up!</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card key={n._id} className={`transition ${!n.isRead ? 'border-blue-500/40 bg-blue-950/20' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{n.title}</h4>
                  <p className="text-xs text-slate-300 mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">{formatDate(n.createdAt)}</span>
                </div>
                {!n.isRead && <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
