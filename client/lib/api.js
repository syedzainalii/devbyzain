import axios from 'axios';

// Determine API URL - hardcode production fallback
const getApiUrl = () => {
  // If env variable is set, use it
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Check if we're in browser and on production
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('vercel.app') || hostname === 'devbyzain.com') {
      return 'https://devbyzain-backend.vercel.app';
    }
  }
  
  // Default to localhost for development
  return 'http://localhost:8000';
};

const API_URL = getApiUrl();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  getMe: () => api.get('/api/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
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
  upload: async (file, useCloudinary = true) => {
    // Try direct Cloudinary upload first if enabled
    if (useCloudinary && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      try {
        const { uploadToCloudinary } = await import('./cloudinaryUpload');
        const result = await uploadToCloudinary(file, {
          folder: 'portfolio',
          tags: ['portfolio', 'product']
        });
        return { data: result };
      } catch (error) {
        console.warn('Cloudinary upload failed, falling back to backend:', error);
        // Fall through to backend upload
      }
    }
    
    // Fallback to backend upload
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
