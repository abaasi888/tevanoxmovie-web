import apiClient from './client';

export const getMovies = (params) => apiClient.get('/movies', { params });
export const getMovie = (id) => apiClient.get(`/movies/${id}`);
export const getTrendingMovies = () => apiClient.get('/movies/trending');
export const getLatestMovies = () => apiClient.get('/movies/latest');
export const searchMovies = (query) => apiClient.get('/movies/search', { params: { q: query } });
export const getMoviesByCategory = (category) => apiClient.get(`/movies/category/${category}`);
export const getMoviesByVJ = (vjId) => apiClient.get(`/movies/vj/${vjId}`);
export const rateMovie = (id, rating) => apiClient.post(`/movies/${id}/rate`, { rating });
export const trackView = (id) => apiClient.post(`/movies/${id}/view`);