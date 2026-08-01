'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { FiHome, FiUsers, FiTool, FiDollarSign, FiPlus } from 'react-icons/fi';
import { formatPrice } from '../../lib/utils';

export default function OwnerDashboard({ data }) {
  const { properties = [], maintenance = [], summary = {} } = data;

  return (
    <div className="space-y-6">
      {/* Portfolio Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#B4E1EB]/30 border-[#95BDD7]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#5A6E7C] font-bold uppercase tracking-wider">Total Properties</p>
              <h3 className="text-2xl font-black text-[#24425C] font-poppins mt-1">{summary.totalProperties || properties.length}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#78A4CB] shadow-sm">
              <FiHome className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#95BDD7]/30 border-[#78A4CB]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#5A6E7C] font-bold uppercase tracking-wider">Occupancy Rate</p>
              <h3 className="text-2xl font-black text-[#24425C] font-poppins mt-1">{summary.occupancyRate || 85}%</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#78A4CB] shadow-sm">
              <FiUsers className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F9E8A2]/60 border-[#E7D688]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#5A6E7C] font-bold uppercase tracking-wider">Pending Tickets</p>
              <h3 className="text-2xl font-black text-[#24425C] font-poppins mt-1">{maintenance.filter((m) => m.status === 'Pending').length}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#78A4CB] shadow-sm">
              <FiTool className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#B4E1EB]/30 border-[#95BDD7]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#5A6E7C] font-bold uppercase tracking-wider">Est. Monthly Income</p>
              <h3 className="text-xl font-black text-[#24425C] font-poppins mt-1">
                {formatPrice(properties.reduce((acc, p) => acc + (p.price || 0), 0))}
              </h3>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#78A4CB] shadow-sm">
              <FiDollarSign className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property List Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Managed Real Estate Portfolio</CardTitle>
            <CardDescription>All rental units owned and managed</CardDescription>
          </div>
          <Link href="/properties/new">
            <Button variant="primary" size="sm">
              <FiPlus className="w-4 h-4" /> Add Property
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {properties.length === 0 ? (
            <p className="text-xs text-[#6F8190] text-center py-8">No properties added yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {properties.slice(0, 4).map((p) => (
                <div key={p._id} className="p-4 rounded-2xl bg-white border border-[#E7EEF4] hover:border-[#95BDD7] hover:-translate-y-1 transition duration-200 shadow-sm flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0 border border-[#E7EEF4]">
                    <Image src={p.images?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'} alt={p.title} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="overflow-hidden flex-1 space-y-1">
                    <h4 className="text-sm font-bold text-[#24425C] truncate font-poppins">{p.title}</h4>
                    <p className="text-[11px] text-[#6F8190] truncate">{p.address?.city}, {p.address?.state}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-bold text-[#24425C]">{formatPrice(p.price)}/mo</span>
                      <Badge status={p.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
