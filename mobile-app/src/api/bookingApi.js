import apiClient from './apiClient';

export const createBooking = async (payload) => {
  const response = await apiClient.post('/bookings', payload);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await apiClient.get('/bookings/my-bookings');
  return response.data;
};

export const getAssignedJobs = async () => {
  const response = await apiClient.get('/bookings/assigned-jobs');
  return response.data;
};

export const acceptJob = async (bookingId) => {
  const response = await apiClient.patch(`/bookings/${bookingId}/accept`);
  return response.data;
};

export const startJob = async (bookingId) => {
  const response = await apiClient.patch(`/bookings/${bookingId}/start`);
  return response.data;
};

export const completeJob = async (bookingId) => {
  const response = await apiClient.patch(`/bookings/${bookingId}/complete`);
  return response.data;
};
