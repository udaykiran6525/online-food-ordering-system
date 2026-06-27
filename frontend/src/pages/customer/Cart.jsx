import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function Cart() {
  const { cart, loading, cartTotal, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (loading && !cart) {
    return <div className="spinner-container"><div className="spinner"></div></div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="animate-fade-in text-center" style={{ paddingTop: '10vh' }}>
        <div style={{ fontSize: '6rem', marginBottom: '20px', opacity: 0.8 }}>🛒</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Looks like you haven't added any food yet.</p>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          Browse Menu
        </button>
      </div>
    );
  }

  const deliveryFee = 40;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <div className="animate-fade-in">
      <div className="dashboard-header">
        <h1>Your Cart 🛒</h1>
        <p>Review your items before checkout</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.items.map((item) => (
            <div key={item.id} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '16px' }}>
              <img 
                src={item.foodItemImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&w=200&q=80'} 
                alt={item.foodItemName}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&w=200&q=80';
                }}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{item.foodItemName}</h3>
                <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}>
                  {formatPrice(item.foodItemPrice)}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-input)', padding: '6px', borderRadius: '30px', border: '1px solid var(--glass-border)' }}>
                <button 
                  className="btn btn-ghost" 
                  style={{ width: 32, height: 32, padding: 0, borderRadius: '50%' }}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >-</button>
                <span style={{ width: 20, textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                <button 
                  className="btn btn-ghost" 
                  style={{ width: 32, height: 32, padding: 0, borderRadius: '50%' }}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >+</button>
              </div>
              <div style={{ fontWeight: 800, width: '100px', textAlign: 'right' }}>
                {formatPrice(item.subtotal)}
              </div>
              <button 
                className="btn btn-danger" 
                style={{ padding: '8px 12px', borderRadius: '8px' }}
                onClick={() => removeItem(item.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div>
          <div className="card" style={{ position: 'sticky', top: '24px' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-secondary)' }}>
              <span>Item Total ({cart.itemCount} items)</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-secondary)' }}>
              <span>Delivery Fee</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: 'var(--text-secondary)' }}>
              <span>Taxes</span>
              <span>Included</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', borderTop: '1px dashed var(--glass-border)', paddingTop: '16px', fontSize: '1.2rem', fontWeight: 800 }}>
              <span>Grand Total</span>
              <span style={{ color: 'var(--primary)' }}>{formatPrice(grandTotal)}</span>
            </div>

            <button 
              className="btn btn-primary w-full" 
              style={{ fontSize: '1.1rem', padding: '14px' }}
              onClick={() => navigate('/dashboard/checkout')}
            >
              Proceed to Checkout →
            </button>
            
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '16px' }}>
              Secure checkout. 100% genuine products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
