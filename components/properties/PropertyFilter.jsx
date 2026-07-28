'use client';

import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Search, Filter, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';

export default function PropertyFilter({ filters, onChange, onReset }) {
  return (
    <div className="glass-panel rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-400" />
          <span>Filter Properties</span>
        </h4>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
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
            { label: 'Status (Any)', value: 'All' },
            { label: 'Available', value: 'Available' },
            { label: 'Occupied', value: 'Occupied' },
            { label: 'Under Maintenance', value: 'Under Maintenance' },
          ]}
        />

        <Input
          type="number"
          placeholder="Max price ($)"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
        />
      </div>
    </div>
  );
}
