import API from './api';

export const authService = {
  login: async (credentials) => {
    const res = await API.post('/auth/login', credentials);
    return res.data;
  },

  register: async (userData) => {
    const res = await API.post('/auth/register', userData);
    return res.data;
  },

  getMe: async () => {
    const res = await API.get('/auth/me');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await API.put('/auth/profile', data);
    return res.data;
  },

  forgotPassword: async (data) => {
    const res = await API.post('/auth/forgot-password', data);
    return res.data;
  },

  resetPassword: async (data) => {
    const res = await API.post('/auth/reset-password', data);
    return res.data;
  },

  getUsers: async (params) => {
    const res = await API.get('/users', { params });
    return res.data;
  },

  updateUserRole: async (id, role) => {
    const res = await API.put(`/users/${id}/role`, { role });
    return res.data;
  },

  getActivityLogs: async () => {
    const res = await API.get('/users/activity-logs');
    return res.data;
  },
};
