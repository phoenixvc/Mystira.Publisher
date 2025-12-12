import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import type { ApiError, ApiResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response?.status === 401) {
      // Handle token refresh or redirect to login
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generic request wrapper with type safety
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.request<ApiResponse<T>>(config);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError = error.response.data as ApiResponse<unknown>;
      throw new ApiRequestError(
        apiError.message || 'An error occurred',
        apiError.errors || []
      );
    }
    throw error;
  }
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public errors: ApiError[]
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}
