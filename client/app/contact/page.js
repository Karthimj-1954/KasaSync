'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  Mail,
  Clock,
  Globe,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Headphones,
  Presentation,
  Building2,
  CreditCard,
  Handshake,
  MessageSquare,
  CheckCircle2,
  Send
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#4A6484] selection:bg-[#6F9DCB] selection:text-white">
      <Header />

      <main className="flex-1 space-y-24 py-16 px-6">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto text-center space-y-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3FA] border border-[#8EB3D1]/30 text-xs font-semibold text-[#183153] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#6F9DCB]" />
              <span>24/7 Support & Inquiries</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183153] font-poppins tracking-tight leading-tight max-w-4xl mx-auto">
              We're Here to Help
            </motion.h1>

            <motion.p variants={fadeIn} className="text-base md:text-lg text-[#4A6484] max-w-2xl mx-auto leading-relaxed font-normal">
              Have questions about KasaSync? Reach out and we'll get back to you as soon as possible.
            </motion.p>
          </motion.div>
        </section>

        {/* Contact Info & Form Grid */}
        <section className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-[#183153] font-poppins">Get in Touch</h3>
                
                <div className="space-y-4 text-xs md:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-[#183153]">General Support</p>
                      <a href="mailto:support@kasasync.com" className="text-[#6F9DCB] hover:underline">
                        support@kasasync.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-[#183153]">Sales & Enterprise</p>
                      <a href="mailto:sales@kasasync.com" className="text-[#6F9DCB] hover:underline">
                        sales@kasasync.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB] shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-[#183153]">Support Hours</p>
                      <p className="text-[#4A6484]">Monday – Friday</p>
                      <p className="text-[#4A6484]">9:00 AM – 6:00 PM (IST)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Cloud Platform Placeholder Card */}
              <div className="bg-[#183153] text-white p-8 rounded-[20px] shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-[#A9D5E3]">
                  <Globe className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Global Reach</span>
                </div>
                <p className="text-sm font-semibold leading-relaxed">
                  Serving customers globally through our cloud platform.
                </p>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-[#183153] font-poppins">Send Us a Message</h3>
                <p className="text-xs text-[#4A6484]">Fill out the form below and our team will respond within 24 hours.</p>
              </div>

              {submitted ? (
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900 font-poppins">Message Sent Successfully!</h4>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Thank you for contacting KasaSync. Our support team will review your message and reach out shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="mt-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name *"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Email Address *"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number (optional)"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Input
                      label="Subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-[#183153]">Message *</label>
                    <textarea
                      rows={4}
                      placeholder="Write your message or inquiry here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-[#8EB3D1]/40 bg-[#FFFDF7] text-xs focus:ring-2 focus:ring-[#6F9DCB] focus:border-[#6F9DCB] transition outline-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full justify-center shadow-md">
                    Send Message <Send className="w-4 h-4 ml-1" />
                  </Button>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* Why Contact Us Categories */}
        <section className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F9DCB]">Topics</span>
            <h2 className="text-3xl font-bold text-[#183153] font-poppins">How Can We Help You?</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Headphones, title: 'Technical Support', desc: 'Assistance with portal navigation, bugs, or system configuration.' },
              { icon: Presentation, title: 'Product Demo', desc: 'Schedule a live guided demo of KasaSync property modules.' },
              { icon: Building2, title: 'Enterprise Solutions', desc: 'Custom enterprise contracts for multi-building residential hubs.' },
              { icon: CreditCard, title: 'Billing Questions', desc: 'Inquiries regarding subscription plans, invoices, and payments.' },
              { icon: Handshake, title: 'Partnerships', desc: 'Explore channel reseller and technology integration partnerships.' },
              { icon: MessageSquare, title: 'General Enquiries', desc: 'Any other questions or feedback about the KasaSync platform.' }
            ].map((cat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[20px] border border-[#8EB3D1]/20 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF3FA] border border-[#8EB3D1]/30 flex items-center justify-center text-[#6F9DCB]">
                  <cat.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h4 className="text-base font-bold text-[#183153] font-poppins">{cat.title}</h4>
                <p className="text-xs text-[#4A6484] leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
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
                q: 'How quickly do you respond?',
                a: 'Our support team responds to all inquiries within 24 business hours. Critical issues receive priority handling.'
              },
              {
                q: 'Can I schedule a demo?',
                a: 'Yes! Select Product Demo in the contact form or email sales@kasasync.com to book a convenient time slot.'
              },
              {
                q: 'Do you offer enterprise plans?',
                a: 'Yes, we provide custom Enterprise plans tailored for large multi-property developments.'
              },
              {
                q: 'How do I report a bug?',
                a: 'Submit details via the contact form under Technical Support or email support@kasasync.com directly.'
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

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto">
          <div className="bg-[#183153] text-white p-10 md:p-16 rounded-[20px] text-center space-y-6 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tight">
              Ready to transform your property management?
            </h2>
            <p className="text-sm md:text-base text-[#A9D5E3] max-w-xl mx-auto font-normal">
              Get started for free or explore all KasaSync platform capabilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/register">
                <Button variant="primary" size="lg" className="px-8 shadow-md">
                  Get Started
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="secondary" size="lg" className="px-8">
                  View Features
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
