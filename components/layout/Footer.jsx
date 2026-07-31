'use client';

import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#183153] text-[#D6E4F2] pt-16 pb-8 px-6 border-t border-[#23426B]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Grid: Brand Info + 3 Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
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
