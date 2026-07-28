'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Badge from '../ui/Badge';
import { Bed, Bath, Maximize2, MapPin, Heart } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

export default function PropertyCard({ property, onFavoriteToggle, isFavorite }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden group transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col">
      {/* Cover Image & Badges */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'}
          alt={property.title || 'Property image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        <div className="absolute top-3 left-3">
          <Badge status={property.status} />
        </div>

        <button
          onClick={() => onFavoriteToggle && onFavoriteToggle(property._id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/60 backdrop-blur-md hover:bg-slate-900 text-rose-400 transition"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <span className="text-xl font-black text-emerald-400">{formatPrice(property.price)}<span className="text-xs text-slate-300 font-normal">/mo</span></span>
          <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-900/80 border border-slate-700 text-slate-300">{property.type}</span>
        </div>
      </div>

      {/* Property Specs & Location */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/properties/${property._id}`}>
            <h4 className="text-base font-bold text-white hover:text-blue-400 transition line-clamp-1">
              {property.title}
            </h4>
          </Link>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>{property.address?.street}, {property.address?.city}, {property.address?.state}</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-xs text-slate-300 font-semibold">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-blue-400" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-emerald-400" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-purple-400" />
            <span>{property.areaSqFt} sq ft</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-500">Owner: {property.ownerId?.name || 'KasaSync Host'}</span>
          <Link
            href={`/properties/${property._id}`}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 transition"
          >
            View Listing →
          </Link>
        </div>
      </div>
    </div>
  );
}
