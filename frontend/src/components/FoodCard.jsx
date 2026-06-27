import { useState, memo } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

const FoodCard = memo(function FoodCard({ food }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist: toggleGlobalWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const wishlist = isInWishlist(food?.id);

  const handleAdd = async () => {
    try {
      await addToCart(food.id, quantity);
      toast.success(`${quantity}x ${food.name} added to cart! 🛒`);
      setQuantity(1);
    } catch (err) {
      toast.error('Failed to add item to cart');
    }
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    toggleGlobalWishlist(food);
    toast.success(wishlist ? 'Removed from wishlist' : 'Added to wishlist ❤️');
  };

  return (
    <div className="card food-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', border: '1px solid var(--glass-border)' }}>
      <div style={{ height: '210px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={food.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
          alt={food.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(26, 26, 46, 0.85)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, color: '#FFD166', border: '1px solid rgba(255, 209, 102, 0.3)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          ⭐ {food.rating || '4.5'}
        </div>

        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ background: food.vegetarian ? '#06D6A0' : '#EF476F', padding: '4px', borderRadius: '6px', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }} title={food.vegetarian ? 'Pure Vegetarian' : 'Non-Vegetarian'}>
            <div style={{ width: 10, height: 10, background: 'white', borderRadius: food.vegetarian ? '50%' : '2px' }} />
          </div>

          <button 
            onClick={toggleWishlist}
            style={{ background: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', fontSize: '0.9rem', transition: 'transform 0.2s' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            title="Wishlist"
          >
            {wishlist ? '❤️' : '🤍'}
          </button>
        </div>

        {food.offerBadge && (
          <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.5px', boxShadow: '0 4px 16px rgba(255, 107, 107, 0.5)', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.4)', animation: 'pulse 2s infinite' }}>
            🏷️ {food.offerBadge}
          </div>
        )}
      </div>

      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)', lineHeight: 1.3 }}>{food.name}</h3>
          <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.15rem', marginLeft: '8px' }}>{formatPrice(food.price)}</span>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px', lineHeight: 1.5, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {food.description || 'Authentic Indian delicacy prepared with freshly ground aromatic spices.'}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--glass-border)', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            ⏱️ {food.preparationTime || '25-35 mins'}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {food.available && (
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden' }}>
                <button 
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '4px 10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}
                >
                  -
                </button>
                <span style={{ padding: '0 6px', fontSize: '0.9rem', fontWeight: 600, minWidth: '18px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button 
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '4px 10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}
                >
                  +
                </button>
              </div>
            )}

            <button 
              className="btn btn-primary btn-sm" 
              onClick={handleAdd}
              disabled={!food.available}
              style={{ borderRadius: '8px', padding: '8px 16px', fontWeight: 600, boxShadow: food.available ? '0 4px 12px rgba(255, 107, 107, 0.3)' : 'none' }}
            >
              {food.available ? 'Add 🛒' : 'Sold Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FoodCard;
