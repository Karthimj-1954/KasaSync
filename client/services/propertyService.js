import API from './api';

export const propertyService = {
  getProperties: async (params) => {
    const res = await API.get('/properties', { params });
    return res.data;
  },

  getPropertyById: async (id) => {
    const res = await API.get(`/properties/${id}`);
    return res.data;
  },

  createProperty: async (data) => {
    const res = await API.post('/properties', data);
    return res.data;
  },

  updateProperty: async (id, data) => {
    const res = await API.put(`/properties/${id}`, data);
    return res.data;
  },

  deleteProperty: async (id) => {
    const res = await API.delete(`/properties/${id}`);
    return res.data;
  },

  assignTenant: async (id, tenantId) => {
    const res = await API.put(`/properties/${id}/assign-tenant`, { tenantId });
    return res.data;
  },
};
