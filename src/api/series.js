import apiClient from './client';

export const getSeries = (params) => apiClient.get('/series', { params });
export const getSeriesById = (id) => apiClient.get(`/series/${id}`);
export const getTrendingSeries = () => apiClient.get('/series/trending');
export const getLatestSeries = () => apiClient.get('/series/latest');
export const searchSeries = (query) => apiClient.get('/series/search', { params: { q: query } });
export const getSeriesByCategory = (category) => apiClient.get(`/series/category/${category}`);
export const getEpisodes = (seriesId) => apiClient.get(`/series/${seriesId}/episodes`);
export const getEpisode = (seriesId, episodeId) => 
    apiClient.get(`/series/${seriesId}/episodes/${episodeId}`);