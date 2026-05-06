import apiClient from './apiClient';

export const saveWorkerProfile = async (payload) => {
  const response = await apiClient.post('/workers/profile', payload);
  return response.data;
};

export const getMyWorkerProfile = async () => {
  const response = await apiClient.get('/workers/profile/me');
  return response.data;
};

export const updateAvailability = async (availabilityStatus) => {
  const response = await apiClient.patch('/workers/availability', {
    availabilityStatus
  });
  return response.data;
};
