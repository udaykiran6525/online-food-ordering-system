import axiosInstance from '../utils/axiosConfig';

export const orderApi = {
  place: (data) => axiosInstance.post('/orders', data),
  getMyOrders: () => axiosInstance.get('/orders/my-orders'),
  getById: (id) => axiosInstance.get(`/orders/${id}`),
  getTracking: (id) => axiosInstance.get(`/tracking/${id}`),
  getAllAdmin: (params) => axiosInstance.get('/orders/admin/all', { params }),
  getRestaurantOrders: (restaurantId, params) => axiosInstance.get(`/orders/admin/restaurant/${restaurantId}`, { params }),
  updateStatus: (id, status) => axiosInstance.put(`/orders/${id}/status`, { status }),
};

export const adminApi = {
  getDashboard: () => axiosInstance.get('/admin/dashboard'),
  getCustomers: () => axiosInstance.get('/admin/customers'),
};
