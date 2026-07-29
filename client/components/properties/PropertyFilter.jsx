'use client';

import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Search, Filter, RefreshCw } from 'lucide-react';

export default function PropertyFilter({ filters, onChange, onReset }) {
  return (
    <div className="bg-white border border-[#EAF3FA] rounded-[20px] p-4 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-[#183153] font-poppins flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#5E8FBF]" />
          <span>Filter Properties</span>
        </h4>
        <button
          onClick={onReset}
          className="text-xs text-[#6B7A90] hover:text-[#183153] flex items-center gap-1 transition font-medium cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" /> Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        <Input
          placeholder="Search location or title..."
          icon={Search}
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />

        <Select
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value })}
          options={[
            { label: 'All Property Types', value: 'All' },
            { label: 'Apartment', value: 'Apartment' },
            { label: 'Villa', value: 'Villa' },
            { label: 'Studio', value: 'Studio' },
            { label: 'Condo', value: 'Condo' },
            { label: 'Commercial', value: 'Commercial' },
          ]}
        />

        <Select
          value={filters.bedrooms}
          onChange={(e) => onChange({ ...filters, bedrooms: e.target.value })}
          options={[
            { label: 'Bedrooms (Any)', value: 'All' },
            { label: '1 Bedroom', value: '1' },
            { label: '2 Bedrooms', value: '2' },
            { label: '3 Bedrooms', value: '3' },
            { label: '4+ Bedrooms', value: '4' },
          ]}
        />

        <Select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          options={[
            { label: 'Status (All)', value: 'All' },
            { label: 'Available', value: 'Available' },
            { label: 'Occupied', value: 'Occupied' },
            { label: 'Under Maintenance', value: 'Under Maintenance' },
          ]}
        />

        <Input
          type="number"
          placeholder="Max Price (₹)"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
        />
      </div>
    </div>
  );
}
