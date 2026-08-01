'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { FiHome, FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC] text-[#425466] relative">
      <div className="w-full max-w-md bg-white rounded-[20px] p-8 border border-[#EAF3FA] shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-[#5E8FBF] flex items-center justify-center shadow-md shadow-[#5E8FBF]/20">
              <FiHome className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#183153] font-poppins">KasaSync</span>
          </Link>
          <h2 className="text-xl font-bold text-[#183153] font-poppins">Create your account</h2>
          <p className="text-xs font-normal text-[#60758C]">Join KasaSync property management platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            icon={FiUser}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            icon={FiMail}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={FiLock}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <Select
            label="Account Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={['Tenant', 'Property Owner', 'Maintenance Staff', 'Admin']}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            icon={FiPhone}
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />

          <Button type="submit" variant="primary" loading={loading} className="w-full shadow-lg">
            Create Account
          </Button>
        </form>

        <p className="text-center text-xs text-[#60758C]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#3E7CB1] font-semibold hover:text-[#2B5F9E] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
