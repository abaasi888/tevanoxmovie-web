import apiClient from './client';

export const register = (data) => apiClient.post('/auth/register', data);
export const login = (data) => apiClient.post('/auth/login', data);
export const refresh = (data) => apiClient.post('/auth/refresh', data);
export const logout = () => apiClient.post('/auth/logout');
export const forgotPassword = (email) => apiClient.post('/auth/forgot-password', { email });
export const resetPassword = (data) => apiClient.post('/auth/reset-password', data);
export const getProfile = () => apiClient.get('/users/profile');
export const updateProfile = (data) => apiClient.put('/users/profile', data);
export const getWatchHistory = () => apiClient.get('/users/history');
export const getFavorites = () => apiClient.get('/users/favorites');
export const addFavorite = (contentId, contentType) => 
    apiClient.post(`/users/favorites/${contentId}?content_type=${contentType}`);
export const removeFavorite = (contentId) => 
    apiClient.delete(`/users/favorites/${contentId}`);