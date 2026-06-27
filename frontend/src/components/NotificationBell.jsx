import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function NotificationBell() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  const isAdmin = user?.role === 'ADMIN';
  const roleKey = isAdmin ? 'ADMIN' : 'CUSTOMER';

  const loadNotifications = () => {
    let stored = localStorage.getItem('demo_notifications');
    if (!stored) {
      const defaults = [
        { id: 1, title: 'Welcome to FoodEase! 🍔', message: 'Explore 40+ authentic Telugu & Indian delicacies.', time: '10m ago', role: 'CUSTOMER', read: false, icon: '👋' },
        { id: 2, title: 'Special Offer Unlocked! 🔥', message: 'Enjoy flat 20% off on Hyderabadi Dum Biryani.', time: '1h ago', role: 'CUSTOMER', read: false, icon: '🏷️' },
        { id: 3, title: 'Store Online 🟢', message: 'FoodEase Royal Kitchen is actively accepting orders.', time: '15m ago', role: 'ADMIN', read: false, icon: '🟢' },
        { id: 4, title: 'Daily Report Ready 📊', message: 'Yesterday revenue reached ₹14,500 across 32 orders.', time: '3h ago', role: 'ADMIN', read: false, icon: '📈' }
      ];
      localStorage.setItem('demo_notifications', JSON.stringify(defaults));
      stored = JSON.stringify(defaults);
    }
    const all = JSON.parse(stored);
    const filtered = all.filter(n => n.role === roleKey);
    setNotifications(filtered);
  };

  useEffect(() => {
    loadNotifications();

    const handleUpdate = () => loadNotifications();
    window.addEventListener('foodease_notification', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('foodease_notification', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [roleKey]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    const all = JSON.parse(localStorage.getItem('demo_notifications') || '[]');
    const updated = all.map(n => n.role === roleKey ? { ...n, read: true } : n);
    localStorage.setItem('demo_notifications', JSON.stringify(updated));
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id, e) => {
    e.stopPropagation();
    const all = JSON.parse(localStorage.getItem('demo_notifications') || '[]');
    const updated = all.filter(n => n.id !== id);
    localStorage.setItem('demo_notifications', JSON.stringify(updated));
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button 
        onClick={() => setOpen(!open)}
        style={{
          background: 'var(--glass)',
          border: '1px solid var(--glass-border)',
          borderRadius: '50%',
          width: '42px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          fontSize: '1.2rem',
          color: 'var(--text-primary)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s, background 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        title="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-3px',
            right: '-3px',
            background: '#EF476F',
            color: 'white',
            fontSize: '0.7rem',
            fontWeight: 800,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--bg-primary)',
            animation: 'pulse 1.5s infinite'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '52px',
          right: 0,
          width: '360px',
          maxHeight: '480px',
          background: 'var(--bg-card)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.35)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.1rem' }}>🔔</span>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {isAdmin ? 'Admin Alerts' : 'Notifications'}
              </h4>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={markAllRead}
                style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', padding: '4px 8px' }}
              >
                Mark all read
              </button>
            )}
          </div>

          <div style={{ overflowY: 'auto', flex: 1, padding: '8px 0' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🔕</div>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>No notifications right now</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n.id}
                  style={{
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    background: n.read ? 'transparent' : 'rgba(255, 107, 53, 0.08)',
                    borderBottom: '1px solid var(--glass-border)',
                    position: 'relative',
                    transition: 'background 0.2s'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginTop: '2px' }}>
                    {n.icon || '📩'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{n.title}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.time}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {n.message}
                    </p>
                  </div>
                  <button 
                    onClick={(e) => clearNotification(n.id, e)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1rem', cursor: 'pointer', padding: '2px 4px', opacity: 0.6 }}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
