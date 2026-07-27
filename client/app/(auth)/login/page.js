'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Home, Mail, Lock, ShieldCheck, UserCheck, Wrench, Building2 } from 'lucide-react';

export default function LoginPage() {
  const router = Router = useRouter();
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-white relative">
      <div className="w-full max-w-md glass-panel rounded-2xl p-8 border border-slate-800 shadow-2xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-white">KasaSync</span>
          </Link>
          <h2 className="text-xl font-bold text-white">Welcome back</h2>
          <p className="text-xs text-slate-400">Sign in to your KasaSync property portal</p>
        </div>

        {/* Quick Demo Login Presets */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">1-Click Quick Demo Login</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('admin@kasasync.com')}
              className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-left transition flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white">Admin</p>
                <p className="text-[10px] text-slate-400 truncate">admin@kasasync.com</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin('owner@kasasync.com')}
              className="p-2.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/30 text-left transition flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white">Owner</p>
                <p className="text-[10px] text-slate-400 truncate">owner@kasasync.com</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin('tenant@kasasync.com')}
              className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-left transition flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white">Tenant</p>
                <p className="text-[10px] text-slate-400 truncate">tenant@kasasync.com</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin('staff@kasasync.com')}
              className="p-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-left transition flex items-center gap-2"
            >
              <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white">Staff</p>
                <p className="text-[10px] text-slate-400 truncate">staff@kasasync.com</p>
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
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-900" />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-blue-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" loading={loading} className="w-full">
            Sign In to Account
          </Button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-400 font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
