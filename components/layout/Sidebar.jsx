'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <aside className={cn('w-64 bg-white border-r border-[#E7EEF4] flex flex-col justify-between h-screen sticky top-0 z-30 p-4 shadow-sm', className)}>
      <div>
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-3 py-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#78A4CB] flex items-center justify-center shadow-md shadow-[#78A4CB]/20">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#24425C] font-poppins">
              KasaSync
            </h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#78A4CB]">Property Portal</p>
          </div>
        </Link>

        {/* User Role Pill */}
        {user && (
          <div className="mb-6 px-3 py-2.5 rounded-2xl bg-[#B4E1EB]/30 border border-[#95BDD7]/40 flex items-center gap-3">
            <Image src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'} alt={user.name || 'User'} width={36} height={36} className="w-9 h-9 rounded-full object-cover border-2 border-[#78A4CB]" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#24425C] truncate font-poppins">{user.name}</p>
              <p className="text-[10px] text-[#3F7AA5] font-semibold">{user.role}</p>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-[#B4E1EB] text-[#24425C] shadow-sm font-bold border border-[#95BDD7]'
                    : 'text-[#365E7C] hover:bg-[#B4E1EB]/30 hover:text-[#24425C]'
                )}
              >
                <Icon className={cn('w-4 h-4 transition-colors', isActive ? 'text-[#24425C]' : 'text-[#78A4CB]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold text-rose-600 hover:bg-rose-50 transition w-full mt-4"
      >
        <LogOut className="w-4 h-4 text-rose-500" />
        <span>Log Out</span>
      </button>
    </aside>
  );
}
