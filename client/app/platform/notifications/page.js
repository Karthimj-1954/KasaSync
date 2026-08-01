'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import {
  FiBell,
  FiMail,
  FiSmartphone,
  FiCalendar,
  FiTool,
  FiDollarSign,
  FiVolume2,
  FiCheckCircle,
  FiArrowRight,
  FiCoffee,
  FiHelpCircle,
  FiShield
} from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function NotificationsPage() {
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
                <span>Real-Time Alert Dispatch</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183153] font-poppins tracking-tight leading-tight">
                Instant Platform <span className="text-[#5E8FBF]">Notifications</span>
              </h1>

              <p className="text-base md:text-lg text-[#425466] leading-relaxed font-normal">
                Never miss a booking confirmation, maintenance dispatch status, rent reminder, or community alert. Stay informed via in-app feeds, push notifications, and email alerts.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#how-it-works">
                  <Button variant="primary" size="lg" className="px-8 shadow-md">
                    Learn More
                  </Button>
                </a>
                <Link href="/login">
                  <Button variant="secondary" size="lg" className="px-8">
                    Enable Notifications <FiArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Notification Showcase Cards */}
            <motion.div variants={fadeIn} className="relative flex justify-center">
              <div className="w-full max-w-lg space-y-4">
                {/* Notification Card 1 */}
                <div className="bg-white p-4 rounded-2xl border border-[#D6E4F2] shadow-md flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                    <FiCalendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#183153]">Booking Confirmed</p>
                      <span className="text-[10px] text-[#6B7A90]">2m ago</span>
                    </div>
                    <p className="text-xs text-[#425466] mt-0.5">Rooftop Pavilion slot reserved for Today, 6:00 PM.</p>
                  </div>
                </div>

                {/* Notification Card 2 */}
                <div className="bg-white p-4 rounded-2xl border border-[#D6E4F2] shadow-md flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                    <FiTool className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#183153]">Technician Dispatched</p>
                      <span className="text-[10px] text-[#6B7A90]">15m ago</span>
                    </div>
                    <p className="text-xs text-[#425466] mt-0.5">Ticket #8402 assigned to Technician Mike R. En route.</p>
                  </div>
                </div>

                {/* Notification Card 3 */}
                <div className="bg-white p-4 rounded-2xl border border-[#D6E4F2] shadow-md flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] text-[#2B5F9E] flex items-center justify-center shrink-0 border border-[#D6E4F2]">
                    <FiVolume2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#183153]">Community Announcement</p>
                      <span className="text-[10px] text-[#6B7A90]">1h ago</span>
                    </div>
                    <p className="text-xs text-[#425466] mt-0.5">Annual Poolside BBQ party scheduled for Saturday!</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Capabilities Grid */}
        <section className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Alert Channels</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Notification Features</h2>
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
                icon: FiCalendar,
                title: 'Booking Updates',
                desc: 'Instant notifications when amenity reservations are requested, approved, or rescheduled.'
              },
              {
                icon: FiTool,
                title: 'Maintenance Updates',
                desc: 'Real-time 7-step status changes as work orders transition from dispatch to completion.'
              },
              {
                icon: FiDollarSign,
                title: 'Rent & Lease Reminders',
                desc: 'Automated upcoming rent due date alerts and digital payment receipt confirmations.'
              },
              {
                icon: FiVolume2,
                title: 'Community Announcements',
                desc: 'Broadcast notifications for building maintenance schedules, events, and emergency alerts.'
              },
              {
                icon: FiSmartphone,
                title: 'Mobile Push Notifications',
                desc: 'Receive immediate push notifications on your smartphone for high-priority dispatches.'
              },
              {
                icon: FiMail,
                title: 'Automated Email Alerts',
                desc: 'Structured email summaries for official lease documents, receipts, and account activity.'
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

        {/* How It Works */}
        <section id="how-it-works" className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">System</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">How Notifications Work</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { step: '1', title: 'Event Trigger', desc: 'A booking is placed or maintenance status changes.' },
              { step: '2', title: 'Real-Time Dispatch', desc: 'Live event engine triggers instant notification.' },
              { step: '3', title: 'Instant Delivery', desc: 'Alert appears in-app feed, mobile push, and email.' }
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
                q: 'Can I customize my notification preferences?',
                a: 'Yes, signed-in users can toggle email, push, and in-app alert channels directly in their account settings.'
              },
              {
                q: 'Are emergency building alerts sent instantly?',
                a: 'Yes, urgent announcements (e.g. water shutoff or fire drill) bypass individual filters to ensure resident safety.'
              },
              {
                q: 'Do I need an account to receive personal notifications?',
                a: 'Yes, personal booking and maintenance notifications require signing in to link alerts to your resident profile.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-[#white] p-6 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-2">
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
              Stay Connected to Your Residence
            </h2>
            <p className="text-sm md:text-base text-[#D6E4F2] max-w-xl mx-auto font-normal">
              Sign in to manage notification preferences and view your personal notification feed.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/login">
                <Button variant="primary" size="lg" className="px-8 shadow-md">
                  Enable Notifications
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
