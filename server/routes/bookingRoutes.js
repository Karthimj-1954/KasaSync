const express = require('express');
const router = express.Router();
const {
  getBookings,
  checkAvailability,
  createBooking,
  cancelBooking,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/check-availability', checkAvailability);
router.get('/', protect, getBookings);
router.post('/', protect, createBooking);
router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;
