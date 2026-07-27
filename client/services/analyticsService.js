import API from './api';

export const analyticsService = {
  getAnalytics: async () => {
    const res = await API.get('/analytics');
    return res.data;
  },
};
