'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import {
  Wrench,
  Camera,
  Activity,
  UserCheck,
  AlertCircle,
  History,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Layers,
  FileCheck
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function MaintenancePage() {
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
                <span>7-Step Ticket Resolution Engine</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183153] font-poppins tracking-tight leading-tight">
                Maintenance Requests <span className="text-[#5E8FBF]">Tracked</span>
              </h1>

              <p className="text-base md:text-lg text-[#425466] leading-relaxed font-normal">
                Submit work orders with photo proof, track priority dispatches in real time, and monitor ticket status from submission to technician sign-off.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#workflow">
                  <Button variant="primary" size="lg" className="px-8 shadow-md">
                    View Workflow
                  </Button>
                </a>
                <Link href="/login">
                  <Button variant="secondary" size="lg" className="px-8">
                    Submit Request <ArrowRight className="w-4 h-4" />
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
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#183153]">HVAC AC Repair Ticket #8402</p>
                      <p className="text-xs text-[#6B7A90]">Priority: High • Dispatched</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold">
                    In Progress
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 z-10">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#D6E4F2]">
                    <Camera className="w-5 h-5 text-[#5E8FBF] mb-1" />
                    <p className="text-xs font-bold text-[#183153]">Photo Proof</p>
                    <p className="text-[10px] text-[#6B7A90]">Cloudinary photo logs</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#D6E4F2]">
                    <UserCheck className="w-5 h-5 text-[#5E8FBF] mb-1" />
                    <p className="text-xs font-bold text-[#183153]">Staff Dispatch</p>
                    <p className="text-[10px] text-[#6B7A90]">Assigned to Mike R.</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#D6E4F2] flex items-center justify-between z-10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-[#5E8FBF]" />
                    <span className="text-xs font-bold text-[#183153]">Status: Technician En Route</span>
                  </div>
                  <span className="text-xs font-bold text-[#2B5F9E]">Step 4/7</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Capabilities Grid */}
        <section className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Features</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">Maintenance Capabilities</h2>
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
                icon: Wrench,
                title: 'Report Issues Instantly',
                desc: 'Submit maintenance requests directly from tenant dashboard with category selection and descriptions.'
              },
              {
                icon: Camera,
                title: 'Upload Photo Evidence',
                desc: 'Attach photos of broken fixtures or leaks powered by Cloudinary for instant technician diagnosis.'
              },
              {
                icon: Activity,
                title: 'Live Ticket Status Tracking',
                desc: 'Monitor real-time resolution states: Submitted, Reviewed, Scheduled, Dispatched, In-Progress, Completed, Closed.'
              },
              {
                icon: UserCheck,
                title: 'Technician Assignment',
                desc: 'Admins and staff assign maintenance tickets to certified technicians with priority dispatch alerts.'
              },
              {
                icon: AlertCircle,
                title: 'Priority Levels',
                desc: 'Categorize requests by Urgency (Low, Medium, High, Emergency) to ensure critical issues get handled first.'
              },
              {
                icon: History,
                title: 'Comprehensive Request History',
                desc: 'Access complete maintenance history logs, technician notes, and completion proof for every unit.'
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

        {/* 7-Step Resolution Workflow */}
        <section id="workflow" className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E8FBF]">Workflow</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">7-Step Resolution Lifecycle</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '1', name: 'Submitted', text: 'Tenant files ticket with photos' },
              { step: '2', name: 'Reviewed', text: 'Property manager validates issue' },
              { step: '3', name: 'Scheduled', text: 'Time slot assigned' },
              { step: '4', name: 'Dispatched', text: 'Technician notified & assigned' },
              { step: '5', name: 'In Progress', text: 'Work being completed on-site' },
              { step: '6', name: 'Completed', text: 'Photo proof of completion uploaded' },
              { step: '7', name: 'Closed', text: 'Tenant sign-off & archived' }
            ].map((wf, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-2">
                <span className="w-8 h-8 rounded-lg bg-[#EAF3FA] text-[#2B5F9E] font-bold text-xs flex items-center justify-center border border-[#D6E4F2]">
                  {wf.step}
                </span>
                <h4 className="text-sm font-bold text-[#183153] font-poppins">{wf.name}</h4>
                <p className="text-xs text-[#6B7A90]">{wf.text}</p>
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
                q: 'How fast are emergency maintenance requests handled?',
                a: 'Emergency requests trigger instant priority dispatch alerts to assigned maintenance staff for immediate response.'
              },
              {
                q: 'Can I track the status of my work order?',
                a: 'Yes, tenants can view live step-by-step progress from submission to technician sign-off directly in their dashboard.'
              },
              {
                q: 'Do I need to sign in to report a maintenance issue?',
                a: 'Yes, signing in ensures requests are linked securely to your specific property unit and active lease.'
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
              Need Maintenance Assistance?
            </h2>
            <p className="text-sm md:text-base text-[#D6E4F2] max-w-xl mx-auto font-normal">
              Log in to your KasaSync tenant portal to submit a new work order or check active ticket status.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/login">
                <Button variant="primary" size="lg" className="px-8 shadow-md">
                  Submit Maintenance Request
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
