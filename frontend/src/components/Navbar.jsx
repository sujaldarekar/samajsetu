/**
 * Navbar Component
 * Navigation bar visible on all pages
 * Shows separate options for citizen and admin portals
 */

import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-bold hover:opacity-80">
            🌉 SAMAJSETU
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {!currentUser ? (
              <>
                {/* Citizen Portal */}
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="text-xs font-semibold text-blue-200">Citizen Portal:</span>
                  <Link
                    to="/login"
                    className="hover:bg-blue-700 px-3 py-1 rounded transition text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded transition text-sm"
                  >
                    Register
                  </Link>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-blue-600" />

                {/* Admin Portal */}
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="text-xs font-semibold text-orange-200">Admin Portal:</span>
                  <Link
                    to="/admin/login"
                    className="hover:bg-orange-600 px-3 py-1 rounded transition text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    to="/admin/register"
                    className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded transition text-sm"
                  >
                    Register
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* User Info */}
                <span className="text-sm">
                  👤 <strong>{currentUser.name}</strong>
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isAdmin ? 'bg-orange-600' : 'bg-blue-600'
                }`}>
                  {isAdmin ? '👑 Admin' : '👨‍💼 Citizen'}
                </span>

                {/* Dashboard Link */}
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                  className={`${isAdmin ? 'hover:bg-orange-600' : 'hover:bg-blue-700'} px-3 py-2 rounded transition`}
                >
                  Dashboard
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="hover:bg-red-600 px-3 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-2 border-t border-blue-600 pt-4">
            {!currentUser ? (
              <>
                {/* Citizen Portal */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-blue-200 px-3">Citizen Portal</p>
                  <Link
                    to="/login"
                    className="hover:bg-blue-700 px-3 py-2 rounded block transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded block transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-blue-600 my-2" />

                {/* Admin Portal */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-orange-200 px-3">Admin Portal</p>
                  <Link
                    to="/admin/login"
                    className="hover:bg-orange-600 px-3 py-2 rounded block transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Login
                  </Link>
                  <Link
                    to="/admin/register"
                    className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded block transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Register
                  </Link>
                </div>
              </>
            ) : (
              <>
                <span className="text-sm px-3 py-2">
                  👤 <strong>{currentUser.name}</strong>
                </span>
                <span className={`text-xs px-3 py-2 rounded inline-block w-fit ${
                  isAdmin ? 'bg-orange-600' : 'bg-blue-600'
                }`}>
                  {isAdmin ? '👑 Admin' : '👨‍💼 Citizen'}
                </span>
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                  className={`${isAdmin ? 'hover:bg-orange-600' : 'hover:bg-blue-700'} px-3 py-2 rounded block transition`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:bg-red-600 px-3 py-2 rounded block text-left transition w-full"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
