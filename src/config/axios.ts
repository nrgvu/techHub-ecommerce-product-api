import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Define interfaces for better type safety
interface ApiErrorResponse {
  message?: string;
  error?: string;
  status?: number;
}

const api = axios.create({
  baseURL: 'https://api.ecommerce.qafdev.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

const guestApi = axios.create({
  baseURL: 'https://api.ecommerce.qafdev.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor with proper typing for newer Axios versions
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor with proper typing and fixed typo
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    // Fixed: "statues" should be "status"
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Add interceptor for guest API as well (optional but recommended)
guestApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    return Promise.reject(error);
  }
);

export { guestApi };
export default api;