import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderApi } from '../../api/orderApi';
import useWebSocket from '../../hooks/useWebSocket';
import { getStatusLabel, formatPrice, formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const STATUS_STEPS = [
  { id: 'PENDING', label: 'Order Placed', icon: '📝' },
  { id: 'CONFIRMED', label: 'Confirmed', icon: '✅' },
  { id: 'PREPARING', label: 'Preparing', icon: '👨‍🍳' },
  { id: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: '🛵' },
  { id: 'DELIVERED', label: 'Delivered', icon: '📦' }
];

export default function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    const handleSync = () => fetchOrder();
    window.addEventListener('foodease_sync', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('foodease_sync', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await orderApi.getTracking(id);
      setOrder(res.data);
    } catch (err) {
      toast.error('Failed to load tracking details');
      navigate('/dashboard/orders');
    } finally {
      setLoading(false);
    }
  };

  useWebSocket(`/topic/order/${id}`, (message) => {
    if (message && message.status) {
      setOrder(prev => ({ ...prev, status: message.status }));
      toast.success(`Order Status Updated: ${getStatusLabel(message.status)}`, { icon: '🔔' });
    }
  }, !!order);

  if (loading) return <div className="spinner-container"><div className="spinner"></div></div>;
  if (!order) return null;

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.id === order.status);
  const isCancelled = order.status === 'CANCELLED';

  return (
    <div className="animate-fade-in">
      <div className="dashboard-header">
        <div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard/orders')} style={{ marginBottom: '16px' }}>
            ← Back to Orders
          </button>
          <h1>Track Order 📍</h1>
          <p>Order #{id.slice(0, 8)} • {formatDate(order.createdAt)}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Amount</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{formatPrice(order.totalAmount)}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
        <div className="card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {isCancelled ? (
            <div style={{ textAlign: 'center', color: 'var(--danger)', padding: '40px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>❌</div>
              <h2>Order Cancelled</h2>
              <p>We're sorry, but this order has been cancelled.</p>
            </div>
          ) : (
            <>
              <div style={{ fontSize: '4rem', marginBottom: '20px', animation: 'float 3s ease-in-out infinite' }}>
                {STATUS_STEPS[currentStepIndex > -1 ? currentStepIndex : 0].icon}
              </div>
              <h2 style={{ marginBottom: '40px', fontSize: '1.8rem', color: 'var(--primary)' }}>
                {getStatusLabel(order.status)}
              </h2>

              <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '4px', background: 'var(--glass-border)', zIndex: 0 }}>
                  <div style={{ 
                    height: '100%', 
                    background: 'var(--success)', 
                    width: `${currentStepIndex > 0 ? (currentStepIndex / (STATUS_STEPS.length - 1)) * 100 : 0}%`,
                    transition: 'width 1s ease-in-out'
                  }} />
                </div>

                {STATUS_STEPS.map((step, index) => {
                  const isCompleted = currentStepIndex >= index;
                  const isCurrent = currentStepIndex === index;
                  return (
                    <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '80px' }}>
                      <div style={{ 
                        width: '50px', height: '50px', borderRadius: '50%', 
                        background: isCompleted ? 'var(--success)' : 'var(--glass)',
                        border: `3px solid ${isCurrent ? 'white' : isCompleted ? 'var(--success)' : 'var(--glass-border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', color: 'white', marginBottom: '12px',
                        boxShadow: isCurrent ? '0 0 20px rgba(6,214,160,0.5)' : 'none',
                        transition: 'all 0.3s ease'
                      }}>
                        {isCompleted ? '✓' : index + 1}
                      </div>
                      <div style={{ 
                        fontSize: '0.8rem', fontWeight: isCurrent ? 700 : 500,
                        color: isCompleted ? 'white' : 'var(--text-muted)',
                        textAlign: 'center', lineHeight: 1.2
                      }}>
                        {step.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {currentStepIndex === 3 && (
                <div style={{ marginTop: '50px', background: 'rgba(255,107,53,0.1)', border: '1px solid var(--primary)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '2rem' }}>🛵</div>
                  <div>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '4px' }}>Rider is on the way</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Arriving in approximately 15-20 minutes</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="card" style={{ height: 'fit-content' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px', marginBottom: '16px' }}>Order Details</h3>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Delivery Address</h4>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{order.deliveryAddress}</p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Payment Method</h4>
            <p style={{ fontSize: '0.95rem' }}>{order.paymentMethod.replace(/_/g, ' ')}</p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Items ({order.orderItems.length})</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {order.orderItems.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>{item.quantity} × {item.foodItemName}</span>
                  <span style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
