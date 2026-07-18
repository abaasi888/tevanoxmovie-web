import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/subscriptions/plans`);
    return response.data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

export const getStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/subscriptions/status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    throw error;
  }
};

export const activateSubscription = async (planId) => {
  try {
    const response = await axios.post(`${API_URL}/subscriptions/activate`, { planId });
    return response.data;
  } catch (error) {
    console.error('Error activating subscription:', error);
    throw error;
  }
};

export const cancelSubscription = async () => {
  try {
    const response = await axios.post(`${API_URL}/subscriptions/cancel`);
    return response.data;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
};

export const getHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/subscriptions/history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscription history:', error);
    throw error;
  }
};
