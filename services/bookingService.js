import API from './api';

export const bookingService = {
  getBookings: async () => {
    const res = await API.get('/bookings');
    return res.data;
  },

  checkAvailability: async (amenityId, bookingDate) => {
    const res = await API.get('/bookings/check-availability', {
      params: { amenityId, bookingDate },
    });
    return res.data;
  },

  createBooking: async (data) => {
    const res = await API.post('/bookings', data);
    return res.data;
  },

  cancelBooking: async (id) => {
    const res = await API.put(`/bookings/${id}/cancel`);
    return res.data;
  },
};
