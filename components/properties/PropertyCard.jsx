'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Badge from '../ui/Badge';
import { Bed, Bath, Maximize2, MapPin, Heart } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

export default function PropertyCard({ property, onFavoriteToggle, isFavorite }) {
  return (
    <div className="bg-white border border-[#EAF3FA] rounded-[20px] overflow-hidden group transition-all duration-250 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#183153]/05 hover:border-[#C7D7EA] flex flex-col">
      {/* Cover Image & Badges */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'}
          alt={property.title || 'Property image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3">
          <Badge status={property.status} />
        </div>

        <button
          onClick={() => onFavoriteToggle && onFavoriteToggle(property._id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-[#5E8FBF] hover:text-[#183153] shadow-md transition cursor-pointer"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#5E8FBF] text-[#5E8FBF]' : ''}`} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[#183153]">
          <span className="text-xs px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#C7D7EA] font-semibold text-[#183153] shadow-sm">
            {property.type}
          </span>
        </div>
      </div>

      {/* Property Specs & Location */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <Link href={`/properties/${property._id}`}>
              <h4 className="text-lg font-bold text-[#183153] hover:text-[#2B5F9E] transition line-clamp-1 font-poppins">
                {property.title}
              </h4>
            </Link>
          </div>
          <p className="text-xs text-[#60758C] flex items-center gap-1.5 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-[#5E8FBF] shrink-0" />
            <span>{property.address?.street}, {property.address?.city}, {property.address?.state}</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-[#EAF3FA] text-xs text-[#4A5F77] font-medium">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#5E8FBF]" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#5E8FBF]" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-[#5E8FBF]" />
            <span>{property.areaSqFt} sq ft</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-lg font-bold text-[#17324D] font-poppins">{formatPrice(property.price)}</span>
            <span className="text-xs text-[#6B7A90] block">/ month</span>
          </div>

          <Link href={`/properties/${property._id}`}>
            <span className="text-xs font-semibold text-[#3E7CB1] hover:text-[#2B5F9E] hover:underline flex items-center gap-1 transition">
              View Details &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
