import axiosInstance from '../utils/axiosConfig';

export const authApi = {
  registerCustomer: (data) => axiosInstance.post('/auth/register/customer', data),
  registerRestaurant: (data) => axiosInstance.post('/auth/register/restaurant', data),
  login: (data) => axiosInstance.post('/auth/login', data),
  checkEmail: (email) => axiosInstance.get(`/auth/check-email?email=${email}`),
};
