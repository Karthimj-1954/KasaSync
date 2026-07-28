'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { propertyService } from '@/services/propertyService';
import { ArrowLeft, Building2, Plus, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewPropertyPage() {
  const router = useRouter();
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
    images: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
  });
  const [loading, setLoading] = useState(false);

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
        images: formData.images ? [formData.images] : [],
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
        <p className="text-xs text-slate-400">Publish a new rental unit to the KasaSync platform</p>
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
                label="Monthly Rent Price ($)"
                type="number"
                placeholder="4500"
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

        <Card>
          <CardHeader>
            <CardTitle>Location Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Street Address"
              placeholder="123 Ocean Boulevard"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              required
            />

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="City"
                placeholder="Miami"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />

              <Input
                label="State"
                placeholder="FL"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
              />

              <Input
                label="Zip Code"
                placeholder="33139"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Cover Photo URL</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              label="Photo URL (Unsplash or Cloudinary)"
              placeholder="https://images.unsplash.com/..."
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              icon={Upload}
            />
          </CardContent>
        </Card>

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
          Publish Property Listing
        </Button>
      </form>
    </div>
  );
}
