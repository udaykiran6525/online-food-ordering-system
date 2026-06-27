import { useState, useEffect } from 'react';
import { foodApi, categoryApi } from '../../api/foodApi';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function MenuManagement() {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', categoryId: '', 
    imageUrl: '', vegetarian: true, available: true, preparationTime: ''
  });

  useEffect(() => {
    if (user?.restaurantId || user?.role === 'ADMIN') {
      fetchCategories();
      fetchFoods();
    }
  }, [user]);

  useEffect(() => {
    const handleSync = () => {
      if (user?.restaurantId || user?.role === 'ADMIN') {
        fetchCategories();
        fetchFoods();
      }
    };
    window.addEventListener('foodease_sync', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('foodease_sync', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [user]);

  const fetchCategories = async () => {
    try {
      const rid = user?.restaurantId || 1;
      const res = await categoryApi.getByRestaurant(rid);
      setCategories(res.data?.content || res.data || []);
    } catch (err) {
      toast.error('Failed to load categories');
    }
  };

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const rid = user?.restaurantId || 1;
      const res = await foodApi.getByRestaurant(rid);
      setFoods(res.data?.content || res.data || []);
    } catch (err) {
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (food = null) => {
    if (food) {
      setForm({ ...food });
      setEditingId(food.id);
    } else {
      setForm({
        name: '', description: '', price: '', categoryId: categories[0]?.id || '', 
        imageUrl: '', vegetarian: true, available: true, preparationTime: '20-30 mins'
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, restaurantId: user.restaurantId };
      if (editingId) {
        await foodApi.update(editingId, payload);
        toast.success('Food item updated');
      } else {
        await foodApi.create(payload);
        toast.success('Food item created');
      }
      setIsModalOpen(false);
      fetchFoods();
    } catch (err) {
      toast.error('Failed to save food item');
    }
  };

  const handleToggle = async (id) => {
    try {
      await foodApi.toggle(id);
      toast.success('Availability updated');
      fetchFoods();
    } catch (err) {
      toast.error('Failed to update availability');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this food item?')) {
      try {
        await foodApi.delete(id);
        toast.success('Food item deleted');
        fetchFoods();
      } catch (err) {
        toast.error('Failed to delete item');
      }
    }
  };

  if (loading) return <div className="spinner-container"><div className="spinner"></div></div>;

  return (
    <div className="animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Menu Management 🍽️</h1>
          <p>Add, edit, or remove food items from your restaurant menu</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Add Food Item</button>
      </div>

      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>No food items found</td></tr>
            ) : (
              foods.map(food => (
                <tr key={food.id}>
                  <td>
                    <img 
                      src={food.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=80'} 
                      alt={food.name} 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=80';
                      }}
                      style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {food.vegetarian ? <span style={{ color: 'var(--success)' }}>🟢</span> : <span style={{ color: 'var(--danger)' }}>🔴</span>}
                      {food.name}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{food.categoryName}</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{formatPrice(food.price)}</td>
                  <td>
                    <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input type="checkbox" checked={food.available} onChange={() => handleToggle(food.id)} style={{ marginRight: '8px', accentColor: 'var(--success)' }} />
                      <span className={`badge ${food.available ? 'badge-success' : 'badge-danger'}`}>
                        {food.available ? 'Available' : 'Out of Stock'}
                      </span>
                    </label>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleOpenModal(food)} style={{ marginRight: '8px' }}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(food.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, overflowY: 'auto', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
            <h2 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Food Item' : 'Add Food Item'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input type="number" step="0.01" className="form-input" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input" value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} required style={{ background: 'var(--bg-input)' }}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id} style={{ color: 'black' }}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preparation Time</label>
                  <input className="form-input" placeholder="e.g., 20-30 mins" value={form.preparationTime} onChange={e => setForm({...form, preparationTime: e.target.value})} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input className="form-input" placeholder="https://..." value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" rows="2" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>

              <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.vegetarian} onChange={e => setForm({...form, vegetarian: e.target.checked})} style={{ accentColor: 'var(--success)' }} />
                  Vegetarian
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.available} onChange={e => setForm({...form, available: e.target.checked})} style={{ accentColor: 'var(--primary)' }} />
                  Available Now
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingId ? 'Update Item' : 'Add Item'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
