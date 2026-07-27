'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { useTheme } from '../../context/ThemeContext';
import { notificationService } from '../../services/notificationService';
import { Search, Bell, Sun, Moon, User, LogOut, Wifi } from 'lucide-react';
import { cn, formatDate } from '../../lib/utils';

export default function Topbar() {
  const { user, logout } = useAuth();
  const { isConnected } = useSocket();
  const { theme, toggleTheme } = useTheme();
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
    <header className="sticky top-0 z-20 glass-panel border-b border-slate-800/80 px-6 py-3 flex items-center justify-between">
      {/* Global Search Bar */}
      <div className="relative w-72">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search properties, amenities, tickets..."
          className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs transition-all focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      {/* Topbar Actions */}
      <div className="flex items-center gap-4">
        {/* Socket Status Indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-[11px] font-semibold text-slate-300">
          <Wifi className={cn('w-3 h-3', isConnected ? 'text-emerald-400 animate-pulse' : 'text-slate-500')} />
          <span>{isConnected ? 'Real-Time Live' : 'Connecting'}</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700 text-slate-300 transition"
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) handleMarkRead();
            }}
            className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700 text-slate-300 transition relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl p-4 shadow-2xl border border-slate-700 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Notifications</h4>
                <Link href="/notifications" className="text-[11px] text-blue-400 hover:underline">
                  View All
                </Link>
              </div>
              <div className="py-2 max-h-64 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No notifications yet.</p>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div key={n._id} className="p-2 rounded-xl bg-slate-900/50 hover:bg-slate-800/50 transition">
                      <p className="text-xs font-semibold text-white">{n.title}</p>
                      <p className="text-[11px] text-slate-400">{n.message}</p>
                      <span className="text-[9px] text-slate-500 mt-1 block">{formatDate(n.createdAt)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Menu */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800/60 transition"
            >
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-blue-500/40" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 glass-panel rounded-2xl p-2 shadow-2xl border border-slate-700 z-50">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-bold text-white">{user.name}</p>
                  <p className="text-[10px] text-slate-400">{user.email}</p>
                </div>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-xl transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile Settings</span>
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition mt-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
