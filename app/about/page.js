'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Footer from '@/components/layout/Footer';
import {
  FiHome,
  FiGrid,
  FiTool,
  FiCalendar,
  FiActivity,
  FiMessageSquare,
  FiBell,
  FiBarChart2,
  FiShield,
  FiCheckCircle,
  FiTarget,
  FiCompass,
  FiLock,
  FiServer,
  FiDatabase,
  FiCloud,
  FiCpu,
  FiLayers,
  FiUsers,
  FiZap,
  FiCoffee,
  FiArrowRight,
  FiMail,
  FiKey,
  FiFileText,
  FiUserCheck
} from 'react-icons/fi';
import Header from '@/components/layout/Header';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#425466] selection:bg-[#5E8FBF] selection:text-white">
      {/* Header Navigation */}
      <Header />

      {/* Main Content Container */}
      <main className="flex-1 space-y-24 py-16 px-6">
        
        {/* 1. Hero Section */}
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
                <span>Next-Gen Property Operations</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183153] font-poppins tracking-tight leading-tight">
                About <span className="text-[#5E8FBF]">KasaSync</span>
              </h1>

              <p className="text-base md:text-lg text-[#425466] leading-relaxed font-normal">
                KasaSync is an all-in-one property management platform designed to simplify rental operations, maintenance workflows, community amenities, and tenant communication. Our mission is to make property management smarter, faster, and more reliable for property owners, managers, and residents.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/#features">
                  <Button variant="primary" size="lg" className="px-8 shadow-md">
                    Explore Features
                  </Button>
                </Link>
                <a href="mailto:support@kasasync.com">
                  <Button variant="secondary" size="lg" className="px-8">
                    Contact Us
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Abstract Vector Illustration */}
            <motion.div variants={fadeIn} className="relative flex justify-center">
              <div className="w-full max-w-lg h-96 bg-gradient-to-tr from-[#EAF3FA] via-[#D6E4F2]/50 to-[#5E8FBF]/10 rounded-3xl border border-[#D6E4F2] p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
                <div className="flex justify-between items-center z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center border border-[#EAF3FA]">
                    <FiGrid className="w-6 h-6 text-[#183153]" />
                  </div>
                  <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-xs font-bold text-[#183153] border border-[#D6E4F2]">
                    Real-Time Ecosystem
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 z-10">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#D6E4F2] space-y-1">
                    <FiTool className="w-5 h-5 text-[#5E8FBF]" />
                    <p className="text-xs font-bold text-[#183153]">7-Step Dispatch</p>
                    <p className="text-[10px] text-[#6B7A90]">Automated tickets</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#D6E4F2] space-y-1">
                    <FiCalendar className="w-5 h-5 text-[#5E8FBF]" />
                    <p className="text-xs font-bold text-[#183153]">Conflict-Free</p>
                    <p className="text-[10px] text-[#6B7A90]">Amenity bookings</p>
                  </div>
                </div>

                <div className="bg-[#183153] text-white p-4 rounded-2xl flex items-center justify-between z-10 shadow-lg">
                  <div className="flex items-center gap-3">
                    <FiActivity className="w-5 h-5 text-[#5E8FBF] animate-pulse" />
                    <div>
                      <p className="text-xs font-bold font-poppins">Live Property Sync</p>
                      <p className="text-[10px] text-[#AFC5DB]">Real-Time Sync Engine</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#5E8FBF]">Active</span>
                </div>

                {/* Decorative background circles */}
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#5E8FBF]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#183153]/10 rounded-full blur-2xl pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. Our Story Section */}
        <section className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="bg-white p-8 md:p-12 rounded-3xl border border-[#EAF3FA] shadow-sm space-y-6"
          >
            <motion.div variants={fadeIn} className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Background & Vision</span>
              <h2 className="text-3xl font-bold text-[#183153] font-poppins">Our Story</h2>
            </motion.div>

            <motion.p variants={fadeIn} className="text-base text-[#425466] leading-relaxed text-center max-w-3xl mx-auto font-normal">
              KasaSync was built out of frustration with legacy property management tools that suffered from scattered information, manual double-booking nightmares, delayed maintenance dispatch, and broken tenant communication channels. We envisioned a unified digital platform that brings owners, residents, maintenance engineers, and administrators together under one intuitive real-time ecosystem.
            </motion.p>
          </motion.div>
        </section>

        {/* 3. Mission & Vision */}
        <section className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Mission Card */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-3xl border border-[#EAF3FA] shadow-sm space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3FA] border border-[#D6E4F2] flex items-center justify-center text-[#5E8FBF]">
                <FiTarget className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-[#183153] font-poppins">Our Mission</h3>
              <p className="text-sm text-[#425466] leading-relaxed font-normal">
                To simplify property management through technology, automation, and real-time collaboration.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-3xl border border-[#EAF3FA] shadow-sm space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3FA] border border-[#D6E4F2] flex items-center justify-center text-[#5E8FBF]">
                <FiCompass className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-[#183153] font-poppins">Our Vision</h3>
              <p className="text-sm text-[#425466] leading-relaxed font-normal">
                To become the most trusted digital platform for residential communities and property management worldwide.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* 4. What We Offer */}
        <section className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Capabilities</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">What We Offer</h2>
            <p className="text-sm text-[#6B7A90] max-w-xl mx-auto">
              Everything needed to manage residential listings, maintenance, amenities, and resident relations.
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
                title: 'Property Management',
                desc: 'Manage properties, tenants, and listings efficiently with Cloudinary photo galleries.'
              },
              {
                title: 'Smart Bookings',
                desc: 'Prevent booking conflicts with real-time time-slot scheduling across community amenities.'
              },
              {
                title: 'Maintenance Management',
                desc: 'Track maintenance requests from submission to completion with photo completion proof.'
              },
              {
                title: 'Messaging',
                desc: 'Secure direct communication channel between residents, owners, and property managers.'
              },
              {
                title: 'Notifications',
                desc: 'Real-time status updates, push alerts, and important community announcements.'
              },
              {
                title: 'Analytics',
                desc: 'Monitor occupancy rates, maintenance metrics, and financial insights at a glance.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAF3FA] border border-[#D6E4F2] flex items-center justify-center text-[#2B5F9E]">
                  <FiGrid className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold text-[#183153] font-poppins">{item.title}</h3>
                <p className="text-xs md:text-sm text-[#425466] leading-relaxed font-normal">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 5. Why Choose KasaSync */}
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Competitive Advantage</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Why Choose KasaSync</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              'Real-time updates',
              'Secure authentication',
              'Cloud-based platform',
              'Mobile-friendly experience',
              'Easy property management',
              'Modern dashboard'
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-xl border border-[#EAF3FA] shadow-sm flex items-center gap-3"
              >
                <FiCheckCircle className="w-5 h-5 text-[#5E8FBF] shrink-0" />
                <span className="text-sm font-semibold text-[#183153]">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 6. Platform Statistics */}
        <section className="max-w-6xl mx-auto">
          <div className="bg-[#183153] text-white p-10 md:p-16 rounded-3xl shadow-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { count: '1000+', label: 'Properties Managed' },
                { count: '5000+', label: 'Bookings Processed' },
                { count: '98%', label: 'Customer Satisfaction' },
                { count: '24/7', label: 'System Availability' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="space-y-2"
                >
                  <p className="text-3xl md:text-4xl font-extrabold text-white font-poppins tracking-tight">
                    {stat.count}
                  </p>
                  <p className="text-xs md:text-sm text-[#D6E4F2] font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Core Values */}
        <section className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Principles</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Core Values</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: FiFileText, name: 'Transparency', desc: 'Clear communication and open tracking across all property actions.' },
              { icon: FiZap, name: 'Innovation', desc: 'Continuous iteration using modern web tech and real-time sync.' },
              { icon: FiShield, name: 'Reliability', desc: '24/7 uptime and zero double-booking conflict algorithms.' },
              { icon: FiLock, name: 'Security', desc: 'Enterprise-grade password hashing, JWT, and encrypted channels.' },
              { icon: FiUserCheck, name: 'Customer First', desc: 'Intuitive user experiences designed for tenants, staff, and owners.' },
              { icon: FiUsers, name: 'Community', desc: 'Fostering harmonious relationships in shared residential spaces.' }
            ].map((val, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EAF3FA] border border-[#D6E4F2] flex items-center justify-center text-[#2B5F9E]">
                  <val.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-[#183153] font-poppins">{val.name}</h3>
                <p className="text-xs text-[#425466] leading-relaxed font-normal">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Meet the Platform */}
        <section className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Architecture</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Meet the Platform</h2>
            <p className="text-sm text-[#6B7A90] max-w-xl mx-auto">
              Explore the core operational modules powering KasaSync.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FiGrid, name: 'Property Module', text: 'Zillow-style listings, photo galleries, lease tracking, and unit specs.' },
              { icon: FiTool, name: 'Maintenance Module', text: '7-step resolution workflow with dispatch priority and completion photos.' },
              { icon: FiCalendar, name: 'Booking Engine', text: 'Conflict-free amenity scheduling with automated slot validation.' },
              { icon: FiBarChart2, name: 'Analytics Dashboard', text: 'Real-time metrics, revenue monitoring, and maintenance logs.' },
              { icon: FiMessageSquare, name: 'Messaging System', text: 'Direct tenant-to-manager communication threads.' },
              { icon: FiBell, name: 'Notifications', text: 'Instant push updates and broadcast announcements.' }
            ].map((module, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#EAF3FA] border border-[#D6E4F2] flex items-center justify-center text-[#2B5F9E]">
                  <module.icon className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold text-[#183153] font-poppins">{module.name}</h3>
                <p className="text-xs text-[#425466] leading-relaxed font-normal">{module.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Security & Compliance */}
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Protection</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Security & Compliance</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'JWT Authentication',
              'Secure REST API',
              'Encrypted Passwords',
              'Enterprise Security Architecture',
              'Protected Routes',
              'Role-Based Access'
            ].map((sec, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#EAF3FA] shadow-sm flex items-center gap-3">
                <FiShield className="w-5 h-5 text-[#5E8FBF] shrink-0" />
                <span className="text-sm font-bold text-[#183153]">{sec}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Call to Action */}
        <section className="max-w-6xl mx-auto">
          <div className="bg-[#183153] text-white p-10 md:p-16 rounded-3xl text-center space-y-6 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tight">
              Ready to Simplify Property Management?
            </h2>
            <p className="text-sm md:text-base text-[#D6E4F2] max-w-xl mx-auto font-normal">
              Join property owners, tenants, maintenance staff, and managers on the KasaSync platform today.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/register">
                <Button variant="primary" size="lg" className="px-8 shadow-md">
                  Get Started
                </Button>
              </Link>
              <a href="mailto:support@kasasync.com">
                <Button variant="secondary" size="lg" className="px-8">
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
