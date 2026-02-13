/**
 * Role-Based Access Control Middleware
 * Restricts routes to specific user roles (citizen or admin)
 */

/**
 * Role Middleware Factory
 * Takes required role as parameter and returns middleware function
 */
const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    // Check if user information exists (should be set by authMiddleware)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: '❌ Authentication required'
      });
    }

    // Check if user has required role
    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: `❌ Access denied. This action requires ${requiredRole} privileges.`
      });
    }

    // User has required role, continue
    next();
  };
};

module.exports = roleMiddleware;
