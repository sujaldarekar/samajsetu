/**
 * Authentication Controller
 * Handles separate user and admin registration and login
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 * Creates a signed token with user information
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    {
      userId, // User's MongoDB ID
      role    // User's role (citizen or admin)
    },
    process.env.JWT_SECRET, // Secret key for signing
    {
      expiresIn: process.env.JWT_EXPIRE // Token validity period
    }
  );
};

/**
 * Verify Admin Registration Code
 * Checks if provided code matches the admin registration code in env
 */
const verifyAdminCode = (code) => {
  return code === process.env.ADMIN_REGISTRATION_CODE;
};

/**
 * Register New User
 * Creates a new user account (has to be citizen by default)
 * 
 * Request Body:
 *   - name: User's full name
 *   - email: User's email (must be unique)
 *   - password: User's password (will be hashed)
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate that all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: '❌ Please provide name, email, and password'
      });
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '❌ Email is already registered. Please login instead.'
      });
    }

    // Create new user
    // Password will be automatically hashed by the User model
    const user = await User.create({
      name,
      email,
      password,
      role: 'citizen' // New registrations are always citizens by default
    });

    // Generate authentication token
    const token = generateToken(user._id, user.role);

    // Send success response
    res.status(201).json({
      success: true,
      message: '✅ Registration successful! Welcome to SAMAJSETU',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Registration failed: ${error.message}`
    });
  }
};

/**
 * Login User
 * Authenticates user with email and password
 * 
 * Request Body:
 *   - email: User's email
 *   - password: User's password (will be compared with hashed version)
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate that email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '❌ Please provide both email and password'
      });
    }

    // Find user by email and explicitly include password field
    // (password is normally excluded from queries for security)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: '❌ Invalid email or password'
      });
    }

    // Compare provided password with stored hash
    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: '❌ Invalid email or password'
      });
    }

    // Generate authentication token
    const token = generateToken(user._id, user.role);

    // Send success response
    res.status(200).json({
      success: true,
      message: '✅ Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Login failed: ${error.message}`
    });
  }
};

/**
 * ADMIN AUTHENTICATION FUNCTIONS
 */

/**
 * Register New Admin
 * Creates a new admin account with special registration code
 * 
 * Request Body:
 *   - name: Admin's full name
 *   - email: Admin's email (must be unique)
 *   - password: Admin's password
 *   - registrationCode: Special code to register as admin
 */
exports.adminRegister = async (req, res) => {
  try {
    const { name, email, password, registrationCode } = req.body;

    // Validate required fields
    if (!name || !email || !password || !registrationCode) {
      return res.status(400).json({
        success: false,
        message: '❌ Please provide name, email, password, and registration code'
      });
    }

    // Verify admin registration code
    if (registrationCode !== process.env.ADMIN_REGISTRATION_CODE) {
      return res.status(403).json({
        success: false,
        message: '❌ Invalid registration code. You are not authorized to register as admin.'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '❌ Email is already registered. Please login instead.'
      });
    }

    // Create new admin user
    const user = await User.create({
      name,
      email,
      password,
      role: 'admin'
    });

    // Generate authentication token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: '✅ Admin registration successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Admin registration failed: ${error.message}`
    });
  }
};

/**
 * Admin Login
 * Authenticates admin with email and password
 * 
 * Request Body:
 *   - email: Admin's email
 *   - password: Admin's password
 */
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '❌ Please provide both email and password'
      });
    }

    // Find user by email and include password field
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '❌ Invalid email or password'
      });
    }

    // Check if user is actually an admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: '❌ This account is not an admin account. Please use the citizen login.'
      });
    }

    // Verify password
    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: '❌ Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: '✅ Admin login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Admin login failed: ${error.message}`
    });
  }
};

/**
 * USER AUTHENTICATION FUNCTIONS (Existing)
 */

/**
 * Register New User (Citizen)
 */
exports.userRegister = exports.register;

/**
 * Login User (Citizen)
 */
exports.userLogin = exports.login;
