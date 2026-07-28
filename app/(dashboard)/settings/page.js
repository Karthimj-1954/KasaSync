'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { User, Lock, Bell, Moon, Sun, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, updateUserProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    avatar: user?.avatar || '',
  });

  const [notifications, setNotifications] = useState(
    user?.notificationPreferences || { email: true, push: true, sms: false }
  );

  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        avatar: formData.avatar,
        notificationPreferences: notifications,
      });
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white">Account & System Settings</h2>
        <p className="text-xs text-slate-400">Manage profile information, notification alerts, and theme preferences</p>
      </div>

      {/* Profile Info Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>Profile Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center gap-4 pb-2">
              <img src={formData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'} alt="Avatar" className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/40" />
              <div>
                <h4 className="text-sm font-bold text-white">{user?.name}</h4>
                <p className="text-xs text-blue-400">{user?.role}</p>
              </div>
            </div>

            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />

            <Input
              label="Avatar Image URL"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />

            <Button type="submit" variant="primary" loading={saving}>
              Save Profile Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Theme Preference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {theme === 'dark' ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span>Interface Theme Mode</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-white">Current Mode: {theme === 'dark' ? 'Dark Glassmorphism' : 'Light Mode'}</p>
            <p className="text-xs text-slate-400">Toggle between dark and light color themes</p>
          </div>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            Toggle Theme
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
