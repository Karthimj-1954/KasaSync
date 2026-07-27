import API from './api';

export const maintenanceService = {
  getMaintenanceRequests: async () => {
    const res = await API.get('/maintenance');
    return res.data;
  },

  getMaintenanceById: async (id) => {
    const res = await API.get(`/maintenance/${id}`);
    return res.data;
  },

  createRequest: async (data) => {
    const res = await API.post('/maintenance', data);
    return res.data;
  },

  updateStatus: async (id, data) => {
    const res = await API.put(`/maintenance/${id}`, data);
    return res.data;
  },
};
