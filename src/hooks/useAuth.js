import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI, register as registerAPI, getProfile, updateProfile as updateProfileAPI } from '../api/auth';
import { setUser, setToken, logout } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginAPI({ email, password });
      const { token, user } = response.data;
      dispatch(setToken(token));
      dispatch(setUser(user));
      localStorage.setItem('access_token', token);
      navigate('/');
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      return { success: false, error: err.response?.data?.detail };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerAPI(data);
      const { token, user } = response.data;
      dispatch(setToken(token));
      dispatch(setUser(user));
      localStorage.setItem('access_token', token);
      navigate('/');
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
      return { success: false, error: err.response?.data?.detail };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch profile');
      return null;
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await updateProfileAPI(data);
      dispatch(setUser(response.data));
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile');
      return { success: false, error: err.response?.data?.detail };
    }
  };

  return {
    login,
    register,
    logoutUser,
    fetchProfile,
    updateProfile,
    loading,
    error,
  };
};