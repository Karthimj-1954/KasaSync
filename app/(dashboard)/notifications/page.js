'use client';

import React, { useState, useEffect } from 'react';
import { notificationService } from '../../../services/notificationService';
import { Card } from '../../../components/ui/Card';
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
          <h2 className="text-2xl font-bold text-[#1F3A5F] font-poppins">System Notifications</h2>
          <p className="text-xs text-[#6B7A90]">Real-time alerts for maintenance updates, bookings, and messages</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
          <CheckCheck className="w-4 h-4" /> Mark All as Read
        </Button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-[#6B7A90]">
          <div className="w-8 h-8 border-4 border-[#5E8FBF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold">Loading notification log...</p>
        </div>
      ) : notifications.length === 0 ? (
        <Card className="text-center py-12">
          <Bell className="w-12 h-12 text-[#5E8FBF] mx-auto mb-3" />
          <h4 className="text-base font-bold text-[#183153] font-poppins">No notifications</h4>
          <p className="text-xs text-[#6B7A90] mt-1">You are all caught up!</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card key={n._id} className={`transition ${!n.isRead ? 'border-[#5E8FBF] bg-[#EAF3FA]/50' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#183153] font-poppins">{n.title}</h4>
                  <p className="text-xs text-[#425466] mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-[#6B7A90] mt-1 block">{formatDate(n.createdAt)}</span>
                </div>
                {!n.isRead && <span className="w-2.5 h-2.5 rounded-full bg-[#5E8FBF]" />}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
