import { useState } from 'react';
import {
  getSeries,
  getSeriesById,
  getTrendingSeries,
  getLatestSeries,
  searchSeries,
  getSeriesByCategory,
  getEpisodes,
} from '../api/series';

export const useSeries = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [latestSeries, setLatestSeries] = useState([]);

  const fetchTrendingSeries = async () => {
    setLoading(true);
    try {
      const response = await getTrendingSeries();
      setTrendingSeries(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestSeries = async () => {
    setLoading(true);
    try {
      const response = await getLatestSeries();
      setLatestSeries(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getSeries = async (id) => {
    setLoading(true);
    try {
      const response = await getSeriesById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchSeriesQuery = async (query) => {
    setLoading(true);
    try {
      const response = await searchSeries(query);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getSeriesByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await getSeriesByCategory(category);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getEpisodes = async (seriesId) => {
    setLoading(true);
    try {
      const response = await getEpisodes(seriesId);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    trendingSeries,
    latestSeries,
    loading,
    error,
    fetchTrendingSeries,
    fetchLatestSeries,
    getSeries,
    searchSeries: searchSeriesQuery,
    getSeriesByCategory,
    getEpisodes,
  };
};