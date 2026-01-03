import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  getMe: () => api.get('/api/auth/me'),
};

// Product APIs
export const productAPI = {
  getAll: (params) => api.get('/api/products', { params }),
  getById: (id) => api.get(`/api/products/${id}`),
  create: (data) => api.post('/api/products', data),
  update: (id, data) => api.put(`/api/products/${id}`, data),
  delete: (id) => api.delete(`/api/products/${id}`),
};

// Order APIs
export const orderAPI = {
  getAll: () => api.get('/api/orders'),
  getById: (id) => api.get(`/api/orders/${id}`),
  create: (data) => api.post('/api/orders', data),
  update: (id, data) => api.put(`/api/orders/${id}`, data),
};

// Custom Request APIs
export const customRequestAPI = {
  getAll: () => api.get('/api/custom-requests'),
  create: (data) => api.post('/api/custom-requests', data),
  update: (id, data) => api.put(`/api/custom-requests/${id}`, data),
};

// Content APIs
export const contentAPI = {
  getAll: () => api.get('/api/content'),
  getByKey: (key) => api.get(`/api/content/${key}`),
  create: (data) => api.post('/api/content', data),
  update: (key, data) => api.put(`/api/content/${key}`, data),
};

// File Upload APIs
export const uploadAPI = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (filename) => api.delete(`/api/upload/${filename}`),
};

export default api;
