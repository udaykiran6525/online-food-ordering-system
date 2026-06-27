import { useWishlist } from '../../context/WishlistContext';
import FoodCard from '../../components/FoodCard';
import { useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist, loading } = useWishlist();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            ❤️ My Favorite Dishes
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Your saved authentic Indian delicacies ready to order
          </p>
        </div>
      </div>

      {loading ? (
        <div className="spinner-container"><div className="spinner"></div></div>
      ) : wishlist.length === 0 ? (
        <div className="card text-center" style={{ padding: '80px 20px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '20px' }}>
          <div style={{ fontSize: '4.5rem', marginBottom: '16px', animation: 'float 3s ease-in-out infinite' }}>🤍</div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 8px 0' }}>Your Wishlist is Empty</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            Explore our rich menu of royal Hyderabadi Biryanis, crispy South Indian Dosas, and decadent sweets to save your favorites!
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
            style={{ padding: '12px 28px', borderRadius: '30px', fontWeight: 700, boxShadow: '0 8px 24px rgba(255,107,53,0.3)' }}
          >
            🍽️ Explore Indian Menu
          </button>
        </div>
      ) : (
        <div className="food-grid">
          {wishlist.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}
