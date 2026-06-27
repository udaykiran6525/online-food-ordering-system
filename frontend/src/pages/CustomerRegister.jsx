import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

const AUTH_LOGO_SVG = (
  <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
    <path d="M6 24c0-6.627 5.373-12 12-12s12 5.373 12 12H6z" fill="url(#saffron_auth)"/>
    <path d="M18 6v6M18 6c2 0 4-1 4-1" stroke="#FF9933" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M4 26h28v2c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-2z" fill="#FF6B35"/>
    <defs>
      <linearGradient id="saffron_auth" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD166" />
        <stop offset="100%" stopColor="#FF6B35" />
      </linearGradient>
    </defs>
  </svg>
);

export default function CustomerRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email format';
    if (!form.phone) e.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone)) e.phone = 'Phone must be 10 digits';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), password: form.password };
      const res = await authApi.registerCustomer(payload);
      login(res.data);
      toast.success('✨ Welcome to FOODEASE!');
      navigate('/dashboard');
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

  const handleChange = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  const strength = form.password.length >= 8 ? 'strong' : form.password.length >= 6 ? 'medium' : form.password.length > 0 ? 'weak' : '';

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-blob" />
        <div className="auth-blob" style={{ background: 'radial-gradient(circle,#4CC9F0,transparent)', top: 'auto', bottom: '-20%', right: 'auto', left: '10%' }} />
      </div>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-card-header">
            <div className="logo-icon" style={{margin:'0 auto 16px', background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {AUTH_LOGO_SVG}
            </div>
            <h1>Create Account</h1>
            <p>Join FOODEASE and start ordering</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className={`form-input ${errors.name ? 'error' : ''}`} placeholder="John Doe" value={form.name} onChange={handleChange('name')} />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className={`form-input ${errors.email ? 'error' : ''}`} type="email" placeholder="john@example.com" value={form.email} onChange={handleChange('email')} />
              {errors.email && <span className="form-error">⚠️ {errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className={`form-input ${errors.phone ? 'error' : ''}`} type="tel" placeholder="9876543210" value={form.phone} onChange={handleChange('phone')} maxLength={10} />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input className={`form-input ${errors.password ? 'error' : ''}`} type="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange('password')} />
              {form.password && (
                <div className={`password-strength ${strength}`}>
                  <div className="strength-bar"><div className="strength-fill" /></div>
                  <span>{strength === 'strong' ? '💪 Strong' : strength === 'medium' ? '👍 Medium' : '⚠️ Weak'}</span>
                </div>
              )}
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input className={`form-input ${errors.confirm ? 'error' : ''}`} type="password" placeholder="Re-enter password" value={form.confirm} onChange={handleChange('confirm')} />
              {errors.confirm && <span className="form-error">{errors.confirm}</span>}
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? <><span className="btn-spinner" /> Creating Account...</> : '🚀 Create Account'}
            </button>
          </form>

          <div className="auth-divider"><span>OR</span></div>
          <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
          <p className="auth-link" style={{marginTop:'8px'}}>
            Register as restaurant? <Link to="/register/restaurant">Restaurant Admin</Link>
          </p>
        </div>

        <div className="auth-info-panel">
          <h2>Experience Authentic <br /><span style={{color:'var(--primary)'}}>Indian Cuisine</span></h2>
          <p>Indulge in royal Hyderabadi Biryanis, crispy Masala Dosas, traditional Thalis, and richly spiced curries delivered hot to your doorstep.</p>
          <div className="auth-benefits">
            {['🍛 Order Royal Indian Biryanis & Thalis', '🛵 Live WebSocket order tracking', '💳 Bank-grade encrypted secure payments', '⭐ Exclusive restaurant member deals', '🎁 First order discount on South Indian Feast'].map((b, i) => (
              <div className="auth-benefit" key={i}>
                <div className="benefit-check">✓</div>
                <span>{b}</span>
              </div>
            ))}
          </div>
          <div className="auth-food-emojis" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '28px', fontSize: '2.2rem' }}>
            {['🍛','🫓','🍲','🥘','🧉','🥟','🥣','🍽️'].map((e, i) => (
              <span key={i} style={{ animation: 'float 4s ease-in-out infinite', animationDelay: `${i * 0.4}s`, display: 'inline-block' }}>{e}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
