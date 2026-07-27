const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    amenityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Amenity',
      required: true,
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    bookingDate: {
      type: String, // Format: YYYY-MM-DD
      required: true,
    },
    startTime: {
      type: String, // Format: HH:mm (e.g., '10:00')
      required: true,
    },
    endTime: {
      type: String, // Format: HH:mm (e.g., '12:00')
      required: true,
    },
    totalGuests: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Cancelled', 'Completed'],
      default: 'Confirmed',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for superfast conflict checks
BookingSchema.index({ amenityId: 1, bookingDate: 1, status: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
