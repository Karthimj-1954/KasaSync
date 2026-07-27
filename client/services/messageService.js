import API from './api';

export const messageService = {
  getMessages: async (otherUserId) => {
    const res = await API.get(`/messages/${otherUserId}`);
    return res.data;
  },

  sendMessage: async (data) => {
    const res = await API.post('/messages', data);
    return res.data;
  },
};
