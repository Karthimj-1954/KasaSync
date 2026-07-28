'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../components/ui/Button';
import { Home, Building2, Wrench, Sparkles, ShieldCheck, ArrowRight, Activity, Users, CalendarCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white selection:bg-blue-600 selection:text-white">
      {/* Header Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 glass-panel border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
                KasaSync
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Smart Property Sync</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
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
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>Next.js 15 • Full Stack Vercel Serverless • Enterprise Grade</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Smart Property Management in <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">Real Time</span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Connect Property Owners, Tenants, Maintenance Staff, and Admins seamlessly. Complete with conflict-free amenity reservations, instant work order dispatch, and live analytics.
          </p>

          {/* Quick Portal Shortcuts */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login">
              <Button variant="emerald" size="lg" className="px-8">
                Explore Demo Portal
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="secondary" size="lg" className="px-8">
                Browse Rental Listings
              </Button>
            </Link>
          </div>

          {/* Feature Highlights Grid */}
          <div className="pt-16 grid md:grid-cols-4 gap-6 text-left">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Property Management</h3>
              <p className="text-xs text-slate-400 mt-2">
                Zillow-inspired workflow for listing properties, managing tenant leases, and image galleries.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Maintenance Engine</h3>
              <p className="text-xs text-slate-400 mt-2">
                7-step ticket resolution lifecycle with priority dispatches and photo completion proof.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Conflict-Free Bookings</h3>
              <p className="text-xs text-slate-400 mt-2">
                Smart time-slot validation preventing double reservations across 9 community amenities.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Real-Time Sync</h3>
              <p className="text-xs text-slate-400 mt-2">
                Vercel serverless messaging, status push notifications, and live presence indicators.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800 py-6 px-6 text-center text-xs text-slate-500">
        <p>© 2026 KasaSync Platform. Built for Enterprise Property, Maintenance & Amenity Management.</p>
      </footer>
    </div>
  );
}
