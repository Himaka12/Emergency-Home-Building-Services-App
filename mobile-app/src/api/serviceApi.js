import apiClient from './apiClient';

export const getServiceCategories = async () => {
  const response = await apiClient.get('/services');
  return response.data;
};
