/**
 * Authentication Routes
 * Separate routes for citizen (user) and admin authentication
 * No authentication required for these public routes
 */

const express = require('express');
const {
  register,
  login,
  userRegister,
  userLogin,
  adminRegister,
  adminLogin
} = require('../controllers/authController');

const router = express.Router();

/**
 * USER/CITIZEN AUTHENTICATION ROUTES
 */

/**
 * POST /api/auth/user/register
 * Register a new citizen account
 * Body: { name, email, password }
 */
router.post('/user/register', userRegister);

/**
 * POST /api/auth/user/login
 * Citizen login
 * Body: { email, password }
 * Returns: { token, user }
 */
router.post('/user/login', userLogin);

/**
 * ADMIN AUTHENTICATION ROUTES
 */

/**
 * POST /api/auth/admin/register
 * Register a new admin account (requires registration code)
 * Body: { name, email, password, registrationCode }
 */
router.post('/admin/register', adminRegister);

/**
 * POST /api/auth/admin/login
 * Admin login
 * Body: { email, password }
 * Returns: { token, user }
 */
router.post('/admin/login', adminLogin);

/**
 * Legacy Routes (for backwards compatibility)
 */
router.post('/register', register);
router.post('/login', login);

module.exports = router;
