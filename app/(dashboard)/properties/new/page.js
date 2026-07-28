'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { propertyService } from '@/services/propertyService';
import { ArrowLeft, Building2, Plus, Upload, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewPropertyPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Apartment',
    price: '',
    bedrooms: '',
    bathrooms: '',
    areaSqFt: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800');
  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'url'
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file (PNG, JPG, WEBP)');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result);
          toast.success('Property photo selected!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrlInput.trim()) {
      setImagePreview(imageUrlInput.trim());
      toast.success('Image URL updated!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await propertyService.createProperty({
        title: formData.title,
        description: formData.description,
        type: formData.type,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        areaSqFt: Number(formData.areaSqFt),
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        images: imagePreview ? [imagePreview] : [],
      });
      toast.success('Property listing published successfully!');
      router.push('/properties');
    } catch (err) {
      toast.error('Failed to create property listing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/properties" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Back to Properties
      </Link>

      <div>
        <h2 className="text-2xl font-black text-white">Add New Property Listing</h2>
        <p className="text-xs text-slate-400">Publish a new rental unit to the KasaSync platform in INR (₹)</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Property Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Property Title"
              placeholder="e.g., The Skyline Penthouse Loft"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Property Type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                options={['Apartment', 'Villa', 'Studio', 'Condo', 'Townhouse', 'Commercial']}
              />

              <Input
                label="Monthly Rent Price (₹)"
                type="number"
                placeholder="e.g. 45000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Bedrooms"
                type="number"
                placeholder="3"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                required
              />

              <Input
                label="Bathrooms"
                type="number"
                placeholder="2"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                required
              />

              <Input
                label="Area (Sq Ft)"
                type="number"
                placeholder="1850"
                value={formData.areaSqFt}
                onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">Property Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed property highlights..."
                className="w-full glass-input rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Location Address */}
        <Card>
          <CardHeader>
            <CardTitle>Location Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Street Address"
              placeholder="123 MG Road, Suite 400"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              required
            />

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="City"
                placeholder="Bengaluru"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />

              <Input
                label="State"
                placeholder="Karnataka"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
              />

              <Input
                label="Zip / Pincode"
                placeholder="560001"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Photo Upload & Preview Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-400" />
              <span>Property Cover Photo Upload</span>
            </CardTitle>
            <div className="flex gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`px-3 py-1 rounded-lg transition ${uploadMode === 'file' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`px-3 py-1 rounded-lg transition ${uploadMode === 'url' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Paste Image URL
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadMode === 'file' ? (
              <div className="space-y-3">
                {/* File Dropzone Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/webp, image/gif"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700/80 hover:border-blue-500/60 bg-slate-900/40 hover:bg-slate-900/80 rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Click to Upload Photo File</p>
                    <p className="text-xs text-slate-400 mt-0.5">PNG, JPG, WEBP or GIF (Max 10MB)</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    Browse Computer Files
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    icon={Upload}
                    className="flex-1"
                  />
                  <Button type="button" variant="secondary" size="md" onClick={handleUrlSubmit}>
                    Set URL
                  </Button>
                </div>
              </div>
            )}

            {/* Live Photo Thumbnail Preview */}
            {imagePreview && (
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Selected Cover Photo Preview</p>
                <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-800 group">
                  <img src={imagePreview} alt="Property preview" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-xs font-semibold text-white border border-slate-700 hover:bg-slate-900 transition"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Button type="submit" variant="emerald" size="lg" loading={loading} className="w-full">
          Publish Property Listing (INR ₹)
        </Button>
      </form>
    </div>
  );
}
