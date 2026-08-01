'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import {
  ShieldCheck,
  Lock,
  Database,
  Cookie,
  Server,
  UserCheck,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function PrivacyClient() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#4A6484] selection:bg-[#6F9DCB] selection:text-white">
      <Header />

      <main className="flex-1 space-y-16 py-16 px-6">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto text-center space-y-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3FA] border border-[#8EB3D1]/30 text-xs font-semibold text-[#183153] shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#6F9DCB]" />
              <span>Data Protection & Privacy</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183153] font-poppins tracking-tight leading-tight max-w-4xl mx-auto">
              Privacy Policy
            </motion.h1>

            <motion.p variants={fadeIn} className="text-sm font-semibold text-[#6F9DCB]">
              Last Updated: August 1, 2026
            </motion.p>

            <motion.p variants={fadeIn} className="text-base md:text-lg text-[#4A6484] max-w-3xl mx-auto leading-relaxed font-normal">
              Your privacy is important to us. This Privacy Policy explains how KasaSync collects, uses, stores, and protects your information.
            </motion.p>
          </motion.div>
        </section>

        {/* Content Container */}
        <section className="max-w-4xl mx-auto space-y-10">
          
          {/* Section 1: Information We Collect */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">1. Information We Collect</h2>
            </div>
            
            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              KasaSync collects information to provide efficient property management, booking systems, and seamless community communication. We collect the following categories of data:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: 'Account Information', desc: 'Name, email address, hashed password, phone number, role, and avatar.' },
                { title: 'Property Information', desc: 'Listing title, address, descriptions, pricing, image media, and occupancy status.' },
                { title: 'Booking Information', desc: 'Amenity reservations, dates, time slots, guest counts, and booking notes.' },
                { title: 'Maintenance Requests', desc: 'Ticket title, issue description, priority status, staff assignments, and uploaded issue photos.' },
                { title: 'Contact Messages', desc: 'Direct messages sent between property owners, tenants, and support representatives.' },
                { title: 'Usage Analytics', desc: 'System activity logs, timestamped actions, and operational dashboard analytics.' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FFFDF7] border border-[#8EB3D1]/20 space-y-1.5">
                  <h3 className="text-sm font-bold text-[#183153] font-poppins flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F9DCB] shrink-0" />
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4A6484] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">2. How We Use Your Information</h2>
            </div>

            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              We utilize collected data strictly to operate, maintain, and optimize the KasaSync property management platform:
            </p>

            <ul className="space-y-3 text-xs md:text-sm text-[#4A6484]">
              {[
                { bold: 'Managing properties', text: 'Displaying accurate listings, assigning tenants, and tracking occupancy.' },
                { bold: 'Processing bookings', text: 'Verifying facility availability and confirming amenity reservations.' },
                { bold: 'Sending notifications', text: 'Delivering real-time updates regarding maintenance, bookings, and system alerts.' },
                { bold: 'Maintenance tracking', text: 'Routing repair tickets to assigned staff and keeping tenants informed.' },
                { bold: 'Improving the platform', text: 'Analyzing aggregated performance metrics to enhance system capabilities.' },
                { bold: 'Customer support', text: 'Resolving user inquiries, troubleshooting issues, and maintaining account security.' }
              ].map((use, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                  <span><strong className="text-[#183153] font-poppins">{use.bold}:</strong> {use.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Data Security */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">3. Data Security</h2>
            </div>

            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              We implement industry-standard technical measures to safeguard your personal data against unauthorized access, alteration, or disclosure:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-4 rounded-xl bg-[#EAF3FA]/50 border border-[#8EB3D1]/20 space-y-1">
                <h4 className="font-bold text-[#183153]">Password Encryption</h4>
                <p className="text-[#4A6484]">Passwords are salted and hashed using bcrypt encryption prior to storage.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#EAF3FA]/50 border border-[#8EB3D1]/20 space-y-1">
                <h4 className="font-bold text-[#183153]">Secure Authentication</h4>
                <p className="text-[#4A6484]">Session access tokens are securely signed and verified.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#EAF3FA]/50 border border-[#8EB3D1]/20 space-y-1">
                <h4 className="font-bold text-[#183153]">HTTPS Protocol</h4>
                <p className="text-[#4A6484]">All data transferred between your browser and our servers is encrypted in transit via SSL/TLS.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#EAF3FA]/50 border border-[#8EB3D1]/20 space-y-1">
                <h4 className="font-bold text-[#183153]">Protected Databases</h4>
                <p className="text-[#4A6484]">Cloud database clusters are protected with strict network access control lists and limited internal access.</p>
              </div>
            </div>
          </div>

          {/* Section 4: Cookies */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">4. Cookies & Local Storage</h2>
            </div>

            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              KasaSync uses essential cookies and browser storage for the following specific purposes:
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-xs md:text-sm">
              <li className="flex items-center gap-2 text-[#183153] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#6F9DCB]" /> Login sessions & authentication state
              </li>
              <li className="flex items-center gap-2 text-[#183153] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#6F9DCB]" /> User UI theme & layout preferences
              </li>
              <li className="flex items-center gap-2 text-[#183153] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#6F9DCB]" /> Performance & API request caching
              </li>
              <li className="flex items-center gap-2 text-[#183153] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#6F9DCB]" /> Security token verification
              </li>
            </ul>
          </div>

          {/* Section 5: Third Party Services */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">5. Third-Party Infrastructure Services</h2>
            </div>

            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              We rely on established enterprise infrastructure providers to host and run the KasaSync platform:
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-[#8EB3D1]/30 bg-[#FFFDF7] space-y-1">
                <h4 className="font-bold text-[#183153] font-poppins">MongoDB Atlas</h4>
                <p className="text-xs text-[#4A6484]">Encrypted cloud database storage for application data and records.</p>
              </div>
              <div className="p-4 rounded-xl border border-[#8EB3D1]/30 bg-[#FFFDF7] space-y-1">
                <h4 className="font-bold text-[#183153] font-poppins">Cloudinary</h4>
                <p className="text-xs text-[#4A6484]">Secure cloud media storage for property listing images and maintenance photos.</p>
              </div>
              <div className="p-4 rounded-xl border border-[#8EB3D1]/30 bg-[#FFFDF7] space-y-1">
                <h4 className="font-bold text-[#183153] font-poppins">Vercel</h4>
                <p className="text-xs text-[#4A6484]">Serverless web deployment hosting and edge network execution.</p>
              </div>
            </div>
          </div>

          {/* Section 6: User Rights */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">6. User Rights</h2>
            </div>

            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              As a user of KasaSync, you retain complete rights regarding your personal information:
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-xs md:text-sm text-[#4A6484]">
              <li className="flex items-center gap-2 font-semibold text-[#183153]">
                <CheckCircle2 className="w-4 h-4 text-[#6F9DCB]" /> View account profile & details
              </li>
              <li className="flex items-center gap-2 font-semibold text-[#183153]">
                <CheckCircle2 className="w-4 h-4 text-[#6F9DCB]" /> Edit account information at any time
              </li>
              <li className="flex items-center gap-2 font-semibold text-[#183153]">
                <CheckCircle2 className="w-4 h-4 text-[#6F9DCB]" /> Delete account upon request
              </li>
              <li className="flex items-center gap-2 font-semibold text-[#183153]">
                <CheckCircle2 className="w-4 h-4 text-[#6F9DCB]" /> Request complete data removal
              </li>
              <li className="flex items-center gap-2 font-semibold text-[#183153]">
                <CheckCircle2 className="w-4 h-4 text-[#6F9DCB]" /> Contact support for privacy inquiries
              </li>
            </ul>
          </div>

          {/* Section 7: Contact Information */}
          <div className="bg-[#183153] text-white p-8 md:p-10 rounded-[20px] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold font-poppins">7. Contact Information</h2>
              <p className="text-xs md:text-sm text-[#A9D5E3]">
                If you have questions about this Privacy Policy or your data, email us at:
              </p>
              <a href="mailto:support@kasasync.com" className="inline-block text-sm font-bold text-white hover:underline pt-1">
                support@kasasync.com
              </a>
            </div>

            <Link href="/contact" className="shrink-0">
              <Button variant="primary" size="lg" className="px-6 shadow-md">
                Contact Support <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
