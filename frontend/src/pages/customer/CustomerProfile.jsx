import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userApi } from '../../api/userApi';
import toast from 'react-hot-toast';

export default function CustomerProfile() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    dob: '',
    gender: 'Prefer not to say',
    preferredDeliveryAddress: '',
    preferredPaymentMethod: 'Cash on Delivery',
    profilePhotoUrl: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await userApi.getProfile(user.id);
      const data = res.data || {};
      setFormData(prev => ({
        ...prev,
        name: data.name || user.name || '',
        email: data.email || user.email || '',
        phone: data.phone || '',
        city: data.city || '',
        state: data.state || '',
        pincode: data.pincode || '',
        dob: data.dob || '',
        gender: data.gender || 'Prefer not to say',
        preferredDeliveryAddress: data.preferredDeliveryAddress || data.address || '',
        preferredPaymentMethod: data.preferredPaymentMethod || 'Cash on Delivery',
        profilePhotoUrl: data.profilePhotoUrl || ''
      }));
    } catch (err) {
      console.error(err);
      toast.error('Could not load profile data. Using local session.');
      setFormData(prev => ({
        ...prev,
        name: user?.name || '',
        email: user?.email || '',
        preferredDeliveryAddress: user?.address || ''
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be under 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, profilePhotoUrl: reader.result }));
      toast.success('Photo preview updated!');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error('New password and confirm password do not match!');
        return;
      }
      if (formData.newPassword.length < 6) {
        toast.error('New password must be at least 6 characters');
        return;
      }
    }

    try {
      setSaving(true);
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        dob: formData.dob,
        gender: formData.gender,
        preferredDeliveryAddress: formData.preferredDeliveryAddress.trim(),
        preferredPaymentMethod: formData.preferredPaymentMethod,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      };

      const res = await userApi.updateProfile(user.id, payload);
      toast.success('Profile updated successfully! ✨');

      const updatedUser = {
        ...user,
        name: formData.name.trim(),
        address: formData.preferredDeliveryAddress.trim()
      };
      login(updatedUser);

      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <div className="dashboard-header" style={{ marginBottom: '24px' }}>
        <h1>My Profile Settings 👤</h1>
        <p>Manage your personal details, delivery preferences, and security</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: formData.profilePhotoUrl ? `url(${formData.profilePhotoUrl}) center/cover no-repeat` : 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                color: '#fff',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(255, 107, 107, 0.3)',
                border: '3px solid var(--glass-border)'
              }}
            >
              {!formData.profilePhotoUrl && (formData.name?.charAt(0).toUpperCase() || '👤')}
            </div>
            <label 
              htmlFor="photo-upload" 
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: 'var(--bg-card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                fontSize: '1rem'
              }}
              title="Change Photo"
            >
              📷
            </label>
            <input 
              type="file" 
              id="photo-upload" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              style={{ display: 'none' }} 
            />
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{formData.name || 'Customer'}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>{formData.email}</p>
            <span className="badge badge-primary">Verified Customer ⭐</span>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
            📋 Personal Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label>Full Name *</label>
              <input 
                type="text" 
                className="form-control" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                value={formData.email} 
                disabled 
                style={{ opacity: 0.7, cursor: 'not-allowed' }}
                title="Email cannot be changed"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                className="form-control" 
                name="phone" 
                placeholder="e.g. 9876543210"
                value={formData.phone} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input 
                type="date" 
                className="form-control" 
                name="dob" 
                value={formData.dob} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
            📍 Address & Delivery Preferences
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label>City</label>
              <input type="text" className="form-control" name="city" placeholder="e.g. Hyderabad" value={formData.city} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>State</label>
              <input type="text" className="form-control" name="state" placeholder="e.g. Telangana" value={formData.state} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input type="text" className="form-control" name="pincode" placeholder="e.g. 500001" value={formData.pincode} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Preferred Delivery Address</label>
            <textarea 
              className="form-control" 
              name="preferredDeliveryAddress" 
              rows="3" 
              placeholder="Enter your complete apartment/house address, landmark..." 
              value={formData.preferredDeliveryAddress} 
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Preferred Payment Method</label>
            <select className="form-control" name="preferredPaymentMethod" value={formData.preferredPaymentMethod} onChange={handleChange}>
              <option value="Cash on Delivery">💵 Cash on Delivery (COD)</option>
              <option value="UPI">📱 UPI (GPay / PhonePe / Paytm)</option>
              <option value="Credit Card">💳 Credit / Debit Card</option>
            </select>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
            🔒 Security & Password
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Leave blank if you do not wish to change your current password.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label>Current Password</label>
              <input 
                type="password" 
                className="form-control" 
                name="currentPassword" 
                placeholder="••••••••" 
                value={formData.currentPassword} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input 
                type="password" 
                className="form-control" 
                name="newPassword" 
                placeholder="Min 6 characters" 
                value={formData.newPassword} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input 
                type="password" 
                className="form-control" 
                name="confirmPassword" 
                placeholder="Re-enter new password" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <button type="submit" className="btn btn-primary" disabled={saving} style={{ padding: '12px 32px', fontSize: '1.05rem', fontWeight: 600 }}>
            {saving ? 'Saving Changes...' : '💾 Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
