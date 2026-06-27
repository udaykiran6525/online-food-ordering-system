import axios from 'axios';
import { mockService } from '../services/mockService';

const API_BASE_URL = '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('foodease_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isNetworkOrProxyError = 
      error.code === 'ERR_NETWORK' ||
      error.code === 'ECONNABORTED' ||
      !error.response ||
      status === 504 ||
      status === 502 ||
      status === 503 ||
      status === 404 ||
      status >= 500;

    if (isNetworkOrProxyError) {
      console.warn('[Demo Mode] Backend unreachable or error. Falling back to local data.');
      return mockService.handleRequest(error.config);
    }

    if (status === 401 && !error.config?.url?.includes('/auth/login')) {
      localStorage.removeItem('foodease_token');
      localStorage.removeItem('foodease_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
