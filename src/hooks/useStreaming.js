import apiClient from '../api/client';

export const useStreaming = () => {
  const getStreamingUrl = async (id, type = 'movie') => {
    try {
      const response = await apiClient.get(`/streaming/${type}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting streaming URL:', error);
      return null;
    }
  };

  const getDownloadUrl = async (id, type = 'movie') => {
    try {
      const response = await apiClient.get(`/streaming/download/${id}?content_type=${type}`);
      return response.data;
    } catch (error) {
      console.error('Error getting download URL:', error);
      return null;
    }
  };

  return { getStreamingUrl, getDownloadUrl };
};