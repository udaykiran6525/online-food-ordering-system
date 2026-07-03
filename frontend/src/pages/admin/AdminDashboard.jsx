import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardHome from './DashboardHome';
import MenuManagement from './MenuManagement';
import CategoryManagement from './CategoryManagement';
import OrderManagement from './OrderManagement';
import AdminProfile from './AdminProfile';
import NotificationBell from '../../components/NotificationBell';
import LogoutConfirmationModal from '../../components/LogoutConfirmationModal';

const INDIAN_LOGO_SVG = (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
    <path d="M6 24c0-6.627 5.373-12 12-12s12 5.373 12 12H6z" fill="url(#saffron_admin)"/>
    <path d="M18 6v6M18 6c2 0 4-1 4-1" stroke="#FF9933" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M4 26h28v2c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-2z" fill="#FF6B35"/>
    <defs>
      <linearGradient id="saffron_admin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD166" />
        <stop offset="100%" stopColor="#FF6B35" />
      </linearGradient>
    </defs>
  </svg>
);

const ADMIN_AVATAR_SVG = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { path: '/admin', icon: '📊', label: 'Dashboard Overview' },
    { path: '/admin/orders', icon: '📦', label: 'Live Orders' },
    { path: '/admin/menu', icon: '🍽️', label: 'Menu Management' },
    { path: '/admin/categories', icon: '📁', label: 'Categories' },
    { path: '/admin/profile', icon: '🏪', label: 'Store Settings' }
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
      <div className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>☰</div>
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={closeSidebar} />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{ background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)' }}>
        <div className="sidebar-logo" onClick={() => navigate('/admin')} style={{cursor: 'pointer'}}>
          <div className="sidebar-logo-icon" style={{background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {INDIAN_LOGO_SVG}
          </div>
          <div className="sidebar-logo-text">
            <h2>FOODEASE</h2>
            <span style={{color: '#4CC9F0'}}>Restaurant Admin</span>
          </div>
        </div>

        <div className="sidebar-user" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="sidebar-user-avatar" style={{background: '#4CC9F0', color: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {ADMIN_AVATAR_SVG}
          </div>
          <div className="sidebar-user-info">
            <h4>{user?.name || 'Manager'}</h4>
            <span style={{color: '#4CC9F0'}}>Admin</span>
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="sidebar-section-label">Management</div>
          {menuItems.map(item => (
            <div 
              key={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              style={location.pathname === item.path ? { background: 'rgba(76,201,240,0.15)', borderLeftColor: '#4CC9F0' } : {}}
            >
              <span className="sidebar-icon" style={{color: location.pathname === item.path ? '#4CC9F0' : 'inherit'}}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-logout" onClick={() => setShowLogoutModal(true)}>
            <span className="sidebar-icon">🚪</span> Logout
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: 'var(--bg-card)', borderBottom: '1px solid var(--glass-border)', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              🏪 Store Administration
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#4CC9F0' }}>Manage live orders, menu catalog & store timings</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <NotificationBell />
            <div 
              onClick={() => navigate('/admin/profile')} 
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4CC9F0', color: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 16px rgba(76,201,240,0.4)', border: '2px solid rgba(255,255,255,0.3)' }}
              title="Store Settings"
            >
              {ADMIN_AVATAR_SVG}
            </div>
          </div>
        </header>

        <div className="content-area">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/profile" element={<AdminProfile />} />
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
