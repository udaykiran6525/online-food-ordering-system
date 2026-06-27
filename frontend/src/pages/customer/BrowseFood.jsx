import { useState, useEffect } from 'react';
import { foodApi, categoryApi } from '../../api/foodApi';
import FoodCard from '../../components/FoodCard';

export default function BrowseFood() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchFoods();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await categoryApi.getAll();
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const fetchFoods = async () => {
    setLoading(true);
    try {
      let res;
      if (selectedCategory) {
        res = await foodApi.getAll({ categoryId: selectedCategory, size: 50 });
      } else {
        res = await foodApi.getAll({ size: 50 });
      }
      setFoods(res.data.content || []);
    } catch (err) {
      console.error('Failed to fetch foods');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchFoods();
      return;
    }
    setLoading(true);
    try {
      const res = await foodApi.search(searchTerm, { size: 50 });
      setFoods(res.data.content || []);
      setSelectedCategory(null);
    } catch (err) {
      console.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Craving Something? 😋</h1>
          <p>Discover the best food & drinks from top restaurants</p>
        </div>
        <div className="header-actions">
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search pizza, burger..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '250px', background: 'var(--glass)' }}
            />
            <button type="submit" className="btn btn-primary btn-sm">🔍</button>
          </form>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px' }}>
        <button 
          className={`btn ${!selectedCategory ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setSelectedCategory(null)}
          style={{ whiteSpace: 'nowrap', borderRadius: '20px' }}
        >
          All Foods
        </button>
        {categories.map(cat => (
          <button 
            key={cat.id}
            className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setSelectedCategory(cat.id)}
            style={{ whiteSpace: 'nowrap', borderRadius: '20px' }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="spinner-container"><div className="spinner"></div></div>
      ) : foods.length === 0 ? (
        <div className="card text-center" style={{ padding: '60px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🍽️</div>
          <h3>No food items found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or category filter</p>
        </div>
      ) : (
        <div className="food-grid">
          {foods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}
