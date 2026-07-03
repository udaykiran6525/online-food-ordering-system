import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import BrowseFood from './BrowseFood';
import Cart from './Cart';
import Checkout from './Checkout';
import Orders from './Orders';
import OrderTracking from './OrderTracking';
import CustomerProfile from './CustomerProfile';
import Wishlist from './Wishlist';
import NotificationBell from '../../components/NotificationBell';
import LogoutConfirmationModal from '../../components/LogoutConfirmationModal';

const INDIAN_LOGO_SVG = (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
    <path d="M6 24c0-6.627 5.373-12 12-12s12 5.373 12 12H6z" fill="url(#saffron_cust)"/>
    <path d="M18 6v6M18 6c2 0 4-1 4-1" stroke="#FF9933" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M4 26h28v2c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-2z" fill="#FF6B35"/>
    <defs>
      <linearGradient id="saffron_cust" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD166" />
        <stop offset="100%" stopColor="#FF6B35" />
      </linearGradient>
    </defs>
  </svg>
);

const USER_ICON_SVG = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: '🍽️', label: 'Browse Food' },
    { path: '/dashboard/wishlist', icon: '❤️', label: 'Wishlist' },
    { path: '/dashboard/cart', icon: '🛒', label: 'My Cart', badge: cartCount },
    { path: '/dashboard/orders', icon: '📦', label: 'My Orders' },
    { path: '/dashboard/profile', icon: '👤', label: 'Profile' }
  ];

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/login');
  };

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  return (
    <div className="dashboard-layout">
      <div className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
        ☰
      </div>

      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} 
        onClick={closeSidebar}
      />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo" onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}>
          <div className="sidebar-logo-icon" style={{background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {INDIAN_LOGO_SVG}
          </div>
          <div className="sidebar-logo-text">
            <h2>FOODEASE</h2>
            <span>Customer Panel</span>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div className="sidebar-user-info">
            <h4>{user?.name}</h4>
            <span>{user?.email}</span>
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="sidebar-section-label">Menu</div>
          {menuItems.map(item => (
            <div 
              key={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
              {item.badge > 0 && <span className="sidebar-item-badge">{item.badge}</span>}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-logout" onClick={() => setShowLogoutModal(true)}>
            <span className="sidebar-icon">🚪</span>
            Logout
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: 'var(--bg-card)', borderBottom: '1px solid var(--glass-border)', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              👋 Welcome, {user?.name || 'Foodie'}!
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Satisfy your cravings with fast delivery 🚀</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <NotificationBell />
            <div 
              onClick={() => navigate('/dashboard/profile')} 
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #FF8E53)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 16px rgba(255,107,53,0.4)', border: '2px solid rgba(255,255,255,0.2)' }}
              title="My Profile"
            >
              {USER_ICON_SVG}
            </div>
          </div>
        </header>

        <div className="content-area">
          <Routes>
            <Route path="/" element={<BrowseFood />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/tracking/:id" element={<OrderTracking />} />
            <Route path="/profile" element={<CustomerProfile />} />
          </Routes>
        </div>
      </main>

      <LogoutConfirmationModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}
