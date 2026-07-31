'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import {
  Building2,
  Users,
  Search,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  ShieldCheck,
  HelpCircle,
  Layers
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function PropertyManagementPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#425466] selection:bg-[#5E8FBF] selection:text-white">
      <Header />

      <main className="flex-1 space-y-20 py-12 px-6">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeIn} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3FA] border border-[#D6E4F2] text-xs font-semibold text-[#183153] shadow-sm">
                <Sparkles className="w-4 h-4 text-[#5E8FBF]" />
                <span>Enterprise Property Engine</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183153] font-poppins tracking-tight leading-tight">
                Property Management <span className="text-[#5E8FBF]">Simplified</span>
              </h1>

              <p className="text-base md:text-lg text-[#425466] leading-relaxed font-normal">
                Effortlessly list properties, manage tenant leases, track occupancy status, and present high-resolution Cloudinary photo galleries—all from a single real-time dashboard.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/properties">
                  <Button variant="primary" size="lg" className="px-8 shadow-md">
                    Explore Properties
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" size="lg" className="px-8">
                    Manage Properties <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Illustration / Graphic Placeholder */}
            <motion.div variants={fadeIn} className="relative flex justify-center">
              <div className="w-full max-w-lg h-96 bg-gradient-to-tr from-[#EAF3FA] via-[#D6E4F2]/50 to-[#5E8FBF]/10 rounded-3xl border border-[#D6E4F2] p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#183153] text-white flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#183153]">Skyline Luxury Suites</p>
                      <p className="text-xs text-[#6B7A90]">24 Active Units • Occupied</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#EAF3FA] text-[#2B5F9E] border border-[#D6E4F2] rounded-full text-xs font-bold">
                    Active Lease
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 z-10">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#D6E4F2]">
                    <Search className="w-5 h-5 text-[#5E8FBF] mb-1" />
                    <p className="text-xs font-bold text-[#183153]">Smart Search</p>
                    <p className="text-[10px] text-[#6B7A90]">Filter by price, beds, city</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#D6E4F2]">
                    <ImageIcon className="w-5 h-5 text-[#5E8FBF] mb-1" />
                    <p className="text-xs font-bold text-[#183153]">Cloudinary CDN</p>
                    <p className="text-[10px] text-[#6B7A90]">HD multi-photo galleries</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#D6E4F2] flex items-center justify-between z-10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#5E8FBF]" />
                    <span className="text-xs font-bold text-[#183153]">Tenant Onboarding & Lease Sync</span>
                  </div>
                  <span className="text-xs font-bold text-[#2B5F9E]">100% Synced</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Feature Overview & Capabilities */}
        <section className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Capabilities</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Key Capabilities</h2>
            <p className="text-sm text-[#6B7A90] max-w-xl mx-auto">
              Everything property owners and residents need for efficient listing and lease tracking.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Building2,
                title: 'Property Listing Management',
                desc: 'Create, update, and publish detailed property profiles with pricing, bedrooms, bathrooms, and specs.'
              },
              {
                icon: Users,
                title: 'Tenant Management',
                desc: 'Link registered tenants to active properties, view lease terms, and streamline owner-tenant communication.'
              },
              {
                icon: BarChart3,
                title: 'Property Status Tracking',
                desc: 'Monitor real-time unit status across Available, Occupied, and Maintenance states instantly.'
              },
              {
                icon: ImageIcon,
                title: 'Cloudinary Image Gallery',
                desc: 'Upload and showcase high-resolution photos powered by Cloudinary for lightning-fast delivery.'
              },
              {
                icon: Search,
                title: 'Search & Advanced Filtering',
                desc: 'Filter properties by location, price range, bedroom count, and status in real time.'
              },
              {
                icon: Layers,
                title: 'Unified Dashboard Overview',
                desc: 'Centralized portal metrics giving owners and managers complete operational visibility.'
              }
            ].map((cap, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAF3FA] border border-[#D6E4F2] flex items-center justify-center text-[#2B5F9E]">
                  <cap.icon className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold text-[#183153] font-poppins">{cap.title}</h3>
                <p className="text-xs md:text-sm text-[#425466] leading-relaxed font-normal">{cap.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Why It Matters</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Built for Owners & Residents</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Zillow-inspired intuitive layout',
              'Real-time status updates',
              'Fast Cloudinary image CDN',
              'Multi-role access (Owner, Tenant, Staff)',
              'Instant property search',
              'Seamless lease tracking'
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-[#EAF3FA] shadow-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5E8FBF] shrink-0" />
                <span className="text-sm font-semibold text-[#183153]">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Process</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { step: '01', title: 'Browse or List', desc: 'Browse available rentals publicly or sign in as an owner to list properties.' },
              { step: '02', title: 'Upload & Specs', desc: 'Add Cloudinary gallery photos, pricing, amenities, and lease details.' },
              { step: '03', title: 'Manage & Sync', desc: 'Assign tenants, track active leases, and update occupancy statuses in real time.' }
            ].map((st, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-3">
                <span className="text-3xl font-extrabold text-[#5E8FBF] font-poppins">{st.step}</span>
                <h3 className="text-base font-bold text-[#183153] font-poppins">{st.title}</h3>
                <p className="text-xs text-[#425466] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Support</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Can unauthenticated visitors view property listings?',
                a: 'Yes! Visitors can publicly search, filter, and view all rental listings without logging in. Sign in is only required to list, edit, or manage leases.'
              },
              {
                q: 'How are property photos hosted?',
                a: 'Photos are stored securely on Cloudinary CDN, ensuring high-speed global delivery and responsive image optimization.'
              },
              {
                q: 'How do tenant lease assignments work?',
                a: 'Property owners and admins can link tenant user accounts to specific property units directly through the management dashboard.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-[#183153]">
                  <HelpCircle className="w-5 h-5 text-[#5E8FBF] shrink-0" />
                  <h3 className="text-base font-bold font-poppins">{faq.q}</h3>
                </div>
                <p className="text-xs md:text-sm text-[#425466] leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto">
          <div className="bg-[#183153] text-white p-10 md:p-16 rounded-3xl text-center space-y-6 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tight">
              Ready to Manage Properties Smarter?
            </h2>
            <p className="text-sm md:text-base text-[#D6E4F2] max-w-xl mx-auto font-normal">
              Explore public rental listings or sign in to access full owner and manager controls.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/properties">
                <Button variant="primary" size="lg" className="px-8 shadow-md">
                  Explore Properties
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg" className="px-8">
                  Sign In to Portal
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
