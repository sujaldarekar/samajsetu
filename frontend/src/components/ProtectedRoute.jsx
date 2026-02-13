/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 * Can also check for specific roles (citizen or admin)
 */

import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const currentUser = authService.getCurrentUser();

  // If not logged in, redirect to login page
  if (!authService.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // If specific role is required, check if user has that role
  if (requiredRole && currentUser?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has required role
  return children;
};

export default ProtectedRoute;
