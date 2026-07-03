import axiosInstance from '../utils/axiosConfig';

export const userApi = {
  getProfile: (id) => axiosInstance.get(`/users/${id}`),
  updateProfile: (id, data) => axiosInstance.put(`/users/${id}`, data),
};
