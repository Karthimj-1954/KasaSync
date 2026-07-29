'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Home, Mail, Lock, ShieldCheck, UserCheck, Wrench, Building2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setLoading(false);
    }
  };

  const handleQuickLogin = (roleEmail) => {
    setEmail(roleEmail);
    setPassword('Password123!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F9E8A2] text-[#4F6475] relative">
      <div className="w-full max-w-md bg-white rounded-[20px] p-8 border border-[#E7EEF4] shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-[#78A4CB] flex items-center justify-center shadow-md shadow-[#78A4CB]/20">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-[#24425C] font-poppins">KasaSync</span>
          </Link>
          <h2 className="text-xl font-bold text-[#24425C] font-poppins">Welcome back</h2>
          <p className="text-xs text-[#6F8190]">Sign in to your KasaSync property portal</p>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#5A6E7C] text-center">1-Click Quick Demo Login</p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleQuickLogin('admin@kasasync.com')}
              className="p-3 rounded-2xl bg-[#B4E1EB]/30 hover:bg-[#B4E1EB]/60 border border-[#95BDD7] text-left transition flex items-center gap-2.5 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[#24425C] shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#24425C]">Admin</p>
                <p className="text-[10px] text-[#4F6475] truncate">admin@kasasync.com</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin('owner@kasasync.com')}
              className="p-3 rounded-2xl bg-[#95BDD7]/30 hover:bg-[#95BDD7]/60 border border-[#78A4CB] text-left transition flex items-center gap-2.5 shadow-sm"
            >
              <Building2 className="w-4 h-4 text-[#24425C] shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#24425C]">Owner</p>
                <p className="text-[10px] text-[#4F6475] truncate">owner@kasasync.com</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin('tenant@kasasync.com')}
              className="p-3 rounded-2xl bg-[#B4E1EB]/30 hover:bg-[#B4E1EB]/60 border border-[#95BDD7] text-left transition flex items-center gap-2.5 shadow-sm"
            >
              <UserCheck className="w-4 h-4 text-[#24425C] shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#24425C]">Tenant</p>
                <p className="text-[10px] text-[#4F6475] truncate">tenant@kasasync.com</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin('staff@kasasync.com')}
              className="p-3 rounded-2xl bg-[#95BDD7]/30 hover:bg-[#95BDD7]/60 border border-[#78A4CB] text-left transition flex items-center gap-2.5 shadow-sm"
            >
              <Wrench className="w-4 h-4 text-[#24425C] shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#24425C]">Staff</p>
                <p className="text-[10px] text-[#4F6475] truncate">staff@kasasync.com</p>
              </div>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-[#5A6E7C] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-[#95BDD7] text-[#78A4CB] focus:ring-[#78A4CB]" />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-[#3F7AA5] hover:text-[#24425C] font-semibold">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" loading={loading} className="w-full shadow-lg">
            Sign In to Account
          </Button>
        </form>

        <p className="text-center text-xs text-[#6F8190]">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#3F7AA5] font-bold hover:text-[#24425C]">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
