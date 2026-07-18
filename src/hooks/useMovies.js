import { useState } from 'react';
import apiClient from '../api/client';

export const useMovies = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const [trendingRes, latestRes] = await Promise.all([
        apiClient.get('/movies/trending'),
        apiClient.get('/movies/latest'),
      ]);
      setTrendingMovies(trendingRes.data);
      setLatestMovies(latestRes.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMovie = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/movies/${id}`);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { trendingMovies, latestMovies, loading, error, fetchMovies, getMovie };
};