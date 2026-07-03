import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import CustomerRegister from './pages/CustomerRegister';
import RestaurantRegister from './pages/RestaurantRegister';
import Login from './pages/Login';

import CustomerDashboard from './pages/customer/CustomerDashboard';

import AdminDashboard from './pages/admin/AdminDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="spinner-container" style={{ minHeight: '100vh' }}>
      <div className="spinner" />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/get-started" element={<RoleSelection />} />
      <Route path="/register/customer" element={<CustomerRegister />} />
      <Route path="/register/restaurant" element={<RestaurantRegister />} />
      <Route
        path="/login"
        element={user
          ? <Navigate to={['ADMIN', 'RESTAURANT_OWNER'].includes(user.role) ? '/admin' : '/dashboard'} replace />
          : <Login />}
      />

      <Route path="/dashboard/*" element={
        <ProtectedRoute allowedRoles={['CUSTOMER']}>
          <CustomerDashboard />
        </ProtectedRoute>
      } />

      <Route path="/admin/*" element={
        <ProtectedRoute allowedRoles={['ADMIN', 'RESTAURANT_OWNER']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
