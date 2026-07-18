import { useState } from 'react';
import { getPlans, getStatus, activateSubscription, cancelSubscription, getHistory } from '../api/subscriptions.jsx';

export const useSubscriptions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await getPlans();
      setPlans(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await getStatus();
      setStatus(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const activateSubscription = async (data) => {
    setLoading(true);
    try {
      const response = await activateSubscription(data);
      await fetchStatus();
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    setLoading(true);
    try {
      const response = await cancelSubscription();
      await fetchStatus();
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await getHistory();
      setHistory(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    plans,
    status,
    history,
    loading,
    error,
    fetchPlans,
    fetchStatus,
    activateSubscription,
    cancelSubscription,
    fetchHistory,
  };
};