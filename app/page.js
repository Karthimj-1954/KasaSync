'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Home, Building2, Wrench, Sparkles, ArrowRight, Activity, CalendarCheck } from 'lucide-react';

import Header from '@/components/layout/Header';
import FeatureCard from '@/components/ui/FeatureCard';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#425466] selection:bg-[#5E8FBF] selection:text-white">
      {/* Header Navigation */}
      <Header />

      {/* Hero Section */}
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

          {/* Action Buttons */}
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

          {/* Feature Highlights Grid */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
