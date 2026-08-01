'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import {
  FiCoffee,
  FiCalendar,
  FiClock,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiHelpCircle,
  FiZap,
  FiWind,
  FiGrid,
  FiUsers,
  FiTruck,
  FiGift
} from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AmenitiesPage() {
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
                <FiCoffee className="w-4 h-4 text-[#5E8FBF]" />
                <span>Shared Community Facilities</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183153] font-poppins tracking-tight leading-tight">
                Community <span className="text-[#5E8FBF]">Amenities</span>
              </h1>

              <p className="text-base md:text-lg text-[#425466] leading-relaxed font-normal">
                Discover world-class shared facilities across your residential community—from fitness centers and infinity pools to private co-working suites and rooftop lounges.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#amenities-list">
                  <Button variant="primary" size="lg" className="px-8 shadow-md">
                    View Amenities
                  </Button>
                </a>
                <Link href="/login">
                  <Button variant="secondary" size="lg" className="px-8">
                    Reserve Amenity <FiArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Graphic / Showcase Placeholder */}
            <motion.div variants={fadeIn} className="relative flex justify-center">
              <div className="w-full max-w-lg h-96 bg-gradient-to-tr from-[#EAF3FA] via-[#D6E4F2]/50 to-[#5E8FBF]/10 rounded-3xl border border-[#D6E4F2] p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#183153] text-white flex items-center justify-center">
                      <FiCoffee className="w-5 h-5 text-[#5E8FBF]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#183153]">Resort-Style Living</p>
                      <p className="text-xs text-[#6B7A90]">6 Shared Facilities</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#EAF3FA] text-[#2B5F9E] border border-[#D6E4F2] rounded-full text-xs font-bold">
                    Open for Booking
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 z-10">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#D6E4F2]">
                    <FiZap className="w-5 h-5 text-[#5E8FBF] mb-1" />
                    <p className="text-xs font-bold text-[#183153]">Fitness Center</p>
                    <p className="text-[10px] text-[#6B7A90]">24/7 Access</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#D6E4F2]">
                    <FiWind className="w-5 h-5 text-[#5E8FBF] mb-1" />
                    <p className="text-xs font-bold text-[#183153]">Infinity Pool</p>
                    <p className="text-[10px] text-[#6B7A90]">Heated & Filtered</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#D6E4F2] flex items-center justify-between z-10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-5 h-5 text-[#5E8FBF]" />
                    <span className="text-xs font-bold text-[#183153]">Instant Reservation Validation</span>
                  </div>
                  <span className="text-xs font-bold text-[#2B5F9E]">Live</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Amenity Cards List */}
        <section id="amenities-list" className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Facilities</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Explore Community Amenities</h2>
            <p className="text-sm text-[#6B7A90] max-w-xl mx-auto">
              Premium shared spaces available to all registered community residents.
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
                icon: FiZap,
                title: 'Fitness & Gym Center',
                desc: 'Fully equipped cardio, free weights, and yoga studio open 24 hours for resident wellness.'
              },
              {
                icon: FiWind,
                title: 'Swimming Pool & Deck',
                desc: 'Heated outdoor infinity pool with poolside lounge chairs, cabanas, and towel stations.'
              },
              {
                icon: FiGrid,
                title: 'Community Clubhouse',
                desc: 'Spacious lounge with billiards table, fireplace, flat-screen entertainment, and kitchen.'
              },
              {
                icon: FiUsers,
                title: 'Co-Working Meeting Rooms',
                desc: 'High-speed Wi-Fi, conference tables, and presentation monitors for remote professionals.'
              },
              {
                icon: FiTruck,
                title: 'EV Charging & Parking',
                desc: 'Reserved underground parking spaces complete with Level-2 electric vehicle chargers.'
              },
              {
                icon: FiGift,
                title: 'Rooftop Event Space',
                desc: 'Panoramic skyline event venue with barbecue grills and private dining pavilions.'
              }
            ].map((amenity, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAF3FA] border border-[#D6E4F2] flex items-center justify-center text-[#2B5F9E]">
                  <amenity.icon className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold text-[#183153] font-poppins">{amenity.title}</h3>
                <p className="text-xs md:text-sm text-[#425466] leading-relaxed font-normal">{amenity.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Reservation Process */}
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">How It Works</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Reservation Process</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { step: '1', title: 'Choose Facility', desc: 'Browse amenities and select your preferred facility.' },
              { step: '2', title: 'Pick Time Slot', desc: 'Select an available date and time slot from the live calendar.' },
              { step: '3', title: 'Confirm & Enjoy', desc: 'Receive instant confirmation and digital pass.' }
            ].map((proc, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-3">
                <span className="w-10 h-10 rounded-full bg-[#EAF3FA] text-[#2B5F9E] font-bold text-sm flex items-center justify-center mx-auto border border-[#D6E4F2]">
                  {proc.step}
                </span>
                <h3 className="text-base font-bold text-[#183153] font-poppins">{proc.title}</h3>
                <p className="text-xs text-[#425466] leading-relaxed">{proc.desc}</p>
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
                q: 'Are community amenities free for residents?',
                a: 'Standard amenities like the gym and pool are included with residency. Private event space rentals may require advance reservations.'
              },
              {
                q: 'Can I bring guests to the pool or clubhouse?',
                a: 'Guest access policies depend on specific building guidelines. Resident account holders can register guests when making a booking.'
              },
              {
                q: 'Do I need to sign in to browse amenity information?',
                a: 'No! Amenity details and photos are publicly accessible. Logging in is only required when making an active reservation.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-[#183153]">
                  <FiHelpCircle className="w-5 h-5 text-[#5E8FBF] shrink-0" />
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
              Ready to Enjoy Community Facilities?
            </h2>
            <p className="text-sm md:text-base text-[#D6E4F2] max-w-xl mx-auto font-normal">
              Sign in to your KasaSync resident account to reserve your amenity slot today.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/login">
                <Button variant="primary" size="lg" className="px-8 shadow-md">
                  Reserve Amenity Now
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
