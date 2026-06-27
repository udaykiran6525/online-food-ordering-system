import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Landing.css';

const STATS = [
  { value: 50000, label: 'Happy Customers', suffix: '+', icon: '😊' },
  { value: 500, label: 'Restaurants', suffix: '+', icon: '🏪' },
  { value: 1200000, label: 'Orders Delivered', suffix: '+', icon: '🛵' },
  { value: 4.9, label: 'App Rating', suffix: '★', icon: '⭐' },
];

const FEATURES = [
  { icon: '⚡', title: 'Fast Delivery', desc: 'Get your food delivered in under 30 minutes. Real-time tracking at every step.' },
  { icon: '📍', title: 'Live Tracking', desc: 'Track your order live from kitchen to doorstep with real-time WebSocket updates.' },
  { icon: '🔒', title: 'Secure Payments', desc: 'Multiple payment options with bank-grade encryption and security.' },
  { icon: '🏪', title: 'Multiple Restaurants', desc: 'Choose from hundreds of restaurants with diverse cuisines.' },
  { icon: '🎯', title: 'Easy Ordering', desc: 'Intuitive one-click ordering with a smart cart and seamless checkout.' },
  { icon: '✨', title: 'Premium Experience', desc: 'Curated menus, chef specials, and exclusive restaurant deals.' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Software Engineer', text: 'FOODEASE is incredible! Food arrives hot and on time. The tracking feature is a game-changer!', avatar: 'PS', rating: 5 },
  { name: 'Rahul Verma', role: 'Business Owner', text: 'Best food ordering app I\'ve used. Wide variety of restaurants and lightning-fast delivery.', avatar: 'RV', rating: 5 },
  { name: 'Ananya Singh', role: 'Student', text: 'Super convenient! Love the interface and how easy it is to reorder my favorites.', avatar: 'AS', rating: 5 },
];

function useCountUp(target, duration = 2000, isVisible) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, isVisible]);
  return count;
}

const StatItem = ({ stat, isVisible }) => {
  const count = useCountUp(stat.value, 2000, isVisible);
  const displayValue = stat.value === 4.9 ? count.toFixed(1) : count.toLocaleString('en-IN');
  return (
    <div className="stat-item">
      <span className="stat-emoji">{stat.icon}</span>
      <div className="stat-number">{displayValue}{stat.suffix}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
};

const LANDING_LOGO_SVG = (
  <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
    <path d="M6 24c0-6.627 5.373-12 12-12s12 5.373 12 12H6z" fill="url(#saffron_lnd)"/>
    <path d="M18 6v6M18 6c2 0 4-1 4-1" stroke="#FF9933" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M4 26h28v2c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-2z" fill="#FF6B35"/>
    <defs>
      <linearGradient id="saffron_lnd" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD166" />
        <stop offset="100%" stopColor="#FF6B35" />
      </linearGradient>
    </defs>
  </svg>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    if (user) navigate(user.role === 'ADMIN' ? '/admin' : '/dashboard');
    else navigate('/get-started');
  };

  return (
    <div className="landing">
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => window.scrollTo(0,0)}>
            <div className="logo-icon" style={{background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {LANDING_LOGO_SVG}
            </div>
            <span className="logo-text">FOOD<span>EASE</span></span>
          </div>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
          <div className="nav-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-primary btn-sm" onClick={handleGetStarted}>Get Started</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-bg">
          <div className="hero-blob blob-1" />
          <div className="hero-blob blob-2" />
          <div className="hero-blob blob-3" />
          <div className="hero-grid" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">🚀 #1 Food Delivery Platform</div>
              <h1 className="hero-title">
                Order Your <span className="gradient-text">Favorite Food</span>
                <br />Anytime, Anywhere
              </h1>
              <p className="hero-subtitle">
                Experience lightning-fast delivery with real-time tracking. 
                Choose from 500+ restaurants and 10,000+ authentic Indian dishes crafted to perfection.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary btn-lg" onClick={handleGetStarted}>
                  🛵 Order Now
                </button>
                <button className="btn btn-secondary btn-lg" onClick={() => navigate(user ? '/dashboard' : '/login')}>
                  🍽️ Explore Menu
                </button>
              </div>
              <div className="hero-trust">
                <div className="trust-avatars">
                  {['👨‍💼', '👩‍💻', '👨‍🍳', '👩‍🎤'].map((emoji, i) => (
                    <div key={i} className="trust-avatar">{emoji}</div>
                  ))}
                </div>
                <div className="trust-text">
                  <span className="trust-count">50,000+</span>
                  <span>happy customers this month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-badge">✨ Why Choose Us</div>
            <h2 className="section-title">Everything You Need</h2>
            <div className="divider" />
            <p className="section-subtitle" style={{margin:'0 auto'}}>
              From farm to fork — we deliver happiness with every order
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <div className="section-badge">🏆 About FOODEASE</div>
              <h2 className="section-title">Revolutionizing <br /><span className="gradient-text">Food Delivery</span></h2>
              <p style={{color:'var(--text-secondary)', lineHeight:'1.8', marginTop:'20px'}}>
                FOODEASE is a next-generation smart food ordering platform connecting hungry customers 
                with the best local restaurants. Our enterprise-grade system ensures every order is 
                handled with precision, speed, and love.
              </p>
              <div className="about-features">
                {['Real-time WebSocket tracking', 'JWT-secured transactions', '500+ partner restaurants', '30-min guaranteed delivery'].map((item, i) => (
                  <div className="about-feature" key={i}>
                    <div className="check-icon">✓</div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" onClick={handleGetStarted}>Start Ordering →</button>
            </div>
            <div className="about-visual">
              <div className="about-card">
                <div className="about-icon">🏪</div>
                <h4>500+ Restaurants</h4>
                <p>Curated partners</p>
              </div>
              <div className="about-card featured">
                <div className="about-icon">⚡</div>
                <h4>&lt;30 Min Delivery</h4>
                <p>Guaranteed speed</p>
              </div>
              <div className="about-card">
                <div className="about-icon">🔒</div>
                <h4>100% Secure</h4>
                <p>Bank-grade security</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section" ref={statsRef}>
        <div className="stats-bg" />
        <div className="container">
          <div className="stats-container">
            {STATS.map((stat, i) => (
              <StatItem key={i} stat={stat} isVisible={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-badge">💬 Testimonials</div>
            <h2 className="section-title">What Our Customers Say</h2>
            <div className="divider" />
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="stars">{'★'.repeat(t.rating)}</div>
                <p>"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-content">
            <div className="section-header">
              <div className="section-badge">📬 Get In Touch</div>
              <h2 className="section-title">Contact Us</h2>
              <div className="divider" style={{margin:'16px 0'}} />
              <p style={{color:'var(--text-secondary)'}}>Have questions? We'd love to hear from you.</p>
            </div>
            <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Message sent! We\'ll get back to you soon.'); }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows="5" placeholder="Your message..." style={{resize:'vertical'}} />
              </div>
              <button type="submit" className="btn btn-primary">Send Message 📨</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="nav-logo">
                <div className="logo-icon" style={{background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {LANDING_LOGO_SVG}
                </div>
                <span className="logo-text">FOOD<span>EASE</span></span>
              </div>
              <p>Your smart food ordering companion. Fresh, fast, and delicious.</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#features">Features</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-col">
                <h4>For Restaurants</h4>
                <a href="/register/restaurant">Partner With Us</a>
                <a href="/login">Admin Login</a>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <span>📍 Hyderabad, India</span>
                <span>📞 +91 98765 43210</span>
                <span>📧 hello@foodease.in</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 FOODEASE. All rights reserved. Made with ❤️ in India</p>
            <div className="footer-social">
              {['📘', '🐦', '📸', '▶️'].map((icon, i) => (
                <span key={i} className="social-icon">{icon}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
