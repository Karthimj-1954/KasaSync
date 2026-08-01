'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { propertyService } from '@/services/propertyService';
import { FiArrowLeft, FiUpload, FiImage } from 'react-icons/fi';
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
      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        areaSqFt: Number(formData.areaSqFt),
        images: [imagePreview],
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      };

      await propertyService.createProperty(payload);
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
      <Link href="/properties" className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7A90] hover:text-[#183153] transition">
        <FiArrowLeft className="w-4 h-4" /> Back to Properties
      </Link>

      <div>
        <h2 className="text-2xl font-bold text-[#1F3A5F] font-poppins">Add New Property Listing</h2>
        <p className="text-xs text-[#6B7A90]">Publish a new rental unit to the KasaSync platform in INR (₹)</p>
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
                options={['Apartment', 'Villa', 'Studio', 'Condo', 'Commercial']}
              />

              <Input
                label="Monthly Rent (₹ INR)"
                type="number"
                placeholder="25000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Property Specifications</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
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
              placeholder="1450"
              value={formData.areaSqFt}
              onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
              required
            />
          </CardContent>
        </Card>

        {/* Location Info */}
        <Card>
          <CardHeader>
            <CardTitle>Location & Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Street Address"
              placeholder="122 Financial District Avenue"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              required
            />

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="City"
                placeholder="Hyderabad"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
              <Input
                label="State"
                placeholder="Telangana"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
              />
              <Input
                label="Zip Code"
                placeholder="500032"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Property Photo File Upload Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Property Cover Photo Upload</CardTitle>
              <div className="flex bg-[#EAF3FA] p-1 rounded-xl gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${uploadMode === 'file' ? 'bg-[#5E8FBF] text-white shadow-sm' : 'text-[#6B7A90] hover:text-[#183153]'}`}
                >
                  File Upload
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${uploadMode === 'url' ? 'bg-[#5E8FBF] text-white shadow-sm' : 'text-[#6B7A90] hover:text-[#183153]'}`}
                >
                  Image URL
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadMode === 'file' ? (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#C7D7EA] hover:border-[#5E8FBF] bg-[#EAF3FA]/30 rounded-[20px] p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#C7D7EA] flex items-center justify-center text-[#5E8FBF] shadow-sm group-hover:scale-105 transition">
                    <FiUpload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#183153] font-poppins">Click to Upload Photo File</p>
                    <p className="text-xs text-[#6B7A90] mt-0.5">Supports PNG, JPG, JPEG, WEBP files up to 10MB</p>
                  </div>
                  <Button type="button" variant="secondary" size="sm" className="mt-2">
                    Browse File System
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  icon={FiImage}
                />
                <Button type="button" variant="secondary" onClick={handleUrlSubmit}>
                  Apply URL
                </Button>
              </div>
            )}

            {/* Photo Preview Container */}
            {imagePreview && (
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#34495E]">Selected Photo Preview</label>
                <div className="h-56 rounded-[20px] overflow-hidden border border-[#C7D7EA] relative shadow-sm">
                  <img src={imagePreview} alt="Property cover" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#34495E]">Property Description</label>
              <textarea
                rows={4}
                placeholder="Detailed features, nearby landmarks, lease requirements..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white border-1.5 border-[#C7D7EA] text-[#1F2937] placeholder-[#94A3B8] rounded-[12px] text-xs font-normal p-3 transition focus:outline-none focus:border-[#7AA7D9] focus:ring-4 focus:ring-[#7AA7D9]/20"
                required
              />
            </div>

            <Button type="submit" variant="primary" loading={loading} className="w-full shadow-lg">
              Publish Property Listing (₹ INR)
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
