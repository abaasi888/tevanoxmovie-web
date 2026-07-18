import { useState, useCallback } from 'react';
import axios from 'axios';

export const useShareholder = () => {
  const [shareholderInfo, setShareholderInfo] = useState(null);
  const [dividends, setDividends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShareholderData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/v1/shareholders/my');
      if (response.data && response.data.shareholder) {
        setShareholderInfo(response.data);
      } else {
        setShareholderInfo(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch shareholder data');
      console.error('Error fetching shareholder data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const purchaseShares = useCallback(async (shares, paymentMethod) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/v1/shareholders/purchase', null, {
        params: { shares, payment_method: paymentMethod }
      });
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error purchasing shares:', err);
      return { success: false, error: err.response?.data?.message || 'Failed to purchase shares' };
    } finally {
      setLoading(false);
    }
  }, []);

  const reinvestDividend = useCallback(async (dividendId) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/v1/dividends/${dividendId}/reinvest`);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error reinvesting dividend:', err);
      return { success: false, error: err.response?.data?.message || 'Failed to reinvest dividend' };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    shareholderInfo,
    dividends,
    loading,
    error,
    fetchShareholderData,
    purchaseShares,
    reinvestDividend,
  };
};
