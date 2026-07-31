'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { amenityService } from '@/services/amenityService';
import { bookingService } from '@/services/bookingService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { ArrowLeft, Clock, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookAmenityPage({ params }) {
  const resolvedParams = React.use(Promise.resolve(params));
  const id = resolvedParams?.id;
  const router = useRouter();
  const [amenity, setAmenity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('2026-07-28');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('12:00');
  const [totalGuests, setTotalGuests] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [conflictWarning, setConflictWarning] = useState(null);

  useEffect(() => {
    amenityService
      .getAmenityById(id)
      .then((data) => setAmenity(data.amenity))
      .catch(() => toast.error('Failed to load amenity info'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (id && bookingDate) {
      bookingService
        .checkAvailability(id, bookingDate)
        .then((res) => {
          const bookedSlots = res.bookedSlots || [];
          if (bookedSlots.length > 0) {
            setConflictWarning(`Note: ${bookedSlots.length} slot(s) already reserved on this date.`);
          } else {
            setConflictWarning(null);
          }
        })
        .catch(() => {});
    }
  }, [id, bookingDate]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await bookingService.createBooking({
        amenityId: id,
        bookingDate,
        startTime,
        endTime,
        totalGuests: Number(totalGuests),
      });

      toast.success('Amenity reservation confirmed!');
      router.push('/bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking conflict: Slot unavailable.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-[#6B7A90]">
        <div className="w-8 h-8 border-4 border-[#5E8FBF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold text-[#6B7A90] animate-pulse">Loading reservation details...</p>
      </div>
    );
  }

  if (!amenity) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-bold text-[#183153] font-poppins">Amenity Not Found</h3>
        <Link href="/amenities">
          <Button variant="outline" size="sm" className="mt-4">
            Back to Amenities
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/amenities" className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7A90] hover:text-[#183153] transition">
        <ArrowLeft className="w-4 h-4" /> Back to Amenities
      </Link>

      <div>
        <h2 className="text-2xl font-bold text-[#183153] font-poppins">Reserve {amenity.name}</h2>
        <p className="text-xs text-[#6B7A90]">Conflict-free time slot reservation engine</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 p-0 overflow-hidden">
          <div className="h-44">
            <img src={amenity.images?.[0] || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="p-4 space-y-2">
            <Badge status="Available">{amenity.category}</Badge>
            <h4 className="text-sm font-bold text-[#183153] font-poppins">{amenity.name}</h4>
            <p className="text-xs text-[#60758C]">{amenity.description}</p>
            <div className="pt-2 border-t border-[#EAF3FA] text-xs text-[#425466]">
              <p className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#5E8FBF]" />
                Hours: {amenity.openingTime} - {amenity.closingTime}
              </p>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Select Date & Time</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <Input
                label="Reservation Date"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Check-in Time (HH:mm)"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />

                <Input
                  label="Check-out Time (HH:mm)"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Total Guests"
                type="number"
                min={1}
                max={amenity.capacity}
                value={totalGuests}
                onChange={(e) => setTotalGuests(e.target.value)}
                required
              />

              {conflictWarning && (
                <div className="p-3 rounded-xl bg-[#C68A00]/10 border border-[#C68A00]/30 text-xs text-[#C68A00] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{conflictWarning}</span>
                </div>
              )}

              <Button type="submit" variant="primary" loading={submitting} className="w-full">
                Confirm Reservation
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
