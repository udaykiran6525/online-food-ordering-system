import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function RestaurantRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', restaurantName: '', email: '', phone: '', password: '', confirm: '', address: '', description: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.restaurantName.trim()) e.restaurantName = 'Restaurant name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone || !/^\d{10}$/.test(form.phone)) e.phone = 'Valid 10-digit phone required';
    if (!form.password || form.password.length < 6) e.password = 'Password min 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        ...form,
        name: form.name?.trim(),
        restaurantName: form.restaurantName?.trim(),
        email: form.email?.trim(),
        phone: form.phone?.trim()
      };
      const res = await authApi.registerRestaurant(payload);
      login(res.data);
      toast.success('🏪 Restaurant registered successfully!');
      navigate('/admin');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      if (msg.toLowerCase().includes('already registered')) {
        const exactMsg = 'Email already registered. Please login instead.';
        setErrors({ email: exactMsg });
        toast.error(exactMsg);
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (f) => (e) => {
    setForm(p => ({ ...p, [f]: e.target.value }));
    if (errors[f]) setErrors(p => ({ ...p, [f]: '' }));
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-blob" style={{background:'radial-gradient(circle,#4CC9F0,transparent)'}} />
        <div className="auth-blob" style={{bottom:'-20%',left:'10%'}} />
      </div>
      <div className="auth-container">
        <div className="auth-card" style={{maxHeight:'90vh',overflowY:'auto'}}>
          <div className="auth-card-header">
            <div className="logo-icon" style={{margin:'0 auto 16px'}}>🏪</div>
            <h1>Register Restaurant</h1>
            <p>Start selling on FOODEASE today</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
              <div className="form-group">
                <label className="form-label">Your Full Name</label>
                <input className={`form-input ${errors.name?'error':''}`} placeholder="John Doe" value={form.name} onChange={handleChange('name')} />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Restaurant Name</label>
                <input className={`form-input ${errors.restaurantName?'error':''}`} placeholder="Spice Garden" value={form.restaurantName} onChange={handleChange('restaurantName')} />
                {errors.restaurantName && <span className="form-error">{errors.restaurantName}</span>}
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className={`form-input ${errors.email?'error':''}`} type="email" placeholder="owner@restaurant.com" value={form.email} onChange={handleChange('email')} />
                {errors.email && <span className="form-error">⚠️ {errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className={`form-input ${errors.phone?'error':''}`} type="tel" placeholder="9876543210" value={form.phone} onChange={handleChange('phone')} maxLength={10} />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Restaurant Address</label>
              <input className="form-input" placeholder="123 Main St, City" value={form.address} onChange={handleChange('address')} />
            </div>
            <div className="form-group">
              <label className="form-label">Description (optional)</label>
              <textarea className="form-input" rows={2} placeholder="Tell customers about your restaurant..." value={form.description} onChange={handleChange('description')} style={{resize:'vertical'}} />
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className={`form-input ${errors.password?'error':''}`} type="password" placeholder="Min 6 chars" value={form.password} onChange={handleChange('password')} />
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input className={`form-input ${errors.confirm?'error':''}`} type="password" placeholder="Re-enter" value={form.confirm} onChange={handleChange('confirm')} />
                {errors.confirm && <span className="form-error">{errors.confirm}</span>}
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? <><span className="btn-spinner" /> Registering...</> : '🏪 Register Restaurant'}
            </button>
          </form>
          <div className="auth-divider"><span>OR</span></div>
          <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
          <p className="auth-link" style={{marginTop:'8px'}}>Order as customer? <Link to="/register/customer">Customer Registration</Link></p>
        </div>
        <div className="auth-info-panel">
          <h2>Grow Your <span style={{color:'var(--primary)'}}>Restaurant</span> Business</h2>
          <p>Join 500+ restaurants already earning more with FOODEASE.</p>
          <div className="auth-benefits">
            {['📊 Real-time order management', '📈 Revenue analytics', '🎛️ Easy menu management', '💬 Customer management', '⚡ Instant order alerts'].map((b, i) => (
              <div className="auth-benefit" key={i}><div className="benefit-check">✓</div><span>{b}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
