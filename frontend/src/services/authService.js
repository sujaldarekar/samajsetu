/**
 * Authentication Service
 * Handle separate user and admin authentication with different endpoints
 */

import apiClient from './api';

const isRouteNotFoundError = (error) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message || '';
  return status === 404 || message.toLowerCase().includes('route') && message.toLowerCase().includes('not found');
};

const postWithFallback = async (primaryEndpoint, fallbackEndpoint, payload) => {
  try {
    return await apiClient.post(primaryEndpoint, payload);
  } catch (error) {
    if (fallbackEndpoint && isRouteNotFoundError(error)) {
      return apiClient.post(fallbackEndpoint, payload);
    }
    throw error;
  }
};

const authService = {
  /**
   * CITIZEN/USER AUTHENTICATION
   */

  /**
   * Register a new citizen user
   * @param {string} name - User's full name
   * @param {string} email - User's email
   * @param {string} password - User's password
   */
  registerUser: async (name, email, password) => {
    try {
      const response = await postWithFallback(
        '/auth/user/register',
        '/auth/register',
        {
          name,
          email,
          password
        }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userType', 'citizen');
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  /**
   * Login citizen user
   * @param {string} email - User's email
   * @param {string} password - User's password
   */
  loginUser: async (email, password) => {
    try {
      const response = await postWithFallback(
        '/auth/user/login',
        '/auth/login',
        {
          email,
          password
        }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userType', 'citizen');
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  /**
   * ADMIN AUTHENTICATION
   */

  /**
   * Register a new admin (requires registration code)
   * @param {string} name - Admin's full name
   * @param {string} email - Admin's email
   * @param {string} password - Admin's password
   * @param {string} registrationCode - Special admin registration code
   */
  registerAdmin: async (name, email, password, registrationCode) => {
    try {
      const response = await postWithFallback(
        '/auth/admin/register',
        '/auth/register',
        {
          name,
          email,
          password,
          registrationCode
        }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userType', 'admin');
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Admin registration failed' };
    }
  },

  /**
   * Login admin
   * @param {string} email - Admin's email
   * @param {string} password - Admin's password
   */
  loginAdmin: async (email, password) => {
    try {
      const response = await postWithFallback(
        '/auth/admin/login',
        '/auth/login',
        {
          email,
          password
        }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userType', 'admin');
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Admin login failed' };
    }
  },

  /**
   * COMMON AUTHENTICATION FUNCTIONS
   */

  /**
   * Logout user (works for both citizen and admin)
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  },

  /**
   * Get current logged-in user
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Get current user type (citizen or admin)
   */
  getUserType: () => {
    return localStorage.getItem('userType') || 'citizen';
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Check if logged-in user is admin
   */
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  },

  /**
   * Check if logged-in user is citizen
   */
  isCitizen: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'citizen';
  },

  /**
   * Legacy functions for backwards compatibility
   */
  register: (name, email, password) => {
    return authService.registerUser(name, email, password);
  },

  login: (email, password) => {
    return authService.loginUser(email, password);
  }
};

export default authService;
