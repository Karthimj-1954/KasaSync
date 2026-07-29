'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { amenityService } from '../../../services/amenityService';
import { Card } from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { Sparkles, CalendarCheck, Clock, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AmenitiesPage() {
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
          <h2 className="text-2xl font-bold text-[#1F3A5F] font-poppins">Community Amenities & Facilities</h2>
          <p className="text-xs text-[#6B7A90]">Reserve high-end residential amenities with zero scheduling conflicts</p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#5E8FBF] text-white shadow-md shadow-[#5E8FBF]/20'
                : 'bg-white border border-[#C7D7EA] text-[#425466] hover:bg-[#EAF3FA] hover:text-[#183153]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Amenity Grid */}
      {loading ? (
        <div className="py-16 text-center text-[#6B7A90]">
          <div className="w-8 h-8 border-4 border-[#5E8FBF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold">Loading amenity catalog...</p>
        </div>
      ) : amenities.length === 0 ? (
        <Card className="text-center py-12">
          <Sparkles className="w-12 h-12 text-[#5E8FBF] mx-auto mb-3" />
          <h4 className="text-base font-bold text-[#183153] font-poppins">No amenities found in this category</h4>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {amenities.map((amenity) => (
            <Card key={amenity._id} className="overflow-hidden p-0 group flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={amenity.images?.[0] || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'}
                    alt={amenity.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge status="Available">{amenity.category}</Badge>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="text-base font-bold text-[#183153] font-poppins line-clamp-1">{amenity.name}</h4>
                  <p className="text-xs text-[#60758C] line-clamp-2">{amenity.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#EAF3FA] text-xs text-[#425466]">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#5E8FBF]" />
                      {amenity.openingTime} - {amenity.closingTime}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#2E8B57]">
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
