# 🎨 SAMAJSETU - Frontend Setup Guide (Part 2)

Continuation of the setup process. Frontend is built with React + Vite.

---

## 📋 Prerequisites Review

Ensure you have:
- ✅ Node.js v18+ installed
- ✅ Backend running on `http://localhost:5000`
- ✅ MongoDB connected and working
- ✅ VS Code (or code editor)

---

## 🚀 Frontend Setup Steps

### Step 1: Navigate to Frontend Folder

```powershell
# Go back to samajsetu folder if in backend
cd ..

# You should be in: samajsetu folder
# Create frontend with Vite
npm create vite@latest frontend -- --template react

# Navigate into frontend
cd frontend

# Install base dependencies
npm install
```

### Step 2: Install Additional Packages

```powershell
# Install routing and HTTP client
npm install react-router-dom axios

# Install Tailwind CSS and related tools
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind configuration
npx tailwindcss init -p

# This creates:
# - tailwind.config.js (Tailwind configuration)
# - postcss.config.js (CSS processing)
```

### Step 3: Configure Tailwind CSS

**Update file: `frontend/tailwind.config.js`**

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E88E5',
        secondary: '#43A047',
        accent: '#FB8C00',
        background: '#F5F7FA',
        dark: '#2C3E50',
        light: '#7F8C8D',
      }
    },
  },
  plugins: [],
};
```

### Step 4: Create Frontend Folder Structure

```powershell
# Inside frontend/src folder, create these directories:
mkdir components pages services styles hooks context

# Create files
New-Item -Path ".env.local" -ItemType "file"
```

### Step 5: Configure Environment Variables

**Create `frontend/.env.local`**

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

---

## ⚛️ Creating Frontend Components

### Component Strategy

We'll build a **modular component architecture**:

```
Reusable Components
├── Navbar.jsx         (Top navigation)
├── Footer.jsx         (Bottom footer)
├── LoadingSpinner.jsx (Loading indicator)
└── ProtectedRoute.jsx (Route protection)

Page Components
├── Home.jsx           (Landing page)
├── Register.jsx       (Sign up)
├── Login.jsx          (Sign in)
├── Dashboard.jsx      (Citizen main page)
├── SubmitComplaint.jsx (Form to submit)
├── MyComplaints.jsx   (View own complaints)
├── AdminDashboard.jsx (Admin panel)
└── NotFound.jsx       (404 page)
```

---

## 🔧 Step-by-Step Component Creation

### 1. Create API Service Layer

**File: `frontend/src/services/api.js`**

```javascript
// This file handles all HTTP requests to the backend
import axios from 'axios';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request Interceptor
 * Automatically add JWT token to all requests
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Add token to Authorization header if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle common error scenarios
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 (Unauthorized), user token is invalid
    if (error.response?.status === 401) {
      // Clear stored token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

**File: `frontend/src/services/authService.js`**

```javascript
// Authentication related API calls
import apiClient from './api';

const authService = {
  /**
   * Register a new user
   * @param {string} name - User's full name
   * @param {string} email - User's email
   * @param {string} password - User's password
   */
  register: async (name, email, password) => {
    try {
      const response = await apiClient.post('/auth/register', {
        name,
        email,
        password
      });
      
      // Save token and user info to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  /**
   * Login user
   * @param {string} email - User's email
   * @param {string} password - User's password
   */
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      });
      
      // Save token and user info to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  /**
   * Logout user
   * Removes token and user data
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get current logged-in user
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
```

**File: `frontend/src/services/complaintService.js`**

```javascript
// Complaint related API calls
import apiClient from './api';

const complaintService = {
  /**
   * Create a new complaint
   * @param {Object} formData - Form data including image
   */
  createComplaint: async (formData) => {
    try {
      const response = await apiClient.post(
        '/complaints/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create complaint' };
    }
  },

  /**
   * Get logged-in citizen's complaints
   */
  getMyComplaints: async () => {
    try {
      const response = await apiClient.get('/complaints/my-complaints');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch complaints' };
    }
  },

  /**
   * Get single complaint by ID
   * @param {string} id - Complaint ID
   */
  getComplaintById: async (id) => {
    try {
      const response = await apiClient.get(`/complaints/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch complaint' };
    }
  },

  /**
   * Admin: Get all complaints
   * @param {string} category - Filter by category
   * @param {string} status - Filter by status
   */
  getAllComplaints: async (category = '', status = '') => {
    try {
      let url = '/admin/complaints';
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (status) params.append('status', status);
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch complaints' };
    }
  },

  /**
   * Admin: Update complaint status
   * @param {string} id - Complaint ID
   * @param {string} status - New status
   */
  updateComplaintStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(
        `/admin/complaints/${id}/status`,
        { status }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update status' };
    }
  },

  /**
   * Admin: Get dashboard statistics
   */
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch statistics' };
    }
  }
};

export default complaintService;
```

### 2. Create Reusable Components

**File: `frontend/src/components/Navbar.jsx`**

```jsx
/**
 * Navbar Component
 * Navigation bar visible on all pages
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
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-bold">
            🌉 SAMAJSETU
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {!currentUser ? (
              <>
                <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Login
                </Link>
                <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm">
                  Welcome, <strong>{currentUser.name}</strong>
                </span>
                <Link
                  to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                  className="hover:bg-blue-700 px-3 py-2 rounded"
                >
                  {currentUser.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:bg-blue-700 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-2">
            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className="hover:bg-blue-700 px-3 py-2 rounded block"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:bg-blue-700 px-3 py-2 rounded block"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm px-3 py-2">
                  Welcome, <strong>{currentUser.name}</strong>
                </span>
                <Link
                  to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                  className="hover:bg-blue-700 px-3 py-2 rounded block"
                >
                  {currentUser.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:bg-blue-700 px-3 py-2 rounded block text-left"
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
```

**File: `frontend/src/components/Footer.jsx`**

```jsx
/**
 * Footer Component
 * Shown at bottom of every page
 */

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">🌉 SAMAJSETU</h3>
            <p className="text-sm text-light">
              Digital bridge between citizens and government for efficient complaint management
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="text-sm text-light space-y-1">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <p className="text-sm text-light">
              📧 support@samajsetu.gov<br />
              📞 1800-COMPLAINTS
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-light">
          <p>
            © 2026 SAMAJSETU. All rights reserved. | Digital India Initiative
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

**File: `frontend/src/components/LoadingSpinner.jsx`**

```jsx
/**
 * Loading Spinner Component
 * Shows while data is being fetched
 */

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <p className="mt-4 text-lg text-dark">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
```

**File: `frontend/src/components/ProtectedRoute.jsx`**

```jsx
/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 * Can also check for specific roles
 */

import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const currentUser = authService.getCurrentUser();

  // If not logged in, redirect to login
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
```

---

## 📄 Frontend Pages (Continued in Part 3)

The actual page components will follow...

---

## Important Notes

1. **API Service Pattern**: All API calls go through the service layer
2. **Token Management**: JWT token is automatically added to requests
3. **Error Handling**: Interceptors handle 401 errors
4. **localStorage**: User data and token are stored locally

This structure makes the code:
- ✅ Maintainable
- ✅ Scalable
- ✅ Easy to test
- ✅ Reusable

Next: Create all page components and styling →
