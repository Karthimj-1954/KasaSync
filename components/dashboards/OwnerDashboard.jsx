'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Building2, Users, Wrench, DollarSign, Plus, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

export default function OwnerDashboard({ data }) {
  const { properties = [], maintenance = [], summary = {} } = data;

  return (
    <div className="space-y-6">
      {/* Portfolio Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/30 to-slate-900/60 border-blue-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Total Properties</p>
              <h3 className="text-2xl font-black text-white mt-1">{summary.totalProperties || properties.length}</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
              <Building2 className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/30 to-slate-900/60 border-emerald-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Occupancy Rate</p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">{summary.occupancyRate || 85}%</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Users className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-900/30 to-slate-900/60 border-amber-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Pending Tickets</p>
              <h3 className="text-2xl font-black text-amber-400 mt-1">{maintenance.filter((m) => m.status === 'Pending').length}</h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
              <Wrench className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-slate-900/60 border-purple-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Est. Monthly Income</p>
              <h3 className="text-2xl font-black text-purple-300 mt-1">
                {formatPrice(properties.reduce((acc, p) => acc + (p.price || 0), 0))}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
              <DollarSign className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Your Managed Properties</h3>
        <Link href="/properties/new">
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" /> Add New Property
          </Button>
        </Link>
      </div>

      {/* Properties List */}
      <div className="grid md:grid-cols-3 gap-6">
        {properties.slice(0, 3).map((property) => (
          <Card key={property._id} className="overflow-hidden p-0">
            <div className="h-44 overflow-hidden relative">
              <Image
                src={property.images?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'}
                alt={property.title || 'Property'}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute top-3 right-3 z-10">
                <Badge status={property.status} />
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="text-base font-bold text-white truncate">{property.title}</h4>
              <p className="text-xs text-slate-400 truncate">
                {property.address?.street}, {property.address?.city}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="font-bold text-emerald-400">{formatPrice(property.price)}/mo</span>
                <Link href={`/properties/${property._id}`} className="text-blue-400 hover:underline">
                  Details
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
