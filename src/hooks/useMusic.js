import { useState } from 'react';
import {
  getMusic,
  getMusicById,
  getTrendingMusic,
  getLatestMusic,
  searchMusic,
  getMusicByCategory,
} from '../api/music';

export const useMusic = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trendingMusic, setTrendingMusic] = useState([]);
  const [latestMusic, setLatestMusic] = useState([]);

  const fetchTrendingMusic = async () => {
    setLoading(true);
    try {
      const response = await getTrendingMusic();
      setTrendingMusic(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestMusic = async () => {
    setLoading(true);
    try {
      const response = await getLatestMusic();
      setLatestMusic(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getMusic = async (id) => {
    setLoading(true);
    try {
      const response = await getMusicById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchMusicQuery = async (query) => {
    setLoading(true);
    try {
      const response = await searchMusic(query);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getMusicByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await getMusicByCategory(category);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    trendingMusic,
    latestMusic,
    loading,
    error,
    fetchTrendingMusic,
    fetchLatestMusic,
    getMusic,
    searchMusic: searchMusicQuery,
    getMusicByCategory,
  };
};