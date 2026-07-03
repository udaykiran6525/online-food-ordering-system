import axiosInstance from '../utils/axiosConfig';

export const foodApi = {
  getAll: (params) => axiosInstance.get('/foods', { params }),
  getById: (id) => axiosInstance.get(`/foods/${id}`),
  getByRestaurant: (restaurantId) => axiosInstance.get(`/foods/restaurant/${restaurantId}`),
  search: (keyword, params) => axiosInstance.get('/foods', { params: { keyword, ...params } }),
  create: (data) => axiosInstance.post('/foods', data),
  update: (id, data) => axiosInstance.put(`/foods/${id}`, data),
  delete: (id) => axiosInstance.delete(`/foods/${id}`),
  toggle: (id) => axiosInstance.patch(`/foods/${id}/toggle`),
};

export const categoryApi = {
  getAll: () => axiosInstance.get('/categories'),
  getByRestaurant: (id) => axiosInstance.get(`/categories/restaurant/${id}`),
  create: (data) => axiosInstance.post('/categories', data),
  update: (id, data) => axiosInstance.put(`/categories/${id}`, data),
  delete: (id) => axiosInstance.delete(`/categories/${id}`),
};

export const restaurantApi = {
  getAll: () => axiosInstance.get('/restaurants'),
  getById: (id) => axiosInstance.get(`/restaurants/${id}`),
};
