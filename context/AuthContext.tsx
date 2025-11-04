'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { authService, User } from '@/lib/auth';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = Cookies.get('token');
      if (token) {
        const response = await authService.getMe();
        if (response.success && response.data) {
          setUser(response.data.user);
        }
      }
    } catch (error: any) {
      // Silently fail - don't show error on landing page
      console.log('Auth check skipped or failed:', error.message);
      Cookies.remove('token');
    } finally {
      // Always set loading to false so UI can render
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        Cookies.set('token', response.data.token, { expires: 7 });
        setUser(response.data.user);
        toast.success('Login successful!');
        router.push('/chat');
      } else {
        toast.error(response.error || 'Login failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await authService.signup({ name, email, password });
      if (response.success && response.data) {
        Cookies.set('token', response.data.token, { expires: 7 });
        setUser(response.data.user);
        toast.success('Account created successfully!');
        router.push('/chat');
      } else {
        toast.error(response.error || 'Signup failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Signup failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      Cookies.remove('token');
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout even if API call fails
      Cookies.remove('token');
      setUser(null);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
