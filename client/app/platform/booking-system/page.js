'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import {
  CalendarCheck,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  CalendarDays,
  History,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function BookingSystemPage() {
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
                <span>Zero Double-Booking Engine</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183153] font-poppins tracking-tight leading-tight">
                Smart Booking <span className="text-[#5E8FBF]">System</span>
              </h1>

              <p className="text-base md:text-lg text-[#425466] leading-relaxed font-normal">
                Reserve community clubhouses, tennis courts, barbecue pavilions, and meeting spaces online. Enjoy real-time slot availability, instant validation algorithms, and zero schedule conflicts.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/platform/amenities">
                  <Button variant="primary" size="lg" className="px-8 shadow-md">
                    View Available Amenities
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" size="lg" className="px-8">
                    Book Now <ArrowRight className="w-4 h-4" />
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
                      <CalendarCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#183153]">Rooftop Lounge Pavilion</p>
                      <p className="text-xs text-[#6B7A90]">Slot: Today, 6:00 PM – 8:00 PM</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 z-10">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#D6E4F2]">
                    <Clock className="w-5 h-5 text-[#5E8FBF] mb-1" />
                    <p className="text-xs font-bold text-[#183153]">Live Time Slots</p>
                    <p className="text-[10px] text-[#6B7A90]">Automated validation</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#D6E4F2]">
                    <AlertTriangle className="w-5 h-5 text-[#5E8FBF] mb-1" />
                    <p className="text-xs font-bold text-[#183153]">Conflict Guard</p>
                    <p className="text-[10px] text-[#6B7A90]">Prevents double-booking</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#D6E4F2] flex items-center justify-between z-10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#5E8FBF]" />
                    <span className="text-xs font-bold text-[#183153]">Instant Confirmation & QR Token</span>
                  </div>
                  <span className="text-xs font-bold text-[#2B5F9E]">Ready</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Capabilities Grid */}
        <section className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Features</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Booking Engine Features</h2>
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
                icon: CalendarCheck,
                title: 'Online Booking',
                desc: 'Schedule reservations 24/7 from smartphone or desktop without waiting for manual manager approval.'
              },
              {
                icon: Clock,
                title: 'Real-Time Availability',
                desc: 'Instant visual grid showing open, reserved, and maintenance time slots for every community amenity.'
              },
              {
                icon: CalendarDays,
                title: 'Interactive Booking Calendar',
                desc: 'Browse daily, weekly, and monthly availability views across all shared residential spaces.'
              },
              {
                icon: ShieldCheck,
                title: 'Conflict Prevention Guard',
                desc: 'MongoDB Atlas transaction checks guarantee two residents can never reserve the same slot.'
              },
              {
                icon: Zap,
                title: 'Instant Confirmation',
                desc: 'Receive immediate digital confirmation and email notifications once a booking request is validated.'
              },
              {
                icon: History,
                title: 'Complete Booking History',
                desc: 'Track active, upcoming, completed, and canceled reservations in your personal tenant portal.'
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Benefits</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Why Residents & Managers Love It</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Zero double-booking guarantee',
              'Instant confirmation alerts',
              'Automated time slot validation',
              'Fair usage policy limits',
              'Historical booking logs',
              'Mobile-friendly interface'
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-[#EAF3FA] shadow-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5E8FBF] shrink-0" />
                <span className="text-sm font-semibold text-[#183153]">{benefit}</span>
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
                q: 'Can I view available booking times before logging in?',
                a: 'Yes! Public availability and amenity listings are visible to everyone. You only need to sign in when you are ready to confirm a booking.'
              },
              {
                q: 'What happens if two users try booking the same slot simultaneously?',
                a: 'KasaSync uses atomic database transactions to ensure only the first validated request succeeds, preventing any double-booking.'
              },
              {
                q: 'Can I cancel or reschedule a booking?',
                a: 'Yes, signed-in residents can manage, reschedule, or cancel upcoming bookings directly from their dashboard.'
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
              Ready to Book Your Amenity?
            </h2>
            <p className="text-sm md:text-base text-[#D6E4F2] max-w-xl mx-auto font-normal">
              Explore community amenities or log in to make your reservation today.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/platform/amenities">
                <Button variant="primary" size="lg" className="px-8 shadow-md">
                  View Amenities
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg" className="px-8">
                  Book Now
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
