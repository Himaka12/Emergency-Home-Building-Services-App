import apiClient from './apiClient';

export const registerUser = async (payload) => {
  const response = await apiClient.post('/auth/register', payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await apiClient.post('/auth/login', payload);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

export const updateCurrentUser = async (payload) => {
  const response = await apiClient.patch('/auth/me', payload);
  return response.data;
};

export const updateProfileImage = async (image) => {
  const formData = new FormData();

  formData.append('profileImage', {
    uri: image.uri,
    name: image.fileName || `profile-${Date.now()}.jpg`,
    type: image.mimeType || 'image/jpeg'
  });

  const response = await apiClient.patch('/auth/me/profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};
