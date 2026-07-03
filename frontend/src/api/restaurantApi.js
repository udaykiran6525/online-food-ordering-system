import axiosInstance from '../utils/axiosConfig';

export const restaurantApi = {
  updateRestaurant: (id, data) => axiosInstance.put(`/restaurants/${id}`, data),
};
