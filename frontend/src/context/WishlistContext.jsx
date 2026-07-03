import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { wishlistApi } from '../api/wishlistApi';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { user, isCustomer } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!user || !isCustomer()) return;
    try {
      setLoading(true);
      const [listRes, idsRes] = await Promise.all([
        wishlistApi.getWishlist(),
        wishlistApi.getWishlistIds()
      ]);
      setWishlist(listRes.data || []);
      setWishlistIds(idsRes.data || []);
    } catch (err) {
      console.error('Failed to fetch wishlist', err);
    } finally {
      setLoading(false);
    }
  }, [user, isCustomer]);

  useEffect(() => {
    if (user && isCustomer()) {
      fetchWishlist();
    } else {
      setWishlist([]);
      setWishlistIds([]);
    }
  }, [user, fetchWishlist, isCustomer]);

  const isInWishlist = useCallback((foodId) => {
    return wishlistIds.includes(Number(foodId));
  }, [wishlistIds]);

  const toggleWishlist = async (food) => {
    if (!user || !isCustomer()) return;
    const foodId = Number(food.id);
    const exists = wishlistIds.includes(foodId);
    
    if (exists) {
      setWishlistIds(prev => prev.filter(id => id !== foodId));
      setWishlist(prev => prev.filter(item => item.id !== foodId));
      try {
        const res = await wishlistApi.remove(foodId);
        setWishlist(res.data || []);
        setWishlistIds((res.data || []).map(f => f.id));
      } catch (err) {
        console.error('Failed to remove from wishlist', err);
        fetchWishlist();
      }
    } else {
      setWishlistIds(prev => [...prev, foodId]);
      setWishlist(prev => [...prev, food]);
      try {
        const res = await wishlistApi.add(foodId);
        setWishlist(res.data || []);
        setWishlistIds((res.data || []).map(f => f.id));
      } catch (err) {
        console.error('Failed to add to wishlist', err);
        fetchWishlist();
      }
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlist, wishlistIds, loading, isInWishlist, toggleWishlist, fetchWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
