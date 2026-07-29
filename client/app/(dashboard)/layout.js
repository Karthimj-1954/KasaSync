'use client';

import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-[#183153]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#5E8FBF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#60758C] font-semibold">Initializing KasaSync Platform...</p>
        </div>
      </div>
    );
  }

  if (!user && typeof window !== 'undefined') {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-[#425466]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
