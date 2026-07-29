'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { User, Upload, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, updateUserProfile } = useAuth();
  const avatarInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  });

  const [notifications] = useState(
    user?.notificationPreferences || { email: true, push: true, sms: false }
  );

  const [saving, setSaving] = useState(false);

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file (PNG, JPG, WEBP)');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({ ...prev, avatar: event.target.result }));
          toast.success('Avatar photo updated!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
        <h2 className="text-2xl font-bold text-[#1F3A5F] font-poppins">Account & System Settings</h2>
        <p className="text-xs text-[#6B7A90]">Manage profile information and notification preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#5E8FBF]" />
            <span>Profile & Avatar Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-[20px] bg-[#EAF3FA]/50 border border-[#C7D7EA]">
              <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                <img
                  src={formData.avatar}
                  alt="Profile Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#5E8FBF] shadow-md group-hover:opacity-80 transition"
                />
                <div className="absolute inset-0 rounded-full bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <h4 className="text-sm font-bold text-[#183153] font-poppins">Profile Photo File Upload</h4>
                <p className="text-xs text-[#6B7A90]">Upload a new avatar picture directly from your computer or phone</p>

                <input
                  type="file"
                  ref={avatarInputRef}
                  onChange={handleAvatarFileChange}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" /> Upload Avatar File
                  </Button>
                  <span className="text-[11px] text-[#6B7A90]">PNG, JPG or WEBP (Max 5MB)</span>
                </div>
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

            <Button type="submit" variant="primary" loading={saving}>
              Save Profile Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
