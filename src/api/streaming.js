import apiClient from './client';

export const getStreamingUrl = (contentId, contentType = 'movie') => 
    apiClient.get(`/streaming/${contentType}/${contentId}`);
export const getDownloadUrl = (contentId, contentType = 'movie') => 
    apiClient.get(`/streaming/download/${contentId}?content_type=${contentType}`);
export const getLiveStream = (streamName) => 
    apiClient.get(`/streaming/live/${streamName}`);
export const getPlaylist = () => apiClient.get('/streaming/playlist/movies');