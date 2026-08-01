'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { FiHome, FiArrowRight, FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href;
  };

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-[#FFF7D6] backdrop-blur-md border-b border-[#C7D7EA] px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Branding (Left) */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-[#5E8FBF] flex items-center justify-center shadow-md shadow-[#5E8FBF]/20">
            <FiHome className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#183153] font-poppins">KasaSync</h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#3E7CB1]">Smart Property Sync</p>
          </div>
        </Link>

        {/* Centered Navigation Menu (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-poppins font-medium text-[16px]">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 ease-in-out group ${
                  active
                    ? 'text-[#183153] font-semibold'
                    : 'text-[#425466] hover:text-[#2B5F9E]'
                }`}
              >
                <span>{link.name}</span>
                {/* Active Underline Indicator */}
                {active ? (
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#183153] rounded-full" />
                ) : (
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#2B5F9E] rounded-full transition-all duration-200 ease-in-out group-hover:w-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Auth Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link href="/login">
            <Button variant="outline" size="sm">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              Get Started <FiArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 text-[#183153] hover:bg-[#EAF3FA] rounded-xl transition"
        >
          {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#C7D7EA] mt-4 pt-4 pb-2 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 font-poppins font-medium text-[16px] px-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-xl transition ${
                    active
                      ? 'bg-[#EAF3FA] text-[#183153] font-semibold border-l-4 border-[#183153]'
                      : 'text-[#425466] hover:text-[#2B5F9E] hover:bg-[#EAF3FA]/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-2 pt-3 border-t border-[#C7D7EA]/60 px-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full justify-center">
                Sign In
              </Button>
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="sm" className="w-full justify-center">
                Get Started <FiArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
