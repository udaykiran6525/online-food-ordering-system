import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeUser = (data) => {
    if (!data) return null;
    const u = data.user || data;
    const role = u.role === 'RESTAURANT_OWNER' ? 'ADMIN' : u.role;
    return {
      token: data.token || localStorage.getItem('foodease_token'),
      id: u.userId || u.id,
      name: u.name,
      email: u.email,
      role: role,
      restaurantId: u.restaurantId || data.restaurantId || (role === 'ADMIN' ? 1 : null),
      address: u.address || '123 Main St'
    };
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('foodease_user');
    const token = localStorage.getItem('foodease_token');
    if (storedUser && token) {
      setUser(normalizeUser(JSON.parse(storedUser)));
    }
    setLoading(false);
  }, []);

  const login = useCallback((authData) => {
    const normalized = normalizeUser(authData);
    localStorage.setItem('foodease_token', normalized.token);
    localStorage.setItem('foodease_user', JSON.stringify(normalized));
    setUser(normalized);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('foodease_token');
    localStorage.removeItem('foodease_user');
    setUser(null);
  }, []);

  const isCustomer = () => user?.role === 'CUSTOMER';
  const isAdmin = () => user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isCustomer, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
