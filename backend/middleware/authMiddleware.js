/**
 * Authentication Middleware
 * Verifies JWT token and attaches user information to request
 * All protected routes use this middleware
 */

const jwt = require('jsonwebtoken');

/**
 * Auth Middleware Function
 * Checks for valid JWT token in Authorization header
 */
const authMiddleware = (req, res, next) => {
  try {
    // Extract token from Authorization header
    // Header format: "Bearer <token>"
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: '❌ No authentication token provided. Please login first.'
      });
    }

    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to request object
    // Now available in controllers as req.user
    req.user = decoded;

    // Continue to next middleware/route
    next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({
      success: false,
      message: '❌ Invalid or expired authentication token. Please login again.'
    });
  }
};

module.exports = authMiddleware;
