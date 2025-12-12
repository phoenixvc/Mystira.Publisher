import { request, apiClient } from './client';
import type {
  User,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
} from './types';

const AUTH_PATH = '/auth';

export const authApi = {
  // Login with credentials
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await request<LoginResponse>({
      method: 'POST',
      url: `${AUTH_PATH}/login`,
      data,
    });
    // Store tokens
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await request<void>({
        method: 'POST',
        url: `${AUTH_PATH}/logout`,
      });
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  // Refresh access token
  refreshToken: async (data: RefreshTokenRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<{ data: LoginResponse }>(
      `${AUTH_PATH}/refresh`,
      data
    );
    localStorage.setItem('accessToken', response.data.data.accessToken);
    localStorage.setItem('refreshToken', response.data.data.refreshToken);
    return response.data.data;
  },

  // Get current user
  getCurrentUser: (): Promise<User> =>
    request<User>({
      method: 'GET',
      url: `${AUTH_PATH}/me`,
    }),
};
