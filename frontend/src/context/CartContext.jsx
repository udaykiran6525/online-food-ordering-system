import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user, isCustomer } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user || !isCustomer()) return;
    try {
      setLoading(true);
      const res = await axiosInstance.get('/cart');
      setCart(res.data);
    } catch (err) {
      console.error('Failed to fetch cart', err);
    } finally {
      setLoading(false);
    }
  }, [user, isCustomer]);

  useEffect(() => {
    if (user && isCustomer()) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user]);

  const addToCart = async (foodItemId, quantity = 1) => {
    const res = await axiosInstance.post('/cart/add', { foodItemId, quantity });
    setCart(res.data);
    return res.data;
  };

  const updateQuantity = async (cartItemId, quantity) => {
    const res = await axiosInstance.put(`/cart/update/${cartItemId}?quantity=${quantity}`);
    setCart(res.data);
    return res.data;
  };

  const removeItem = async (cartItemId) => {
    const res = await axiosInstance.delete(`/cart/remove/${cartItemId}`);
    setCart(res.data);
    return res.data;
  };

  const cartCount = cart?.itemCount || 0;
  const cartTotal = cart?.total || 0;

  return (
    <CartContext.Provider value={{
      cart, loading, cartCount, cartTotal,
      addToCart, updateQuantity, removeItem, fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
