'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
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
              <img src={formData.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/40" />
              <div className="flex-1">
                <Input
                  label="Avatar Image URL"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                />
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

            <Button type="submit" variant="primary" loading={saving} size="sm">
              Save Profile Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Notification Channels</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer">
            <span className="text-xs font-semibold text-white">Email Digest Alerts</span>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-blue-600"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer">
            <span className="text-xs font-semibold text-white">Real-Time Push Notifications</span>
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-blue-600"
            />
          </label>
        </CardContent>
      </Card>

      {/* Theme & Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            <span>Appearance & Language</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-white">Active Theme Mode</p>
            <p className="text-[11px] text-slate-400">Current mode: <strong className="text-blue-400 capitalize">{theme}</strong></p>
          </div>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            <span>Toggle Theme</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
