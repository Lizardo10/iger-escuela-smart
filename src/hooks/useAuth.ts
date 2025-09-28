import { useState, useEffect } from 'react';
import { User } from '../types';
import { apiService } from '../services/apiService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar usuario desde localStorage
    const savedUser = localStorage.getItem('iger-user');
    const token = localStorage.getItem('iger-token');
    
    if (savedUser && token) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('iger-user');
        localStorage.removeItem('iger-token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    try {
      setLoading(true);
      const response = await apiService.login(email, password);
      
      if (response.success) {
        setUser(response.user);
        return { success: true, user: response.user };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setLoading(true);
      const response = await apiService.register(userData);
      
      if (response.data) {
        return { success: true, user: response.data.user };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  return { user, loading, login, register, logout };
};