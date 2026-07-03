import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="auth-page role-page">
      <div className="auth-bg">
        <div className="auth-blob" style={{top:'-20%',right:'-10%'}} />
        <div className="auth-blob" style={{bottom:'-20%',left:'-10%',background:'radial-gradient(circle,#4CC9F0,transparent)'}} />
      </div>
      <div className="role-container">
        <div className="role-header">
          <div className="nav-logo" onClick={() => navigate('/')} style={{justifyContent:'center',cursor:'pointer',marginBottom:'8px'}}>
            <div className="logo-icon">🍔</div>
            <span className="logo-text">FOOD<span style={{color:'var(--primary)'}}>EASE</span></span>
          </div>
          <h1>Join FOODEASE</h1>
          <p>Choose how you want to get started</p>
        </div>

        <div className="role-cards">
          <div className="role-card" onClick={() => navigate('/register/customer')}>
            <div className="role-card-icon">🧑‍💻</div>
            <div className="role-card-badge">Most Popular</div>
            <h2>I'm a Customer</h2>
            <p>Order food from your favourite restaurants. Track live. Enjoy fast delivery.</p>
            <ul className="role-features">
              <li>✓ Browse 500+ restaurants</li>
              <li>✓ Real-time order tracking</li>
              <li>✓ Multiple payment options</li>
              <li>✓ Exclusive deals & offers</li>
            </ul>
            <button className="btn btn-primary w-full" style={{marginTop:'auto'}}>
              Start Ordering →
            </button>
          </div>

          <div className="role-card role-card-admin" onClick={() => navigate('/register/restaurant')}>
            <div className="role-card-icon">🏪</div>
            <h2>I'm a Restaurant Owner</h2>
            <p>Register your restaurant, manage your menu, and grow your business online.</p>
            <ul className="role-features">
              <li>✓ Restaurant management dashboard</li>
              <li>✓ Menu & category management</li>
              <li>✓ Real-time order management</li>
              <li>✓ Revenue analytics & reports</li>
            </ul>
            <button className="btn btn-ghost w-full" style={{marginTop:'auto', borderColor:'var(--primary)', color:'var(--primary)'}}>
              Register Restaurant →
            </button>
          </div>
        </div>

        <div className="role-login">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Login here</span>
        </div>
      </div>
    </div>
  );
}
