import apiClient from './client';

export const getMusic = (params) => apiClient.get('/music', { params });
export const getMusicById = (id) => apiClient.get(`/music/${id}`);
export const getTrendingMusic = () => apiClient.get('/music/trending');
export const getLatestMusic = () => apiClient.get('/music/latest');
export const searchMusic = (query) => apiClient.get('/music/search', { params: { q: query } });
export const getMusicByCategory = (category) => apiClient.get(`/music/category/${category}`);
export const getMusicByArtist = (artistId) => apiClient.get(`/music/artist/${artistId}`);
export const playMusic = (id) => apiClient.post(`/music/${id}/play`);