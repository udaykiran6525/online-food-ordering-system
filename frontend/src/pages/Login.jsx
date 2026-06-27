import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setErrors({ email: !form.email ? 'Email required' : '', password: !form.password ? 'Password required' : '' });
      return;
    }
    setLoading(true);
    try {
      const payload = { email: form.email.trim(), password: form.password };
      const res = await authApi.login(payload);
      login(res.data);
      toast.success(`👋 Welcome back, ${res.data.name}!`);
      navigate(res.data.role === 'ADMIN' ? '/admin' : '/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password.';
      toast.error(msg);
      setErrors({ password: 'Invalid credentials' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-blob" />
        <div className="auth-blob" style={{background:'radial-gradient(circle,#06D6A0,transparent)',bottom:'-20%',left:'10%',top:'auto'}} />
      </div>
      <div className="auth-container login-container">
        <div className="auth-card login-card">
          <div className="auth-card-header">
            <div className="logo-icon" style={{margin:'0 auto 16px',fontSize:'2rem'}}>🍔</div>
            <h1>Welcome Back!</h1>
            <p>Login to your FOODEASE account</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className={`form-input ${errors.email ? 'error' : ''}`}
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => { setForm(p => ({...p, email: e.target.value})); setErrors(p => ({...p, email: ''})); }}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className={`form-input ${errors.password ? 'error' : ''}`}
                type="password"
                placeholder="Your password"
                value={form.password}
                onChange={e => { setForm(p => ({...p, password: e.target.value})); setErrors(p => ({...p, password: ''})); }}
              />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? <><span className="btn-spinner" /> Logging in...</> : '🔐 Login'}
            </button>
          </form>

          <div className="auth-divider"><span>Don't have an account?</span></div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginTop:'8px'}}>
            <button className="btn btn-secondary w-full btn-sm" onClick={() => navigate('/register/customer')}>
              👤 Customer
            </button>
            <button className="btn btn-secondary w-full btn-sm" onClick={() => navigate('/register/restaurant')}>
              🏪 Restaurant
            </button>
          </div>

          <p style={{textAlign:'center',color:'var(--text-muted)',fontSize:'0.8rem',marginTop:'20px'}}>
            By logging in, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
