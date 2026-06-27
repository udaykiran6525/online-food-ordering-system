import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { restaurantApi } from '../../api/restaurantApi';
import toast from 'react-hot-toast';

const STORE_LOGO_SVG = (
  <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
    <path d="M6 24c0-6.627 5.373-12 12-12s12 5.373 12 12H6z" fill="url(#saffron_prof)"/>
    <path d="M18 6v6M18 6c2 0 4-1 4-1" stroke="#FF9933" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M4 26h28v2c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-2z" fill="#FF6B35"/>
    <defs>
      <linearGradient id="saffron_prof" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD166" />
        <stop offset="100%" stopColor="#FF6B35" />
      </linearGradient>
    </defs>
  </svg>
);

export default function AdminProfile() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    businessTiming: '10:00 AM - 11:00 PM',
    gstNumber: '29ABCDE1234F1Z5',
    logoUrl: '',
    cuisineType: 'Indian, Multi-Cuisine'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.restaurantName || 'FoodEase Flagship Restaurant',
        description: 'Authentic Indian and Telugu delicacies freshly prepared with rich traditional spices.',
        logoUrl: ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo size must be under 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, logoUrl: reader.result }));
      toast.success('Logo preview updated!');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const restaurantId = user?.restaurantId || 1;
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        businessTiming: formData.businessTiming.trim(),
        gstNumber: formData.gstNumber.trim()
      };

      await restaurantApi.updateRestaurant(restaurantId, payload);
      toast.success('Restaurant profile updated successfully! 🏪');

      const updatedUser = {
        ...user,
        restaurantName: formData.name.trim()
      };
      login(updatedUser);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save restaurant details');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <div className="dashboard-header" style={{ marginBottom: '24px' }}>
        <h1>Restaurant Profile & Business Settings 🏪</h1>
        <p>Configure your restaurant display details, business hours, and tax credentials</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '16px',
                background: formData.logoUrl ? `url(${formData.logoUrl}) center/cover no-repeat` : 'linear-gradient(135deg, #4CC9F0, #1A1A2E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(76, 201, 240, 0.3)',
                border: '2px solid #4CC9F0'
              }}
            >
              {!formData.logoUrl && STORE_LOGO_SVG}
            </div>
            <label 
              htmlFor="logo-upload" 
              style={{
                position: 'absolute',
                bottom: '-6px',
                right: '-6px',
                background: '#4CC9F0',
                color: '#1A1A2E',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                fontWeight: 700
              }}
              title="Upload Logo"
            >
              ⬆️
            </label>
            <input type="file" id="logo-upload" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '4px' }}>{formData.name}</h2>
            <p style={{ color: '#4CC9F0', fontWeight: 600, marginBottom: '8px' }}>{formData.cuisineType}</p>
            <span className="badge" style={{ background: 'rgba(76,201,240,0.2)', color: '#4CC9F0', border: '1px solid #4CC9F0' }}>Active Partner 🟢</span>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
            📝 Basic Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label>Restaurant Name *</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Cuisine Specialties</label>
              <input type="text" className="form-control" name="cuisineType" value={formData.cuisineType} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Restaurant Description</label>
            <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleChange}></textarea>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
            🕒 Operations & Legal (GST)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label>Business Operating Hours</label>
              <input type="text" className="form-control" name="businessTiming" placeholder="e.g. 10:00 AM - 11:30 PM" value={formData.businessTiming} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>GST Identification Number (GSTIN)</label>
              <input type="text" className="form-control" name="gstNumber" placeholder="29ABCDE1234F1Z5" value={formData.gstNumber} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn" disabled={saving} style={{ background: '#4CC9F0', color: '#1A1A2E', padding: '12px 36px', fontSize: '1.05rem', fontWeight: 700 }}>
            {saving ? 'Updating Store...' : '💾 Save Store Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
