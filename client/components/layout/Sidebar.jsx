'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  FiGrid,
  FiHome,
  FiTool,
  FiCoffee,
  FiCalendar,
  FiMessageSquare,
  FiBell,
  FiBarChart2,
  FiShield,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import { cn } from '../../lib/utils';

export default function Sidebar({ className }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: FiGrid },
    { label: 'Properties', href: '/properties', icon: FiHome },
    { label: 'Maintenance', href: '/maintenance', icon: FiTool },
    { label: 'Amenities', href: '/amenities', icon: FiCoffee },
    { label: 'Bookings', href: '/bookings', icon: FiCalendar },
    { label: 'Messages', href: '/messages', icon: FiMessageSquare },
    { label: 'Notifications', href: '/notifications', icon: FiBell },
    { label: 'Analytics', href: '/analytics', icon: FiBarChart2 },
    ...(user?.role === 'Admin' ? [{ label: 'Admin Panel', href: '/admin', icon: FiShield }] : []),
    { label: 'Settings', href: '/settings', icon: FiSettings },
  ];

  return (
    <aside className={cn('w-64 bg-[#EAF3FA] border-r border-[#C7D7EA] flex flex-col justify-between h-screen sticky top-0 z-30 p-4 shadow-sm', className)}>
      <div>
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-3 py-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#5E8FBF] flex items-center justify-center shadow-md shadow-[#5E8FBF]/20">
            <FiHome className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#183153] font-poppins">
              KasaSync
            </h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#3E7CB1]">Property Portal</p>
          </div>
        </Link>

        {/* User Role Pill */}
        {user && (
          <div className="mb-6 px-3 py-2.5 rounded-2xl bg-white border border-[#C7D7EA] flex items-center gap-3 shadow-sm">
            <Image src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'} alt={user.name || 'User'} width={36} height={36} className="w-9 h-9 rounded-full object-cover border-2 border-[#5E8FBF]" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#183153] truncate font-poppins">{user.name}</p>
              <p className="text-[10px] text-[#3E7CB1] font-semibold">{user.role}</p>
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
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[#C7DDF3] text-[#183153] shadow-sm font-bold border border-[#5E8FBF]/30'
                    : 'text-[#425466] hover:bg-white/60 hover:text-[#2B5F9E]'
                )}
              >
                <Icon className={cn('w-4 h-4 transition-colors', isActive ? 'text-[#183153]' : 'text-[#5E8FBF]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-sm font-semibold text-[#D14343] hover:bg-rose-50 transition w-full mt-4 cursor-pointer"
      >
        <FiLogOut className="w-4 h-4 text-[#D14343]" />
        <span>Log Out</span>
      </button>
    </aside>
  );
}
