'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Home, User, Mail, Lock, Phone } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Tenant',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      router.push('/dashboard');
    } catch (err) {
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
          <h2 className="text-xl font-bold text-white">Create your account</h2>
          <p className="text-xs text-slate-400">Join KasaSync property management platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            icon={User}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            icon={Mail}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            icon={Phone}
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />

          <Select
            label="Select Account Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { label: 'Tenant', value: 'Tenant' },
              { label: 'Property Owner', value: 'Property Owner' },
              { label: 'Maintenance Staff', value: 'Maintenance Staff' },
              { label: 'Admin', value: 'Admin' },
            ]}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Minimum 6 characters"
            icon={Lock}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <Button type="submit" variant="emerald" loading={loading} className="w-full">
            Register Account
          </Button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Already registered?{' '}
          <Link href="/login" className="text-blue-400 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
