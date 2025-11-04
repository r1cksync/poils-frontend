import api from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  name: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  error?: string;
  message?: string;
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post('/api/auth/signup', data);
    return response.data;
  },

  async logout(): Promise<{ success: boolean }> {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },

  async getMe(): Promise<{ success: boolean; data?: { user: User } }> {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};
