import apiClient from './client';

export const getPlans = () => apiClient.get('/subscriptions/plans');
export const activateSubscription = (data) => apiClient.post('/subscriptions/activate', data);
export const getStatus = () => apiClient.get('/subscriptions/status');
export const cancelSubscription = () => apiClient.post('/subscriptions/cancel');
export const getHistory = () => apiClient.get('/subscriptions/history');
export const getRenewalInfo = () => apiClient.get('/subscriptions/renewal');