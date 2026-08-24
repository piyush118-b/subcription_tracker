import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const subscriptionsApi = {
  getAll: async () => {
    const response = await api.get('/subscriptions');
    return response.data;
  },

  create: async (subscription) => {
    const response = await api.post('/subscriptions', subscription);
    return response.data;
  },

  update: async (id, updates) => {
    const response = await api.patch(`/subscriptions/${id}`, updates);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/subscriptions/${id}`);
  },
};

export default api;
