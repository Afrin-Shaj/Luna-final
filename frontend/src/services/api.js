import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for error handling
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
  } else {
    console.error('Network Error:', error.message);
  }
  return Promise.reject(error);
});

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async signup(name: string, email: string, password: string) {
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateProfile(userId: string, data: any) {
    try {
      const response = await api.put(`/user/updateProfile/${userId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getUserProfile(userId: string) {
    try {
      const response = await api.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateMood(mood: string) {
    try {
      const response = await api.post('/user/mood', { mood });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async submitFeedback(data: { quote: string; rating: number; comments: string }) {
    try {
      const response = await api.post('/user/feedback', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addToFavorites(quote: string) {
    try {
      const response = await api.post('/user/favorites', { quote });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add the new method here
  async getCurrentUser() {
    const response = await api.get('/user/current'); // Adjust the endpoint as necessary
    return response.data;
  }
};
