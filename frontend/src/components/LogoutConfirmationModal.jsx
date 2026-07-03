export default function LogoutConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '400px',
        background: 'var(--bg-card)',
        border: '1px solid rgba(255, 107, 107, 0.3)',
        borderRadius: '20px',
        padding: '32px 24px',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transform: 'scale(1)',
        animation: 'scaleIn 0.2s cubic-bezier(0.165, 0.84, 0.44, 1)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(239, 71, 111, 0.15)',
          color: '#EF476F',
          fontSize: '2.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          border: '2px dashed #EF476F'
        }}>
          🚪
        </div>

        <h3 style={{ margin: '0 0 10px', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Confirm Logout
        </h3>

        <p style={{ margin: '0 0 28px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          Are you sure you want to end your current session and exit FoodEase?
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button 
            onClick={onClose}
            className="btn btn-secondary w-full"
            style={{ padding: '12px', borderRadius: '12px', fontWeight: 700 }}
          >
            Stay Logged In
          </button>
          
          <button 
            onClick={onConfirm}
            className="btn btn-danger w-full"
            style={{ padding: '12px', borderRadius: '12px', fontWeight: 700, background: '#EF476F', color: 'white' }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
