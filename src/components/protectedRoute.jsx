import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false, staffOnly = false }) => {
  const { user, loading } = useAuth();

  // 1. Handle the "Loading" state from AuthContext 
  // (Prevents flickering to login while checking local storage)
  if (loading) return null; 

  // 2. Not logged in? Go to login
  if (!user) return <Navigate to="/login" />;

  // 3. Admin-only check
  if (adminOnly && user.role !== 'ADMIN') {
    // If they are staff, send them to their own station
    return <Navigate to="/staff" />;
  }

  // 4. Staff-only check (Optional, but good for security)
  if (staffOnly && user.role !== 'STAFF') {
    // If an Admin tries to go to /staff, send them back to Admin dashboard
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;