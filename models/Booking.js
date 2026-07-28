import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    amenityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Amenity', required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookingDate: { type: String, required: true }, // Format: YYYY-MM-DD
    startTime: { type: String, required: true }, // Format: HH:mm
    endTime: { type: String, required: true }, // Format: HH:mm
    totalGuests: { type: Number, default: 1 },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Confirmed', 'Cancelled', 'Completed'],
      default: 'Confirmed',
    },
  },
  { timestamps: true }
);

BookingSchema.index({ amenityId: 1, bookingDate: 1, status: 1 });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
