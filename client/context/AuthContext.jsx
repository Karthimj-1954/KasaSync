'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('kasasync_token');
    const savedUser = localStorage.getItem('kasasync_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('kasasync_token');
        localStorage.removeItem('kasasync_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('kasasync_token', data.token);
      localStorage.setItem('kasasync_user', JSON.stringify(data.user));
      toast.success(`Welcome back, ${data.user.name}!`);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(msg);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('kasasync_token', data.token);
      localStorage.setItem('kasasync_user', JSON.stringify(data.user));
      toast.success('Account created successfully!');
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      toast.error(msg);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('kasasync_token');
    localStorage.removeItem('kasasync_user');
    toast.success('Logged out successfully.');
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const data = await authService.updateProfile(updatedData);
      setUser(data.user);
      localStorage.setItem('kasasync_user', JSON.stringify(data.user));
      toast.success('Profile updated!');
      return data;
    } catch (err) {
      toast.error('Failed to update profile.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
