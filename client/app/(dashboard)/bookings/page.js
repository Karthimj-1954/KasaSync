'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { bookingService } from '../../../services/bookingService';
import { Card } from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { CalendarCheck, Clock, XCircle, Sparkles } from 'lucide-react';
import { formatDate } from '../../../lib/utils';
import toast from 'react-hot-toast';

export default function BookingsHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = () => {
    setLoading(true);
    bookingService
      .getBookings()
      .then((data) => setBookings(data.bookings || []))
      .catch(() => toast.error('Failed to load reservation history'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await bookingService.cancelBooking(id);
      toast.success('Reservation cancelled');
      loadBookings();
    } catch (err) {
      toast.error('Failed to cancel reservation.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3A5F] font-poppins">Amenity Reservations History</h2>
          <p className="text-xs text-[#6B7A90]">View and manage active or past amenity bookings</p>
        </div>
        <Link href="/amenities">
          <Button variant="primary" size="sm">
            <Sparkles className="w-4 h-4" /> Reserve New Amenity
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="py-16 text-center text-[#6B7A90]">
          <div className="w-8 h-8 border-4 border-[#5E8FBF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold text-[#6B7A90] animate-pulse">Loading reservation history...</p>
        </div>
      ) : bookings.length === 0 ? (
        <Card className="text-center py-12">
          <CalendarCheck className="w-12 h-12 text-[#5E8FBF] mx-auto mb-3" />
          <h4 className="text-base font-bold text-[#183153] font-poppins">No amenity reservations found</h4>
          <p className="text-xs text-[#6B7A90] mt-1">Book an amenity to view reservations here.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking._id}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold text-[#183153] font-poppins">{booking.amenityId?.name || 'Amenity Facility'}</h4>
                    <Badge status={booking.status} />
                  </div>

                  <p className="text-xs text-[#6B7A90] flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#5E8FBF]" />
                    <span>
                      Date: <strong className="text-[#1F2937]">{formatDate(booking.bookingDate)}</strong> ({booking.startTime} - {booking.endTime})
                    </span>
                  </p>
                  <p className="text-[11px] text-[#6B7A90]">Reserved by: {booking.tenantId?.name || 'Tenant'}</p>
                </div>

                {booking.status === 'Confirmed' && (
                  <Button variant="outline" size="sm" onClick={() => handleCancel(booking._id)} className="text-[#D14343] border-[#D14343]/30 hover:bg-rose-50">
                    <XCircle className="w-4 h-4" /> Cancel Reservation
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
