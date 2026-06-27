import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderApi } from '../../api/orderApi';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { cart, cartTotal, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: user?.address || '',
    specialInstructions: '',
    paymentMethod: 'CASH_ON_DELIVERY'
  });
  const [loading, setLoading] = useState(false);

  if (!cart || cart.items.length === 0) {
    navigate('/dashboard');
    return null;
  }

  const deliveryFee = 40;
  const restaurantId = cart.items[0]?.restaurantId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.address.trim()) {
      toast.error('Delivery address is required');
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
        restaurantId,
        deliveryAddress: form.address,
        specialInstructions: form.specialInstructions,
        paymentMethod: form.paymentMethod
      };
      
      const res = await orderApi.place(payload);
      toast.success('Order placed successfully! 📦');
      await fetchCart();
      navigate(`/dashboard/tracking/${res.data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="dashboard-header">
        <h1>Checkout 💳</h1>
        <p>Complete your order details</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
        <form onSubmit={handleSubmit}>
          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: 'var(--primary)', color: 'white', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>1</span>
              Delivery Details
            </h3>
            
            <div className="form-group">
              <label className="form-label">Delivery Address</label>
              <textarea 
                className="form-input" 
                rows="3" 
                placeholder="Enter complete address..."
                value={form.address}
                onChange={e => setForm({...form, address: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Special Instructions (Optional)</label>
              <input 
                className="form-input" 
                placeholder="E.g., Don't ring the bell, less spicy"
                value={form.specialInstructions}
                onChange={e => setForm({...form, specialInstructions: e.target.value})}
              />
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: 'var(--primary)', color: 'white', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>2</span>
              Payment Method
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'CASH_ON_DELIVERY', label: '💵 Cash on Delivery', desc: 'Pay when you receive the order' },
                { id: 'UPI', label: '📱 UPI / GPay / PhonePe', desc: 'Instant payment via UPI apps' },
                { id: 'CREDIT_CARD', label: '💳 Credit / Debit Card', desc: 'Secure card payment' }
              ].map(method => (
                <label 
                  key={method.id}
                  style={{ 
                    display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', 
                    border: `2px solid ${form.paymentMethod === method.id ? 'var(--primary)' : 'var(--glass-border)'}`, 
                    borderRadius: '12px', cursor: 'pointer', background: form.paymentMethod === method.id ? 'rgba(255,107,53,0.05)' : 'transparent',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value={method.id} 
                    checked={form.paymentMethod === method.id}
                    onChange={e => setForm({...form, paymentMethod: e.target.value})}
                    style={{ marginTop: '4px', accentColor: 'var(--primary)', transform: 'scale(1.2)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{method.label}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{method.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </form>

        <div>
          <div className="card" style={{ position: 'sticky', top: '24px' }}>
            <h3 style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--glass-border)' }}>Payable Amount</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.2rem', fontWeight: 800 }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>{formatPrice(grandTotal)}</span>
            </div>

            <div style={{ background: 'rgba(6,214,160,0.1)', border: '1px dashed var(--success)', padding: '12px', borderRadius: '8px', color: 'var(--success)', fontSize: '0.85rem', marginBottom: '24px', textAlign: 'center' }}>
              ✓ Including {formatPrice(deliveryFee)} delivery fee & taxes
            </div>

            <button 
              className="btn btn-primary w-full" 
              style={{ fontSize: '1.1rem', padding: '16px' }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <span className="btn-spinner" /> : `Pay ${formatPrice(grandTotal)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
