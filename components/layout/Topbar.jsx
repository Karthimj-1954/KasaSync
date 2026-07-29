'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { notificationService } from '../../services/notificationService';
import { Search, Bell, User, LogOut, Wifi } from 'lucide-react';
import { cn, formatDate } from '../../lib/utils';

export default function Topbar() {
  const { user, logout } = useAuth();
  const { isConnected } = useSocket();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (user) {
      notificationService.getNotifications().then((data) => {
        setUnreadCount(data.unreadCount || 0);
        setNotifications(data.notifications || []);
      }).catch(() => {});
    }
  }, [user]);

  const handleMarkRead = async () => {
    await notificationService.markAsRead();
    setUnreadCount(0);
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#E7EEF4] px-6 py-3.5 flex items-center justify-between shadow-sm">
      {/* Global Search Bar */}
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#78A4CB]" />
        <input
          type="text"
          placeholder="Search properties, amenities, tickets..."
          className="w-full bg-white border-1.5 border-[#95BDD7] text-[#24425C] placeholder-[#7D8F9C] rounded-[12px] text-xs font-medium pl-10 pr-4 py-2.5 transition-all focus:outline-none focus:border-[#78A4CB] focus:ring-4 focus:ring-[#78A4CB]/20"
        />
      </div>

      {/* Topbar Actions */}
      <div className="flex items-center gap-4">
        {/* Socket Status Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B4E1EB]/30 border border-[#95BDD7]/50 text-[11px] font-bold text-[#24425C]">
          <Wifi className={cn('w-3 h-3', isConnected ? 'text-emerald-600 animate-pulse' : 'text-[#6F8190]')} />
          <span>{isConnected ? 'Real-Time Live' : 'Connecting'}</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) handleMarkRead();
            }}
            className="relative p-2.5 rounded-xl bg-white border border-[#95BDD7] hover:bg-[#B4E1EB]/30 text-[#78A4CB] hover:text-[#24425C] transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#78A4CB] text-white text-[9px] font-black flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-[#E7EEF4] rounded-[20px] shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7EEF4]">
                <h4 className="text-xs font-bold text-[#24425C] font-poppins">Notifications</h4>
                <span className="text-[10px] text-[#6F8190]">{notifications.length} total</span>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-[#6F8190] text-center py-4">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n._id} className="p-2.5 rounded-xl bg-[#B4E1EB]/20 border border-[#95BDD7]/30 text-xs space-y-1">
                      <p className="font-bold text-[#24425C]">{n.title}</p>
                      <p className="text-[11px] text-[#4F6475]">{n.message}</p>
                      <p className="text-[9px] text-[#6F8190]">{formatDate(n.createdAt)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#B4E1EB]/30 transition"
            >
              <Image src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'} alt={user.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover border-2 border-[#78A4CB]" />
              <span className="text-xs font-bold text-[#24425C] font-poppins hidden sm:inline">{user.name}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-[#E7EEF4] rounded-[20px] shadow-2xl p-2 z-50 space-y-1">
                <Link
                  href="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#365E7C] hover:bg-[#B4E1EB]/30 hover:text-[#24425C] transition"
                >
                  <User className="w-4 h-4 text-[#78A4CB]" />
                  <span>Profile Settings</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition w-full text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
