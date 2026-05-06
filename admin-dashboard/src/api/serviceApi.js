import apiClient from './apiClient.js';

export const getServices = async () => {
  const response = await apiClient.get('/services');
  return response.data;
};

export const createService = async (payload) => {
  const response = await apiClient.post('/services', payload);
  return response.data;
};
