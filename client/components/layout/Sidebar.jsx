'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Building2,
  Wrench,
  Sparkles,
  CalendarCheck,
  MessageSquare,
  Bell,
  BarChart3,
  ShieldCheck,
  Settings,
  LogOut,
  Home,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Sidebar({ className }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Properties', href: '/properties', icon: Building2 },
    { label: 'Maintenance', href: '/maintenance', icon: Wrench },
    { label: 'Amenities', href: '/amenities', icon: Sparkles },
    { label: 'Bookings', href: '/bookings', icon: CalendarCheck },
    { label: 'Messages', href: '/messages', icon: MessageSquare },
    { label: 'Notifications', href: '/notifications', icon: Bell },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    ...(user?.role === 'Admin' ? [{ label: 'Admin Panel', href: '/admin', icon: ShieldCheck }] : []),
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className={cn('w-64 glass-panel border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 z-30 p-4', className)}>
      <div>
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-3 py-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
              KasaSync
            </h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Real-Time Sync</p>
          </div>
        </Link>

        {/* User Role Pill */}
        {user && (
          <div className="mb-6 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-blue-500/40" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-blue-400 font-semibold">{user.role}</p>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                )}
              >
                <Icon className={cn('w-4 h-4 transition-transform group-hover:scale-110', isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
