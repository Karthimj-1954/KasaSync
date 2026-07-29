'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Home, Building2, Wrench, Sparkles, ShieldCheck, ArrowRight, Activity, Users, CalendarCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9E8A2] text-[#4F6475] selection:bg-[#78A4CB] selection:text-white">
      {/* Header Navigation */}
      <header className="sticky top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E7EEF4] px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#78A4CB] flex items-center justify-center shadow-md shadow-[#78A4CB]/20">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#24425C] font-poppins">
                KasaSync
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#78A4CB]">Smart Property Sync</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>

            <Link href="/register">
              <Button variant="primary" size="sm">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-20 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B4E1EB] border border-[#95BDD7] text-xs font-bold text-[#24425C] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#78A4CB]" />
            <span>Modern Property, Maintenance & Amenity Portal</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-[#24425C] font-poppins max-w-4xl mx-auto">
            Smart Property Management in <span className="text-[#3F7AA5]">Real Time</span>
          </h1>

          <p className="text-base md:text-lg text-[#4F6475] max-w-2xl mx-auto font-medium leading-relaxed">
            Connect Property Owners, Tenants, Maintenance Staff, and Admins seamlessly. Complete with conflict-free amenity reservations, instant work order dispatch, and live analytics.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login">
              <Button variant="primary" size="lg" className="px-8 shadow-lg">
                Explore Demo Portal
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="outline" size="lg" className="px-8 border-[#95BDD7]">
                Browse Rental Listings
              </Button>
            </Link>
          </div>

          {/* Feature Highlights Grid */}
          <div className="pt-16 grid md:grid-cols-4 gap-6 text-left">
            <div className="bg-white p-6 rounded-[20px] border border-[#E7EEF4] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#78A4CB]/10 hover:border-[#95BDD7] transition duration-300">
              <div className="w-11 h-11 rounded-2xl bg-[#B4E1EB] text-[#24425C] flex items-center justify-center mb-4 border border-[#95BDD7]/50">
                <Building2 className="w-5 h-5 text-[#78A4CB]" />
              </div>
              <h3 className="text-base font-bold text-[#24425C] font-poppins">Property Management</h3>
              <p className="text-xs text-[#6F8190] mt-2 leading-relaxed">
                Zillow-inspired workflow for listing properties, managing tenant leases, and Cloudinary photo galleries.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[20px] border border-[#E7EEF4] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#78A4CB]/10 hover:border-[#95BDD7] transition duration-300">
              <div className="w-11 h-11 rounded-2xl bg-[#95BDD7]/40 text-[#24425C] flex items-center justify-center mb-4 border border-[#95BDD7]/50">
                <Wrench className="w-5 h-5 text-[#78A4CB]" />
              </div>
              <h3 className="text-base font-bold text-[#24425C] font-poppins">Maintenance Engine</h3>
              <p className="text-xs text-[#6F8190] mt-2 leading-relaxed">
                7-step ticket resolution lifecycle with priority dispatches and photo completion proof.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[20px] border border-[#E7EEF4] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#78A4CB]/10 hover:border-[#95BDD7] transition duration-300">
              <div className="w-11 h-11 rounded-2xl bg-[#B4E1EB] text-[#24425C] flex items-center justify-center mb-4 border border-[#95BDD7]/50">
                <CalendarCheck className="w-5 h-5 text-[#78A4CB]" />
              </div>
              <h3 className="text-base font-bold text-[#24425C] font-poppins">Conflict-Free Bookings</h3>
              <p className="text-xs text-[#6F8190] mt-2 leading-relaxed">
                Smart time-slot validation preventing double reservations across community amenities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[20px] border border-[#E7EEF4] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#78A4CB]/10 hover:border-[#95BDD7] transition duration-300">
              <div className="w-11 h-11 rounded-2xl bg-[#95BDD7]/40 text-[#24425C] flex items-center justify-center mb-4 border border-[#95BDD7]/50">
                <Activity className="w-5 h-5 text-[#78A4CB]" />
              </div>
              <h3 className="text-base font-bold text-[#24425C] font-poppins">Real-Time Sync</h3>
              <p className="text-xs text-[#6F8190] mt-2 leading-relaxed">
                MongoDB Atlas live metrics aggregation, status push notifications, and presence indicators.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#24425C] text-white py-8 px-6 text-center text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-[#B4E1EB]" />
            <span className="font-bold text-[#B4E1EB] font-poppins">KasaSync Platform</span>
          </div>
          <p className="text-slate-300">© 2026 KasaSync Platform. Enterprise Property, Maintenance & Amenity Portal.</p>
          <div className="flex gap-4 text-[#B4E1EB]">
            <Link href="/login" className="hover:text-[#F9E8A2] transition">Sign In</Link>
            <Link href="/properties" className="hover:text-[#F9E8A2] transition">Properties</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
