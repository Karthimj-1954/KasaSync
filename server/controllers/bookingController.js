const Booking = require('../models/Booking');
const Amenity = require('../models/Amenity');
const Notification = require('../models/Notification');
const ActivityLog = require('../models/ActivityLog');

// Helper to convert 'HH:mm' to total minutes for exact arithmetic comparison
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// @desc    Get user or all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === 'Tenant') {
      query.tenantId = req.user.id;
    }

    const bookings = await Booking.find(query)
      .populate('amenityId')
      .populate('tenantId', 'name email avatar')
      .sort({ bookingDate: -1, startTime: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check availability for a specific amenity & date
// @route   GET /api/bookings/check-availability
// @access  Public
exports.checkAvailability = async (req, res, next) => {
  try {
    const { amenityId, bookingDate } = req.query;

    if (!amenityId || !bookingDate) {
      return res.status(400).json({ success: false, message: 'Please provide amenityId and bookingDate' });
    }

    const existingBookings = await Booking.find({
      amenityId,
      bookingDate,
      status: 'Confirmed',
    }).select('startTime endTime totalGuests');

    res.json({
      success: true,
      bookedSlots: existingBookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create conflict-free booking
// @route   POST /api/bookings
// @access  Private (Tenant)
exports.createBooking = async (req, res, next) => {
  try {
    const { amenityId, bookingDate, startTime, endTime, totalGuests, propertyId, notes } = req.body;

    if (!amenityId || !bookingDate || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: 'Please fill all required booking fields' });
    }

    const amenity = await Amenity.findById(amenityId);
    if (!amenity) {
      return res.status(404).json({ success: false, message: 'Amenity not found' });
    }

    if (!amenity.isActive) {
      return res.status(400).json({ success: false, message: 'This amenity is currently unavailable for booking' });
    }

    const newStartMins = timeToMinutes(startTime);
    const newEndMins = timeToMinutes(endTime);

    if (newStartMins >= newEndMins) {
      return res.status(400).json({ success: false, message: 'Check-out time must be after check-in time' });
    }

    // Operating hours check
    const openMins = timeToMinutes(amenity.openingTime || '06:00');
    const closeMins = timeToMinutes(amenity.closingTime || '22:00');

    if (newStartMins < openMins || newEndMins > closeMins) {
      return res.status(400).json({
        success: false,
        message: `Booking must be within operating hours (${amenity.openingTime} - ${amenity.closingTime})`,
      });
    }

    // CONFLICT DETECTION LOGIC:
    // Overlap occurs if (existingStart < newEnd && existingEnd > newStart)
    const existingBookings = await Booking.find({
      amenityId,
      bookingDate,
      status: 'Confirmed',
    });

    const hasConflict = existingBookings.some((b) => {
      const bStartMins = timeToMinutes(b.startTime);
      const bEndMins = timeToMinutes(b.endTime);
      return bStartMins < newEndMins && bEndMins > newStartMins;
    });

    if (hasConflict) {
      return res.status(400).json({
        success: false,
        message: 'Conflict detected: The selected time slot overlaps with an existing reservation. Please select another time.',
      });
    }

    const booking = await Booking.create({
      amenityId,
      tenantId: req.user.id,
      propertyId: propertyId || null,
      bookingDate,
      startTime,
      endTime,
      totalGuests: totalGuests || 1,
      notes: notes || '',
      status: 'Confirmed',
    });

    const populated = await Booking.findById(booking._id)
      .populate('amenityId')
      .populate('tenantId', 'name email');

    await Notification.create({
      userId: req.user.id,
      title: 'Booking Confirmed!',
      message: `Your reservation for ${amenity.name} on ${bookingDate} (${startTime} - ${endTime}) is confirmed.`,
      type: 'BOOKING_UPDATE',
      link: '/bookings',
    });

    const io = req.app.get('io');
    if (io) {
      io.emit('booking:new', populated);
    }

    res.status(201).json({
      success: true,
      booking: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.tenantId.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'Cancelled';
    await booking.save();

    const io = req.app.get('io');
    if (io) {
      io.emit('booking:cancelled', booking);
    }

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    next(error);
  }
};
