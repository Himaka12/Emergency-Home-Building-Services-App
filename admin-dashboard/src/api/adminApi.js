import apiClient from './apiClient.js';

export const getDashboardSummary = async () => {
  const response = await apiClient.get('/admin/summary');
  return response.data;
};

export const getCustomers = async () => {
  const response = await apiClient.get('/admin/customers');
  return response.data;
};

export const getWorkers = async () => {
  const response = await apiClient.get('/admin/workers');
  return response.data;
};

export const getBookings = async () => {
  const response = await apiClient.get('/admin/bookings');
  return response.data;
};

export const updateWorkerApproval = async (profileId, approvalStatus) => {
  const response = await apiClient.patch(`/admin/workers/${profileId}/approval`, {
    approvalStatus
  });
  return response.data;
};

export const assignWorkerToBooking = async (bookingId, workerId) => {
  const response = await apiClient.patch(`/admin/bookings/${bookingId}/assign`, {
    workerId
  });
  return response.data;
};
