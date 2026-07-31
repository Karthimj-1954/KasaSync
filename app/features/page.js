'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import {
  Building2,
  CalendarCheck,
  Wrench,
  Sparkles,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#4A6484] selection:bg-[#6F9DCB] selection:text-white">
      <Header />

      <main className="flex-1 space-y-24 py-16 px-6">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto text-center space-y-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3FA] border border-[#8EB3D1]/30 text-xs font-semibold text-[#183153] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#6F9DCB]" />
              <span>Full-Stack SaaS Platform</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183153] font-poppins tracking-tight leading-tight max-w-4xl mx-auto">
              Everything You Need to Manage Properties Efficiently
            </motion.h1>

            <motion.p variants={fadeIn} className="text-base md:text-lg text-[#4A6484] max-w-3xl mx-auto leading-relaxed font-normal">
              KasaSync brings landlords, tenants, and property managers together with a single platform for bookings, maintenance, communication, and analytics.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <Button variant="primary" size="lg" className="px-8 shadow-md">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="px-8">
                  Contact Sales <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Feature Categories Grid */}
        <section className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F9DCB]">Modular Architecture</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#183153] font-poppins">Core Feature Categories</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Building2,
                category: 'Property Management',
                items: ['Property Listings', 'Image Gallery', 'Availability Tracking', 'Owner Dashboard']
              },
              {
                icon: CalendarCheck,
                category: 'Booking System',
                items: ['Instant Booking', 'Booking Approval', 'Calendar View', 'Conflict Detection']
              },
              {
                icon: Wrench,
                category: 'Maintenance',
                items: ['Create Requests', 'Assign Staff', 'Status Tracking', 'Photo Uploads']
              },
              {
                icon: Sparkles,
                category: 'Community Amenities',
                items: ['Reserve Facilities', 'Gym Booking', 'Swimming Pool', 'Clubhouse']
              },
              {
                icon: MessageSquare,
                category: 'Messaging',
                items: ['Owner ↔ Tenant Chat', 'Notifications', 'Read Receipts', 'File Sharing']
              },
              {
                icon: BarChart3,
                category: 'Analytics',
                items: ['Occupancy Rate', 'Revenue Reports', 'Maintenance Reports', 'Booking Statistics']
              }
            ].map((cat, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="bg-white p-8 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#183153]">
                  <cat.icon className="w-6 h-6 text-[#6F9DCB]" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-bold text-[#183153] font-poppins">{cat.category}</h3>
                <ul className="space-y-2.5 pt-1">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2.5 text-xs md:text-sm text-[#4A6484]">
                      <Check className="w-4 h-4 text-[#6F9DCB] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Comparison Section: KasaSync vs Traditional */}
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F9DCB]">Why Upgrade</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#183153] font-poppins">
              KasaSync vs Traditional Property Management
            </h2>
          </div>

          <div className="bg-white rounded-[20px] border border-[#8EB3D1]/30 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#183153] text-white border-b border-[#8EB3D1]/30">
                    <th className="p-4 md:p-5 font-bold font-poppins">Workflow Aspect</th>
                    <th className="p-4 md:p-5 font-bold font-poppins text-slate-300">Traditional Management</th>
                    <th className="p-4 md:p-5 font-bold font-poppins text-[#A9D5E3]">KasaSync Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8EB3D1]/20 text-[#4A6484]">
                  {[
                    { aspect: 'Data & Records', trad: 'Paper records & physical folders', kasasync: 'Digital management & cloud sync' },
                    { aspect: 'Amenity Reservations', trad: 'Phone calls & physical sign-up sheets', kasasync: 'Online bookings & live time slots' },
                    { aspect: 'Property Status', trad: 'Manual status checks & delays', kasasync: 'Live status updates in real time' },
                    { aspect: 'Maintenance Dispatch', trad: 'Manual maintenance tracking', kasasync: 'Automated dispatches & photo proof' },
                    { aspect: 'Tenant Communication', trad: 'Delayed phone calls & emails', kasasync: 'Centralized dashboard & instant chat' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F7E8A4]/10 transition">
                      <td className="p-4 md:p-5 font-semibold text-[#183153]">{row.aspect}</td>
                      <td className="p-4 md:p-5 text-slate-500 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{row.trad}</span>
                      </td>
                      <td className="p-4 md:p-5 font-semibold text-[#183153] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#6F9DCB] shrink-0" />
                        <span>{row.kasasync}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-5xl mx-auto">
          <div className="bg-[#183153] text-white p-10 md:p-16 rounded-[20px] text-center space-y-6 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tight">
              Ready to modernize your property management?
            </h2>
            <p className="text-sm md:text-base text-[#A9D5E3] max-w-xl mx-auto font-normal">
              Join property owners, tenants, and managers using KasaSync today.
            </p>
            <div className="pt-2">
              <Link href="/register">
                <Button variant="primary" size="lg" className="px-8 shadow-md">
                  Start Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
