'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Home, Mail } from 'lucide-react';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword({ email });
      setSent(true);
      toast.success('Reset link sent to your email!');
    } catch (err) {
      toast.error('Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC] text-[#425466] relative">
      <div className="w-full max-w-md bg-white rounded-[20px] p-8 border border-[#EAF3FA] shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-[#5E8FBF] flex items-center justify-center shadow-md shadow-[#5E8FBF]/20">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#183153] font-poppins">KasaSync</span>
          </Link>
          <h2 className="text-xl font-bold text-[#183153] font-poppins">Forgot Password</h2>
          <p className="text-xs font-normal text-[#60758C]">Enter your email to receive recovery instructions</p>
        </div>

        {sent ? (
          <div className="p-4 rounded-xl bg-[#2E8B57]/10 border border-[#2E8B57]/30 text-center space-y-3">
            <p className="text-xs font-bold text-[#2E8B57]">Instructions Dispatched!</p>
            <p className="text-[11px] text-[#425466]">Check your inbox for step-by-step password recovery instructions.</p>
            <Link href="/login">
              <Button variant="outline" size="sm" className="w-full mt-2">Return to Login</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Registered Email Address"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" loading={loading} className="w-full shadow-lg">
              Send Reset Instructions
            </Button>
          </form>
        )}

        <p className="text-center text-xs text-[#60758C]">
          Remember your password?{' '}
          <Link href="/login" className="text-[#3E7CB1] font-semibold hover:text-[#2B5F9E] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
