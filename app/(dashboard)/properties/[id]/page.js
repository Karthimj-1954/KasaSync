'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { propertyService } from '@/services/propertyService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { FiMapPin, FiMoon, FiDroplet, FiMaximize2, FiGrid, FiMail, FiArrowLeft } from 'react-icons/fi';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function PropertyDetailPage({ params }) {
  const resolvedParams = React.use(Promise.resolve(params));
  const id = resolvedParams?.id;
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
      <div className="py-20 text-center text-[#6B7A90]">
        <div className="w-8 h-8 border-4 border-[#5E8FBF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold text-[#6B7A90] animate-pulse">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-bold text-[#183153] font-poppins">Property Not Found</h3>
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
      <Link href="/properties" className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7A90] hover:text-[#183153] transition">
        <FiArrowLeft className="w-4 h-4" /> Back to Properties
      </Link>

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-[#183153] font-poppins">{property.title}</h2>
            <Badge status={property.status} />
          </div>
          <p className="text-xs text-[#6B7A90] flex items-center gap-1 mt-1">
            <FiMapPin className="w-3.5 h-3.5 text-[#5E8FBF]" />
            <span>{property.address?.street}, {property.address?.city}, {property.address?.state} {property.address?.zipCode}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-2xl font-bold text-[#17324D] font-poppins">{formatPrice(property.price)}</span>
            <span className="text-xs text-[#6B7A90] block">per month</span>
          </div>

          {user?.role === 'Tenant' && (
            <Link href="/maintenance">
              <Button variant="primary" size="sm">
                Request Maintenance
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Image Gallery Viewer */}
      <div className="space-y-3">
        <div className="h-96 rounded-[20px] overflow-hidden bg-white border border-[#EAF3FA] shadow-sm relative">
          <Image src={activeImage || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'} alt={property.title || 'Property'} fill sizes="100vw" className="object-cover" />
        </div>

        {property.images?.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-24 h-20 rounded-xl overflow-hidden border-2 transition relative cursor-pointer ${activeImage === img ? 'border-[#5E8FBF] scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <Image src={img} alt="" fill sizes="96px" className="object-cover" />
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
                <div className="p-3 rounded-xl bg-[#EAF3FA]/50 border border-[#C7D7EA]">
                  <FiMoon className="w-5 h-5 text-[#5E8FBF] mx-auto mb-1" />
                  <span className="text-xs text-[#6B7A90] block">Bedrooms</span>
                  <span className="text-sm font-bold text-[#183153] font-poppins">{property.bedrooms} Beds</span>
                </div>

                <div className="p-3 rounded-xl bg-[#EAF3FA]/50 border border-[#C7D7EA]">
                  <FiDroplet className="w-5 h-5 text-[#2E8B57] mx-auto mb-1" />
                  <span className="text-xs text-[#6B7A90] block">Bathrooms</span>
                  <span className="text-sm font-bold text-[#183153] font-poppins">{property.bathrooms} Baths</span>
                </div>

                <div className="p-3 rounded-xl bg-[#EAF3FA]/50 border border-[#C7D7EA]">
                  <FiMaximize2 className="w-5 h-5 text-[#3E7CB1] mx-auto mb-1" />
                  <span className="text-xs text-[#6B7A90] block">Total Area</span>
                  <span className="text-sm font-bold text-[#183153] font-poppins">{property.areaSqFt} sq ft</span>
                </div>

                <div className="p-3 rounded-xl bg-[#EAF3FA]/50 border border-[#C7D7EA]">
                  <FiGrid className="w-5 h-5 text-[#C68A00] mx-auto mb-1" />
                  <span className="text-xs text-[#6B7A90] block">Property Type</span>
                  <span className="text-sm font-bold text-[#183153] font-poppins">{property.type}</span>
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
              <p className="text-xs leading-relaxed text-[#425466]">{property.description}</p>
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
                <img src={property.ownerId?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'} alt="" className="w-12 h-12 rounded-full object-cover border border-[#5E8FBF]" />
                <div>
                  <h5 className="text-sm font-bold text-[#183153] font-poppins">{property.ownerId?.name || 'Property Owner'}</h5>
                  <p className="text-xs text-[#3E7CB1] font-semibold">{property.ownerId?.email}</p>
                </div>
              </div>

              <Link href="/messages">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <FiMail className="w-4 h-4" /> Message Owner
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
