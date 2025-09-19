import { useState, useEffect } from 'react';
import { User } from '../types';

// Hook simulado para autenticación - en producción conectar con Google OAuth
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de usuario desde localStorage o API
    const savedUser = localStorage.getItem('iger-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, role: User['role']) => {
    // Simular login - integrar con Google OAuth
    const mockUser: User = {
      id: Math.random().toString(36),
      name: role === 'estudiante' ? 'María García' : role === 'maestro' ? 'Profesora Ana' : 'Admin Luis',
      email,
      role,
      classroomId: role === 'estudiante' ? 'aula-1a' : undefined,
      avatar: `avatar-${Math.floor(Math.random() * 6) + 1}`,
      parentConsent: role === 'estudiante' ? true : undefined,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('iger-user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('iger-user');
    setUser(null);
  };

  return { user, loading, login, logout };
};