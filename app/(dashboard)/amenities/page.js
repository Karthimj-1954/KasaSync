'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { amenityService } from '@/services/amenityService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, CalendarCheck, Clock, Users, ShieldCheck, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AmenitiesPage() {
  const { user } = useAuth();
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Gym',
    'Swimming Pool',
    'Club House',
    'Meeting Room',
    'Parking',
    'Tennis Court',
    'Party Hall',
    'Garden',
    'Children Play Area',
  ];

  const fetchAmenities = () => {
    setLoading(true);
    amenityService
      .getAmenities({ category: selectedCategory })
      .then((data) => setAmenities(data.amenities || []))
      .catch(() => toast.error('Failed to load amenities'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAmenities();
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Community Amenities & Facilities</h2>
          <p className="text-xs text-slate-400">Reserve high-end residential amenities with zero scheduling conflicts</p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Amenity Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold">Loading amenity catalog...</p>
        </div>
      ) : amenities.length === 0 ? (
        <Card className="text-center py-12">
          <Sparkles className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white">No amenities found in this category</h4>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {amenities.map((amenity) => (
            <Card key={amenity._id} className="overflow-hidden p-0 group flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative">
                  <Image
                    src={amenity.images?.[0] || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'}
                    alt={amenity.name || 'Amenity'}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <Badge status="Available">{amenity.category}</Badge>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="text-base font-bold text-white line-clamp-1">{amenity.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{amenity.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {amenity.openingTime} - {amenity.closingTime}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-400">
                      <Users className="w-3.5 h-3.5" /> Max {amenity.capacity} Guests
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link href={`/amenities/book/${amenity._id}`}>
                  <Button variant="primary" size="sm" className="w-full">
                    <CalendarCheck className="w-4 h-4" /> Reserve Amenity
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
