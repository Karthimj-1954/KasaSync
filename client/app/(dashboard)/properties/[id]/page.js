'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { propertyService } from '../../../../services/propertyService';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/Card';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';
import { useAuth } from '../../../../context/AuthContext';
import { MapPin, Bed, Bath, Maximize2, Building2, UserCheck, Wrench, Sparkles, Phone, Mail, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../../../../lib/utils';
import toast from 'react-hot-toast';

export default function PropertyDetailPage({ params }) {
  const { id } = use(params);
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    propertyService
      .getPropertyById(id)
      .then((data) => {
        setProperty(data.property);
        setActiveImage(data.property?.images?.[0] || '');
      })
      .catch(() => toast.error('Failed to load property details'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold">Loading listing details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-bold text-white">Property Not Found</h3>
        <Link href="/properties">
          <Button variant="outline" size="sm" className="mt-4">
            Back to Properties
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <Link href="/properties" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Back to Properties
      </Link>

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-white">{property.title}</h2>
            <Badge status={property.status} />
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{property.address?.street}, {property.address?.city}, {property.address?.state} {property.address?.zipCode}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-400">{formatPrice(property.price)}</span>
            <span className="text-xs text-slate-400 block">per month</span>
          </div>

          {user?.role === 'Tenant' && (
            <Link href="/maintenance">
              <Button variant="emerald" size="sm">
                Request Maintenance
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Image Gallery Viewer */}
      <div className="space-y-3">
        <div className="h-96 rounded-2xl overflow-hidden glass-panel">
          <img src={activeImage || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'} alt={property.title} className="w-full h-full object-cover" />
        </div>

        {property.images?.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-24 h-20 rounded-xl overflow-hidden border-2 transition ${activeImage === img ? 'border-blue-500 scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Key Specs Card */}
          <Card>
            <CardHeader>
              <CardTitle>Property Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Bed className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 block">Bedrooms</span>
                  <span className="text-sm font-bold text-white">{property.bedrooms} Beds</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Bath className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 block">Bathrooms</span>
                  <span className="text-sm font-bold text-white">{property.bathrooms} Baths</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Maximize2 className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 block">Total Area</span>
                  <span className="text-sm font-bold text-white">{property.areaSqFt} sq ft</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Building2 className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 block">Property Type</span>
                  <span className="text-sm font-bold text-white">{property.type}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs leading-relaxed text-slate-300">{property.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Contacts */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Owner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={property.ownerId?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'} alt="" className="w-12 h-12 rounded-full object-cover border border-blue-500/40" />
                <div>
                  <h5 className="text-sm font-bold text-white">{property.ownerId?.name || 'Property Owner'}</h5>
                  <p className="text-xs text-blue-400 font-semibold">{property.ownerId?.email}</p>
                </div>
              </div>

              <Link href="/messages">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Mail className="w-4 h-4" /> Message Owner
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
