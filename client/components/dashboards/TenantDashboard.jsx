'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Building2, Wrench, CalendarCheck, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatPrice, formatDate } from '../../lib/utils';

export default function TenantDashboard({ data }) {
  const { property, maintenance, bookings } = data;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-panel rounded-2xl p-6 bg-gradient-to-r from-blue-900/40 via-slate-900/60 to-emerald-900/30 border border-blue-500/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/30 mb-3 inline-block">
              Tenant Portal
            </span>
            <h2 className="text-2xl font-black text-white">Welcome back to your Home Hub!</h2>
            <p className="text-sm text-slate-300 mt-1">
              Manage your residence, submit maintenance tickets, and reserve community amenities in real time.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/maintenance">
              <Button variant="emerald" size="sm" icon={Wrench}>
                Report Issue
              </Button>
            </Link>
            <Link href="/amenities">
              <Button variant="primary" size="sm" icon={Sparkles}>
                Book Amenity
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Rented Property Card */}
      {property ? (
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Current Residence</CardTitle>
              <CardDescription>Active rental lease details</CardDescription>
            </div>
            <Badge status="Occupied">Active Lease</Badge>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6 pt-4">
            <div className="md:col-span-1 rounded-xl overflow-hidden h-40 relative">
              <Image
                src={property.images?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'}
                alt={property.title || 'Current residence'}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-lg font-bold text-white">{property.title}</h4>
              <p className="text-xs text-slate-400">
                {property.address?.street}, {property.address?.city}, {property.address?.state} {property.address?.zipCode}
              </p>
              <div className="flex gap-6 text-xs text-slate-300 font-medium">
                <div>
                  <span className="text-slate-500 block">Monthly Rent</span>
                  <span className="text-sm font-bold text-emerald-400">{formatPrice(property.price)}/mo</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Layout</span>
                  <span className="text-sm font-semibold text-white">{property.bedrooms} Beds • {property.bathrooms} Baths</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Square Footage</span>
                  <span className="text-sm font-semibold text-white">{property.areaSqFt} sq ft</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="text-center py-8">
          <Building2 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white">No Active Lease Assigned</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Browse available properties or contact your property owner to connect your lease.
          </p>
          <Link href="/properties" className="mt-4 inline-block">
            <Button variant="outline" size="sm">Browse Available Properties</Button>
          </Link>
        </Card>
      )}

      {/* Grid: Maintenance & Bookings */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Active Maintenance Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-blue-400" />
                <span>Active Maintenance Tickets</span>
              </CardTitle>
              <CardDescription>Track resolution status</CardDescription>
            </div>
            <Link href="/maintenance" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {maintenance?.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No active maintenance requests.</p>
            ) : (
              maintenance?.slice(0, 3).map((item) => (
                <div key={item._id} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{item.title}</h5>
                    <p className="text-[11px] text-slate-400">Priority: <span className="text-amber-400 font-semibold">{item.priority}</span></p>
                  </div>
                  <Badge status={item.status} />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Amenity Reservations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-400" />
                <span>Upcoming Amenity Bookings</span>
              </CardTitle>
              <CardDescription>Your reserved timeslots</CardDescription>
            </div>
            <Link href="/bookings" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookings?.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No upcoming amenity reservations.</p>
            ) : (
              bookings?.slice(0, 3).map((b) => (
                <div key={b._id} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{b.amenityId?.name || 'Amenity Booking'}</h5>
                    <p className="text-[11px] text-slate-400">
                      {formatDate(b.bookingDate)} ({b.startTime} - {b.endTime})
                    </p>
                  </div>
                  <Badge status={b.status} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
