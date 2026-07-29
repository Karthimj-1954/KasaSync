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
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC] text-[#425466] relative">
      <div className="w-full max-w-md bg-white rounded-[20px] p-8 border border-[#EAF3FA] shadow-2xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-[#5E8FBF] flex items-center justify-center shadow-md shadow-[#5E8FBF]/20">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#183153] font-poppins">KasaSync</span>
          </Link>
          <h2 className="text-xl font-bold text-[#183153] font-poppins">Welcome back</h2>
          <p className="text-xs font-normal text-[#60758C]">Sign in to your KasaSync property portal</p>
        </div>

        {/* Quick Demo Login Presets */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#34495E] text-center">1-Click Quick Demo Login</p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleQuickLogin('admin@kasasync.com')}
              className="p-3 rounded-2xl bg-[#EAF3FA] hover:bg-[#C7DDF3] border border-[#C7D7EA] text-left transition flex items-center gap-2.5 shadow-sm cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#183153] shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#183153]">Admin</p>
                <p className="text-[10px] text-[#425466] truncate">admin@kasasync.com</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin('owner@kasasync.com')}
              className="p-3 rounded-2xl bg-[#EAF3FA] hover:bg-[#C7DDF3] border border-[#C7D7EA] text-left transition flex items-center gap-2.5 shadow-sm cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-[#183153] shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#183153]">Owner</p>
                <p className="text-[10px] text-[#425466] truncate">owner@kasasync.com</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin('tenant@kasasync.com')}
              className="p-3 rounded-2xl bg-[#EAF3FA] hover:bg-[#C7DDF3] border border-[#C7D7EA] text-left transition flex items-center gap-2.5 shadow-sm cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#183153] shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#183153]">Tenant</p>
                <p className="text-[10px] text-[#425466] truncate">tenant@kasasync.com</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin('staff@kasasync.com')}
              className="p-3 rounded-2xl bg-[#EAF3FA] hover:bg-[#C7DDF3] border border-[#C7D7EA] text-left transition flex items-center gap-2.5 shadow-sm cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-[#183153] shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#183153]">Staff</p>
                <p className="text-[10px] text-[#425466] truncate">staff@kasasync.com</p>
              </div>
            </button>
          </div>
        </div>

        {/* Login Form */}
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
            <label className="flex items-center gap-2 text-[#34495E] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-[#C7D7EA] text-[#5E8FBF] focus:ring-[#7AA7D9]" />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-[#3E7CB1] hover:text-[#2B5F9E] font-semibold hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" loading={loading} className="w-full shadow-lg">
            Sign In to Account
          </Button>
        </form>

        <p className="text-center text-xs text-[#60758C]">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#3E7CB1] font-semibold hover:text-[#2B5F9E] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
