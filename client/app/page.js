'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Home, Building2, Wrench, Sparkles, ArrowRight, Activity, CalendarCheck } from 'lucide-react';

import FeatureCard from '@/components/ui/FeatureCard';

import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#425466] selection:bg-[#5E8FBF] selection:text-white">
      <header className="sticky top-0 inset-x-0 z-50 bg-[#FFF7D6] backdrop-blur-md border-b border-[#C7D7EA] px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5E8FBF] flex items-center justify-center shadow-md shadow-[#5E8FBF]/20">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#183153] font-poppins">
                KasaSync
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#3E7CB1]">Smart Property Sync</p>
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

      <main className="flex-1 pt-20 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3FA] border border-[#C7D7EA] text-xs font-semibold text-[#183153] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#5E8FBF]" />
            <span>Modern Property, Maintenance & Amenity Portal</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[#183153] font-poppins max-w-4xl mx-auto">
            Smart Property Management in <span className="text-[#3E7CB1]">Real Time</span>
          </h1>

          <p className="text-base md:text-lg text-[#425466] max-w-2xl mx-auto font-normal leading-relaxed">
            Connect Property Owners, Tenants, Maintenance Staff, and Admins seamlessly. Complete with conflict-free amenity reservations, instant work order dispatch, and live analytics.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login">
              <Button variant="primary" size="lg" className="px-8 shadow-lg">
                Explore Demo Portal
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="secondary" size="lg" className="px-8">
                Browse Rental Listings
              </Button>
            </Link>
          </div>

          <div id="features" className="pt-16 grid md:grid-cols-4 gap-6 text-left">
            <FeatureCard
              icon={Building2}
              title="Property Management"
              description="Zillow-inspired workflow for listing properties, managing tenant leases, and Cloudinary photo galleries."
            />
            <FeatureCard
              icon={Wrench}
              title="Maintenance Engine"
              description="7-step ticket resolution lifecycle with priority dispatches and photo completion proof."
            />
            <FeatureCard
              icon={CalendarCheck}
              title="Conflict-Free Bookings"
              description="Smart time-slot validation preventing double reservations across community amenities."
            />
            <FeatureCard
              icon={Activity}
              title="Real-Time Sync"
              description="MongoDB Atlas live metrics aggregation, status push notifications, and presence indicators."
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
