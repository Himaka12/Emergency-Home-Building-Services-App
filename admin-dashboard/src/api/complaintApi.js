import apiClient from './apiClient.js';

export const getComplaints = async () => {
  const response = await apiClient.get('/complaints');
  return response.data;
};

export const updateComplaintStatus = async (complaintId, status) => {
  const response = await apiClient.patch(`/complaints/${complaintId}/status`, {
    status
  });
  return response.data;
};
