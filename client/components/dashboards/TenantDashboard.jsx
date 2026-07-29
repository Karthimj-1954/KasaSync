'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Building2, Wrench, CalendarCheck, Sparkles, ArrowRight } from 'lucide-react';
import { formatPrice, formatDate } from '../../lib/utils';

export default function TenantDashboard({ data }) {
  const { property, maintenance, bookings } = data;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#B4E1EB] via-[#95BDD7]/40 to-[#F9E8A2] rounded-[20px] p-6 border border-[#95BDD7] shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[#24425C] text-xs font-bold border border-[#95BDD7] mb-3 inline-block shadow-sm">
              Tenant Portal
            </span>
            <h2 className="text-2xl font-black text-[#24425C] font-poppins">Welcome back to your Home Hub!</h2>
            <p className="text-xs text-[#365E7C] mt-1 font-medium">
              Manage your residence, submit maintenance tickets, and reserve community amenities in real time.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/maintenance">
              <Button variant="secondary" size="sm">
                <Wrench className="w-4 h-4" /> Report Issue
              </Button>
            </Link>
            <Link href="/amenities">
              <Button variant="primary" size="sm">
                <Sparkles className="w-4 h-4" /> Book Amenity
              </Button>
            </Link>
          </div>
        </div>
      </div>

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
            <div className="md:col-span-1 rounded-[18px] overflow-hidden h-40 relative border border-[#E7EEF4]">
              <Image
                src={property.images?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'}
                alt={property.title || 'Current residence'}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-2 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-[#24425C] font-poppins">{property.title}</h4>
                <p className="text-xs text-[#6F8190] mt-1">
                  {property.address?.street}, {property.address?.city}, {property.address?.state}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#F5FBFD] border border-[#E7EEF4] text-xs">
                <div>
                  <span className="text-[10px] text-[#6F8190] block uppercase font-bold">Monthly Rent</span>
                  <span className="font-bold text-[#24425C] font-poppins">{formatPrice(property.price)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6F8190] block uppercase font-bold">Bedrooms</span>
                  <span className="font-bold text-[#24425C] font-poppins">{property.bedrooms} Beds</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6F8190] block uppercase font-bold">Bathrooms</span>
                  <span className="font-bold text-[#24425C] font-poppins">{property.bathrooms} Baths</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Maintenance Tickets</CardTitle>
              <CardDescription>Status of reported work orders</CardDescription>
            </div>
            <Link href="/maintenance">
              <Button variant="ghost" size="sm">View All &rarr;</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {maintenance.length === 0 ? (
              <p className="text-xs text-[#6F8190] text-center py-6">No active maintenance requests.</p>
            ) : (
              maintenance.slice(0, 3).map((item) => (
                <div key={item._id} className="p-3 rounded-xl bg-[#F5FBFD] border border-[#E7EEF4] flex items-center justify-between text-xs hover:border-[#95BDD7] transition">
                  <div>
                    <p className="font-bold text-[#24425C] font-poppins">{item.title}</p>
                    <p className="text-[11px] text-[#6F8190]">{formatDate(item.createdAt)}</p>
                  </div>
                  <Badge status={item.status} />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Amenity Reservations</CardTitle>
              <CardDescription>Upcoming booked slots</CardDescription>
            </div>
            <Link href="/amenities">
              <Button variant="ghost" size="sm">Book New &rarr;</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookings.length === 0 ? (
              <p className="text-xs text-[#6F8190] text-center py-6">No upcoming amenity bookings.</p>
            ) : (
              bookings.slice(0, 3).map((b) => (
                <div key={b._id} className="p-3 rounded-xl bg-[#F5FBFD] border border-[#E7EEF4] flex items-center justify-between text-xs hover:border-[#95BDD7] transition">
                  <div>
                    <p className="font-bold text-[#24425C] font-poppins">{b.amenityId?.name || 'Amenity Booking'}</p>
                    <p className="text-[11px] text-[#6F8190]">{b.bookingDate} • {b.startTime} - {b.endTime}</p>
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
