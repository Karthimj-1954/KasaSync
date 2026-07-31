'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import {
  Check,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Zap,
  Building2,
  Users
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#4A6484] selection:bg-[#6F9DCB] selection:text-white">
      <Header />

      <main className="flex-1 space-y-24 py-16 px-6">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto text-center space-y-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3FA] border border-[#8EB3D1]/30 text-xs font-semibold text-[#183153] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#6F9DCB]" />
              <span>Flexible Subscription Plans</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183153] font-poppins tracking-tight leading-tight max-w-4xl mx-auto">
              Simple Pricing for Every Property
            </motion.h1>

            <motion.p variants={fadeIn} className="text-base md:text-lg text-[#4A6484] max-w-2xl mx-auto leading-relaxed font-normal">
              Choose a plan that grows with your business. Transparent pricing with no hidden setup fees.
            </motion.p>
          </motion.div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-8 items-stretch"
          >
            {/* Starter Plan */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6F9DCB]">Starter</span>
                <h3 className="text-2xl font-bold text-[#183153] font-poppins">Starter Plan</h3>
                <p className="text-xs text-[#4A6484]">Ideal for individuals</p>
                <div className="pt-2">
                  <span className="text-4xl font-extrabold text-[#183153] font-poppins">Free</span>
                </div>

                <div className="border-t border-[#8EB3D1]/20 pt-4">
                  <ul className="space-y-3 text-xs md:text-sm text-[#4A6484]">
                    {[
                      'Up to 5 Properties',
                      'Booking Management',
                      'Maintenance Requests',
                      'Email Support'
                    ].map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-[#6F9DCB] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href="/register" className="w-full">
                <Button variant="outline" size="lg" className="w-full justify-center">
                  Get Started
                </Button>
              </Link>
            </motion.div>

            {/* Professional Plan (Highlighted) */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-[20px] border-2 border-[#183153] shadow-xl flex flex-col justify-between space-y-6 relative"
            >
              <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[#183153] text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                Most Popular
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#183153]">Professional</span>
                <h3 className="text-2xl font-bold text-[#183153] font-poppins">Professional Plan</h3>
                <p className="text-xs text-[#4A6484]">For growing property portfolio owners</p>
                <div className="pt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#183153] font-poppins">₹999</span>
                  <span className="text-xs text-[#4A6484] font-medium">/ month</span>
                </div>

                <div className="border-t border-[#8EB3D1]/20 pt-4">
                  <ul className="space-y-3 text-xs md:text-sm text-[#183153] font-medium">
                    {[
                      'Unlimited Properties',
                      'Tenant Messaging',
                      'Analytics Dashboard',
                      'Amenity Booking',
                      'Notifications'
                    ].map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-[#183153] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href="/register" className="w-full">
                <Button variant="primary" size="lg" className="w-full justify-center shadow-md">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6F9DCB]">Enterprise</span>
                <h3 className="text-2xl font-bold text-[#183153] font-poppins">Enterprise Plan</h3>
                <p className="text-xs text-[#4A6484]">For large residential communities</p>
                <div className="pt-2">
                  <span className="text-3xl font-extrabold text-[#183153] font-poppins">Contact Us</span>
                </div>

                <div className="border-t border-[#8EB3D1]/20 pt-4">
                  <ul className="space-y-3 text-xs md:text-sm text-[#4A6484]">
                    {[
                      'Everything in Professional',
                      'Custom Integrations',
                      'Priority Support',
                      'Dedicated Manager',
                      'API Access'
                    ].map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-[#6F9DCB] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href="/contact" className="w-full">
                <Button variant="secondary" size="lg" className="w-full justify-center">
                  Contact Sales
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F9DCB]">Questions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#183153] font-poppins">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How many properties can I manage?',
                a: 'The Starter plan includes up to 5 properties free. Professional and Enterprise plans allow unlimited properties.'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, subscriptions are on a month-to-month basis with zero lock-in contracts or cancellation penalties.'
              },
              {
                q: 'Does KasaSync support multiple managers?',
                a: 'Yes! Professional and Enterprise plans support multi-role permissions for staff, managers, and property owners.'
              },
              {
                q: 'Is my data secure?',
                a: 'All data is encrypted in transit and at rest using MongoDB Atlas security, JWT tokens, and Bcrypt password hashing.'
              },
              {
                q: 'Can tenants access the portal?',
                a: 'Yes, tenants receive free portal access to submit maintenance work orders, view leases, and book community amenities.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-[#183153]">
                  <HelpCircle className="w-5 h-5 text-[#6F9DCB] shrink-0" />
                  <h3 className="text-base font-bold font-poppins">{faq.q}</h3>
                </div>
                <p className="text-xs md:text-sm text-[#4A6484] leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-5xl mx-auto">
          <div className="bg-[#183153] text-white p-10 md:p-16 rounded-[20px] text-center space-y-6 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tight">
              Still have questions?
            </h2>
            <p className="text-sm md:text-base text-[#A9D5E3] max-w-xl mx-auto font-normal">
              Contact our sales and support team to find the best plan for your property portfolio.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg" className="px-8 shadow-md">
                  Contact Support
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
