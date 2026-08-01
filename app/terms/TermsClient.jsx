'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import {
  Scale,
  FileCheck,
  UserCheck,
  Building2,
  CalendarCheck,
  Wrench,
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  Mail,
  ArrowRight
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function TermsClient() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#4A6484] selection:bg-[#6F9DCB] selection:text-white">
      <Header />

      <main className="flex-1 space-y-16 py-16 px-6">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto text-center space-y-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3FA] border border-[#8EB3D1]/30 text-xs font-semibold text-[#183153] shadow-sm">
              <Scale className="w-4 h-4 text-[#6F9DCB]" />
              <span>Legal Agreements & Usage Policies</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183153] font-poppins tracking-tight leading-tight max-w-4xl mx-auto">
              Terms of Service
            </motion.h1>

            <motion.p variants={fadeIn} className="text-sm font-semibold text-[#6F9DCB]">
              Last Updated: August 1, 2026
            </motion.p>

            <motion.p variants={fadeIn} className="text-base md:text-lg text-[#4A6484] max-w-3xl mx-auto leading-relaxed font-normal">
              These terms govern the use of KasaSync. By accessing or using our platform, you agree to comply with and be bound by these terms.
            </motion.p>
          </motion.div>
        </section>

        {/* Content Sections */}
        <section className="max-w-4xl mx-auto space-y-10">

          {/* Section 1: Acceptance of Terms */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">1. Acceptance of Terms</h2>
            </div>
            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              By accessing, browsing, registering for, or using the KasaSync smart property rental & community management platform, users acknowledge that they have read, understood, and agreed to be legally bound by these Terms of Service. If you do not agree to these terms, you must refrain from using the platform.
            </p>
          </div>

          {/* Section 2: User Accounts */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">2. User Accounts & Registration</h2>
            </div>
            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              To utilize KasaSync platform capabilities, users must create an account. You agree to:
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-[#4A6484]">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span>Provide accurate, current, and complete registration information.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span>Maintain account security and promptly update any changes to your information.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span>Remain fully responsible for maintaining password confidentiality and all activities under your account.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Property Listings */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">3. Property Listings</h2>
            </div>
            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              Property owners and administrators who list real estate assets on KasaSync are strictly responsible for their listings:
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-[#4A6484]">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span>Owners are solely responsible for ensuring property details, pricing, and availability are accurate and truthful.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span>Listings must contain truthful information, legitimate property media, and accurate geographical details.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span>Prohibited content, fraudulent listings, misleading media, or unauthorized properties are strictly forbidden and subject to removal.</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Bookings */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">4. Bookings & Reservations</h2>
            </div>
            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              KasaSync provides real-time booking systems for property rentals and facility reservations:
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-[#4A6484]">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span><strong>Booking Confirmations:</strong> Reservations depend on real-time availability and owner/system confirmation.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span><strong>Cancellations:</strong> Booking cancellations must adhere to building policies and notice timelines.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span><strong>Payment Policies:</strong> Future payment integrations and billing schedules will follow explicit billing guidelines.</span>
              </li>
            </ul>
          </div>

          {/* Section 5: Maintenance Requests */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">5. Maintenance Requests</h2>
            </div>
            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              Tenants may submit maintenance repair tickets via the platform:
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-[#4A6484]">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span><strong>Request Tracking:</strong> Maintenance tickets are tracked centrally and dispatched to assigned staff.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span><strong>Response Times:</strong> Response times may vary depending on request priority (Low, Medium, High) and technician availability.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span><strong>Documentation Required:</strong> Clear descriptions and accurate photo documentation are required for processing tickets.</span>
              </li>
            </ul>
          </div>

          {/* Section 6: Community Amenities */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">6. Community Amenities</h2>
            </div>
            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              Shared resident amenities (pools, fitness centers, clubhouses) are governed by specific community standards:
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-[#4A6484]">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span>Booking rules, opening hours, and maximum guest limits must be respected at all times.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span>Users must ensure responsible usage and prevent damage to shared property facilities.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F9DCB] mt-2 shrink-0" />
                <span>Violation of community guidelines may result in temporary suspension of amenity booking privileges.</span>
              </li>
            </ul>
          </div>

          {/* Section 7: Intellectual Property */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">7. Intellectual Property</h2>
            </div>
            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              All content, branding, logos, graphics, user interface designs, code, and software components belong exclusively to KasaSync. Unauthorized copying, modification, distribution, or reverse engineering of platform assets is strictly prohibited.
            </p>
          </div>

          {/* Section 8: Limitation of Liability */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">8. Limitation of Liability</h2>
            </div>
            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              To the maximum extent permitted by applicable law, KasaSync shall not be held liable for any indirect, incidental, special, consequential, or punitive damages arising from your platform usage, temporary service interruptions, or third-party service delays.
            </p>
          </div>

          {/* Section 9: Changes to Terms */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#183153] font-poppins">9. Changes to Terms</h2>
            </div>
            <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed">
              We reserve the right to modify or update these Terms of Service periodically. Any updates will be posted directly on this page with a revised "Last Updated" date. Users are encouraged to review these terms periodically.
            </p>
          </div>

          {/* Section 10: Contact Us */}
          <div className="bg-[#183153] text-white p-8 md:p-10 rounded-[20px] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold font-poppins">10. Questions About Our Terms?</h2>
              <p className="text-xs md:text-sm text-[#A9D5E3]">
                If you have questions or concerns regarding our Terms of Service, please contact our support team.
              </p>
            </div>

            <Link href="/contact" className="shrink-0">
              <Button variant="primary" size="lg" className="px-6 shadow-md">
                Contact Us <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
