import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/api/axios';

export interface User {
  id: string;
  _id?: string;
  email: string;
  name?: string;
  role?: 'customer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  verifySession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const verifySession = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      // Validate session with the backend
      const response = await api.get('/auth/me');
      const verifiedUser: User = {
        id: response.data.id || response.data._id,
        _id: response.data._id || response.data.id,
        email: response.data.email,
        name: response.data.name,
        role: response.data.role,
      };
      setUser(verifiedUser);
      localStorage.setItem('user', JSON.stringify(verifiedUser));
    } catch (error) {
      // If server rejects token, clean up session
      console.warn('Session verification failed, logging out.');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/user/login', { email, password });
    const { token, user: userData } = response.data;

    const formattedUser: User = {
      id: userData.id || userData._id,
      _id: userData._id || userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
    };

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(formattedUser));
    setUser(formattedUser);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await api.post('/user/register', { name, email, password });
    const { token, user: userData } = response.data;

    if (token && userData) {
      const formattedUser: User = {
        id: userData.id || userData._id,
        _id: userData._id || userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(formattedUser));
      setUser(formattedUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        verifySession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
