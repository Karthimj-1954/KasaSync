import API from './api';

export const amenityService = {
  getAmenities: async (params) => {
    const res = await API.get('/amenities', { params });
    return res.data;
  },

  getAmenityById: async (id) => {
    const res = await API.get(`/amenities/${id}`);
    return res.data;
  },

  createAmenity: async (data) => {
    const res = await API.post('/amenities', data);
    return res.data;
  },

  updateAmenity: async (id, data) => {
    const res = await API.put(`/amenities/${id}`, data);
    return res.data;
  },

  deleteAmenity: async (id) => {
    const res = await API.delete(`/amenities/${id}`);
    return res.data;
  },
};
