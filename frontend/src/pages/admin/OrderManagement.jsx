import { useState, useEffect } from 'react';
import { orderApi } from '../../api/orderApi';
import { useAuth } from '../../context/AuthContext';
import useWebSocket from '../../hooks/useWebSocket';
import { formatPrice, formatDate, getStatusLabel, generateOrderId } from '../../utils/helpers';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

export default function OrderManagement() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    if (user?.restaurantId || user?.role === 'ADMIN') fetchOrders();
  }, [user]);

  useEffect(() => {
    const handleSync = () => {
      if (user?.restaurantId || user?.role === 'ADMIN') fetchOrders();
    };
    window.addEventListener('foodease_sync', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('foodease_sync', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [user]);

  const fetchOrders = async () => {
    try {
      const rid = user?.restaurantId || 1;
      const res = await orderApi.getRestaurantOrders(rid);
      setOrders(res.data?.content || res.data || []);
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useWebSocket('/topic/new-orders', (message) => {
    if (message && message.restaurantId === (user?.restaurantId || 1)) {
      toast.success('🔔 New Order Received!', { duration: 5000 });
      fetchOrders();
    }
  });

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderApi.updateStatus(orderId, newStatus);
      toast.success('Order status updated');
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const safeOrders = Array.isArray(orders) ? orders : [];
  const filteredOrders = filter === 'ALL' ? safeOrders : safeOrders.filter(o => o.status === filter);

  if (loading) return <div className="spinner-container"><div className="spinner"></div></div>;

  return (
    <div className="animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Live Orders 📦</h1>
          <p>Manage incoming orders and update their status in real-time</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '20px' }}>
        <button 
          className={`btn ${filter === 'ALL' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setFilter('ALL')}
          style={{ borderRadius: '20px' }}
        >
          All Orders ({orders.length})
        </button>
        {['PENDING', 'PREPARING', 'OUT_FOR_DELIVERY'].map(status => (
          <button 
            key={status}
            className={`btn ${filter === status ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setFilter(status)}
            style={{ borderRadius: '20px' }}
          >
            {getStatusLabel(status)} ({orders.filter(o => o.status === status).length})
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredOrders.length === 0 ? (
          <div className="card text-center" style={{ padding: '60px 20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😴</div>
            <h3>No orders found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Waiting for new orders to arrive.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="card" style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '4px' }}>{generateOrderId(order.id)}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{formatDate(order.createdAt)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className={`badge status-${order.status}`} style={{ marginBottom: '4px' }}>
                      {getStatusLabel(order.status)}
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {formatPrice(order.totalAmount)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Order Items</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.orderItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                          <span><span style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.quantity}x</span> {item.foodItemName}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Customer Details</h4>
                    <div style={{ fontSize: '0.9rem', marginBottom: '4px', fontWeight: 600 }}>{order.userName}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: 1.4 }}>{order.deliveryAddress}</div>
                    <div style={{ fontSize: '0.85rem' }}>💳 {order.paymentMethod.replace(/_/g, ' ')}</div>
                  </div>
                </div>
              </div>

              <div style={{ width: '200px', borderLeft: '1px solid var(--glass-border)', paddingLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Update Status</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <select 
                    className="form-input" 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{ background: 'var(--bg-input)', color: 'white', fontWeight: 600 }}
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status} style={{ color: 'black' }}>
                        {getStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </div>

                {(order.status === 'PENDING' || order.status === 'CONFIRMED') && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <button className="btn btn-success btn-sm w-full" onClick={() => handleStatusChange(order.id, 'PREPARING')} style={{ padding: '8px' }}>Accept</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleStatusChange(order.id, 'CANCELLED')} style={{ padding: '8px' }}>✕</button>
                  </div>
                )}
                {order.status === 'PREPARING' && (
                  <button className="btn btn-primary btn-sm w-full" onClick={() => handleStatusChange(order.id, 'OUT_FOR_DELIVERY')} style={{ marginTop: '16px', padding: '8px' }}>Dispatch Order 🛵</button>
                )}
                {order.status === 'OUT_FOR_DELIVERY' && (
                  <button className="btn btn-success btn-sm w-full" onClick={() => handleStatusChange(order.id, 'DELIVERED')} style={{ marginTop: '16px', padding: '8px' }}>Mark Delivered ✓</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
