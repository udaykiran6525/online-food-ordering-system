import axiosInstance from '../utils/axiosConfig';

export const wishlistApi = {
  getWishlist: () => axiosInstance.get('/wishlist'),
  getWishlistIds: () => axiosInstance.get('/wishlist/ids'),
  add: (foodItemId) => axiosInstance.post(`/wishlist/${foodItemId}`),
  remove: (foodItemId) => axiosInstance.delete(`/wishlist/${foodItemId}`),
};
