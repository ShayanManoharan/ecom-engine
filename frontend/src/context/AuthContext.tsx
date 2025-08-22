import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthRequest } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: AuthRequest) => Promise<void>;
  register: (data: AuthRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.getCurrentUser()
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data: AuthRequest) => {
    const response = await apiService.login(data);
    localStorage.setItem('token', response.token);
    setUser({
      id: response.id,
      email: response.email,
      role: response.role as 'ADMIN' | 'CUSTOMER',
      createdAt: new Date().toISOString(),
    });
  };

  const register = async (data: AuthRequest) => {
    const response = await apiService.register(data);
    localStorage.setItem('token', response.token);
    setUser({
      id: response.id,
      email: response.email,
      role: response.role as 'ADMIN' | 'CUSTOMER',
      createdAt: new Date().toISOString(),
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
