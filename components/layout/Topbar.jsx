'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { notificationService } from '../../services/notificationService';
import { FiSearch, FiBell, FiUser, FiLogOut, FiWifi } from 'react-icons/fi';
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
    <header className="sticky top-0 z-20 bg-[#FFF7D6] backdrop-blur-md border-b border-[#C7D7EA] px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Global Search Bar */}
      <div className="relative w-80">
        <FiSearch className="w-4 h-4 absolute left-3.5 top-3 text-[#5E8FBF]" />
        <input
          type="text"
          placeholder="Search properties, amenities, tickets..."
          className="w-full bg-white border-1.5 border-[#C7D7EA] text-[#1F2937] placeholder-[#94A3B8] rounded-[12px] text-xs font-normal pl-10 pr-4 py-2.5 transition-all focus:outline-none focus:border-[#7AA7D9] focus:ring-4 focus:ring-[#7AA7D9]/20"
        />
      </div>

      {/* Topbar Actions */}
      <div className="flex items-center gap-4">
        {/* Socket Status Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#C7D7EA] text-xs font-semibold text-[#183153] shadow-sm">
          <FiWifi className={cn('w-3.5 h-3.5', isConnected ? 'text-[#2E8B57] animate-pulse' : 'text-[#6B7A90]')} />
          <span>{isConnected ? 'Real-Time Live' : 'Connecting'}</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) handleMarkRead();
            }}
            className="relative p-2.5 rounded-xl bg-white border border-[#C7D7EA] hover:bg-[#EAF3FA] text-[#5E8FBF] hover:text-[#2B5F9E] transition shadow-sm cursor-pointer"
          >
            <FiBell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#5E8FBF] text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-[#C7D7EA] rounded-[20px] shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAF3FA]">
                <h4 className="text-sm font-bold text-[#183153] font-poppins">Notifications</h4>
                <span className="text-xs text-[#6B7A90]">{notifications.length} total</span>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-[#6B7A90] text-center py-4">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n._id} className="p-2.5 rounded-xl bg-[#EAF3FA]/60 border border-[#C7D7EA]/50 text-xs space-y-1">
                      <p className="font-bold text-[#183153]">{n.title}</p>
                      <p className="text-xs text-[#425466]">{n.message}</p>
                      <p className="text-[10px] text-[#6B7A90]">{formatDate(n.createdAt)}</p>
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
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/80 transition cursor-pointer"
            >
              <Image src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'} alt={user.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover border-2 border-[#5E8FBF]" />
              <span className="text-xs font-bold text-[#183153] font-poppins hidden sm:inline">{user.name}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-[#C7D7EA] rounded-[20px] shadow-2xl p-2 z-50 space-y-1">
                <Link
                  href="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#425466] hover:bg-[#EAF3FA] hover:text-[#183153] transition"
                >
                  <FiUser className="w-4 h-4 text-[#5E8FBF]" />
                  <span>Profile Settings</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#D14343] hover:bg-rose-50 transition w-full text-left cursor-pointer"
                >
                  <FiLogOut className="w-4 h-4 text-[#D14343]" />
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
