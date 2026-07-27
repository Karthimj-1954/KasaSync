import API from './api';

export const notificationService = {
  getNotifications: async () => {
    const res = await API.get('/notifications');
    return res.data;
  },

  markAsRead: async (notificationIds = []) => {
    const res = await API.put('/notifications/read', { notificationIds });
    return res.data;
  },
};
