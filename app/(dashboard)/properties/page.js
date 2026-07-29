'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilter from '@/components/properties/PropertyFilter';
import Button from '@/components/ui/Button';
import { propertyService } from '@/services/propertyService';
import { useAuth } from '@/context/AuthContext';
import { Plus, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PropertiesPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    bedrooms: 'All',
    status: 'All',
    maxPrice: '',
  });

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await propertyService.getProperties(filters);
      setProperties(data.properties || []);
    } catch (err) {
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const handleFavoriteToggle = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
    toast.success('Favorites updated');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3A5F] font-poppins">Property Management</h2>
          <p className="text-xs text-[#6B7A90]">Browse available rentals, manage listings, and inspect property status</p>
        </div>
        {(user?.role === 'Property Owner' || user?.role === 'Admin') && (
          <Link href="/properties/new">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" /> Add New Property
            </Button>
          </Link>
        )}
      </div>

      {/* Filter Component */}
      <PropertyFilter
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters({ search: '', type: 'All', bedrooms: 'All', status: 'All', maxPrice: '' })}
      />

      {/* Property Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-[#6B7A90]">
          <div className="w-8 h-8 border-4 border-[#5E8FBF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold">Fetching property catalog...</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white border border-[#EAF3FA] text-center py-12 rounded-[20px] shadow-sm">
          <Building2 className="w-12 h-12 text-[#5E8FBF] mx-auto mb-3" />
          <h4 className="text-base font-bold text-[#183153] font-poppins">No properties match your filter</h4>
          <p className="text-xs text-[#6B7A90] mt-1">Try resetting filters or adjusting search queries.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              isFavorite={favorites.includes(property._id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
