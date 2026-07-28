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
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-white relative">
      <div className="w-full max-w-md glass-panel rounded-2xl p-8 border border-slate-800 shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-white">KasaSync</span>
          </Link>
          <h2 className="text-xl font-bold text-white">Forgot Password</h2>
          <p className="text-xs text-slate-400">Enter your email to receive recovery instructions</p>
        </div>

        {sent ? (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
            <p className="text-xs font-semibold text-emerald-400">Instructions Dispatched!</p>
            <p className="text-[11px] text-slate-300">Check your inbox for step-by-step password recovery instructions.</p>
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

            <Button type="submit" variant="primary" loading={loading} className="w-full">
              Send Reset Link
            </Button>
          </form>
        )}

        <p className="text-center text-xs text-slate-400">
          Remembered password?{' '}
          <Link href="/login" className="text-blue-400 font-bold hover:underline">
            Back to Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
