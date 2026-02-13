/**
 * Main App Component
 * Root component with routing configuration for both user and admin portals
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// User Pages Import
import Home from './pages/Home';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import Dashboard from './pages/Dashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';

// Admin Pages Import
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/AdminDashboard';

// Other Pages
import NotFound from './pages/NotFound';

// Legacy imports for backwards compatibility
import Register from './pages/Register';
import Login from './pages/Login';

// Styles
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* ===== PUBLIC ROUTES ===== */}
            <Route path="/" element={<Home />} />

            {/* ===== USER/CITIZEN PORTAL ===== */}
            {/* User Registration and Login */}
            <Route path="/register" element={<UserRegister />} />
            <Route path="/login" element={<UserLogin />} />

            {/* User Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="citizen">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit-complaint"
              element={
                <ProtectedRoute requiredRole="citizen">
                  <SubmitComplaint />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-complaints"
              element={
                <ProtectedRoute requiredRole="citizen">
                  <MyComplaints />
                </ProtectedRoute>
              }
            />

            {/* ===== ADMIN PORTAL ===== */}
            {/* Admin Registration and Login */}
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Backwards compatibility - old admin route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* ===== LEGACY ROUTES (for backwards compatibility) ===== */}
            <Route path="/register-user" element={<Register />} />
            <Route path="/login-user" element={<Login />} />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
