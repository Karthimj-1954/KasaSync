'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Mail, Globe, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#183153] text-[#D6E4F2] pt-16 pb-8 px-6 border-t border-[#23426B]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Grid: Brand Info + 4 Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Summary Column */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#5E8FBF] flex items-center justify-center shadow-md shadow-[#5E8FBF]/20">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-poppins tracking-tight">KasaSync</span>
            </Link>

            <p className="text-xs text-[#AFC5DB] leading-relaxed font-normal">
              Smart Property Rental & Community Management Platform.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-[#23426B] border border-[#2D507C] flex items-center justify-center text-[#D6E4F2] hover:text-white hover:bg-[#2D507C] transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#23426B] border border-[#2D507C] flex items-center justify-center text-[#D6E4F2] hover:text-white hover:bg-[#2D507C] transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-lg bg-[#23426B] border border-[#2D507C] flex items-center justify-center text-[#D6E4F2] hover:text-white hover:bg-[#2D507C] transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white font-poppins tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-white transition-colors duration-200">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <a href="mailto:support@kasasync.com" className="hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white font-poppins tracking-wide">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors duration-200">
                  Property Management
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-white transition-colors duration-200">
                  Booking System
                </Link>
              </li>
              <li>
                <Link href="/maintenance" className="hover:text-white transition-colors duration-200">
                  Maintenance Requests
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-white transition-colors duration-200">
                  Community Amenities
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="hover:text-white transition-colors duration-200">
                  Notifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white font-poppins tracking-wide">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <span className="text-[#8BA7C7] cursor-not-allowed">Careers</span>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@kasasync.com" className="hover:text-white transition-colors duration-200">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white font-poppins tracking-wide">Contact</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-[#D6E4F2]">
                <Mail className="w-4 h-4 text-[#7AA7D9] shrink-0" />
                <a href="mailto:support@kasasync.com" className="hover:text-white transition-colors duration-200">
                  support@kasasync.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#D6E4F2]">
                <Globe className="w-4 h-4 text-[#7AA7D9] shrink-0" />
                <a href="https://www.kasasync.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                  www.kasasync.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-[#23426B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#AFC5DB]">
          <p>© 2026 KasaSync. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[#AFC5DB]">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms
            </Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-white transition-colors duration-200">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
