import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../../api/orderApi';
import { formatPrice, formatDate, getStatusLabel, getStatusColor, generateOrderId } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await orderApi.getMyOrders();
      setOrders(res.data);
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner-container"><div className="spinner"></div></div>;

  return (
    <div className="animate-fade-in">
      <div className="dashboard-header">
        <h1>My Orders 📦</h1>
        <p>View your past and active orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="card text-center" style={{ padding: '60px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📜</div>
          <h3>No orders yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>You haven't placed any orders.</p>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Order Now</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map(order => (
            <div key={order.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{order.restaurantName}</h3>
                    <span className={`badge status-${order.status}`}>{getStatusLabel(order.status)}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {generateOrderId(order.id)} • {formatDate(order.createdAt)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {formatPrice(order.totalAmount)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {order.orderItems.length} items
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                {order.orderItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-input)', padding: '8px 12px', borderRadius: '8px', minWidth: 'max-content' }}>
                    <div style={{ fontWeight: 600 }}>{item.quantity} ×</div>
                    <div>{item.foodItemName}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                {(order.status !== 'DELIVERED' && order.status !== 'CANCELLED') && (
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/dashboard/tracking/${order.id}`)}
                  >
                    📍 Track Order
                  </button>
                )}
                {order.status === 'DELIVERED' && (
                  <button className="btn btn-secondary btn-sm">⭐ Rate Order</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
