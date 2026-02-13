/**
 * Admin Routes
 * Routes for government admin complaint management
 * All routes require:
 *   1. Authentication (JWT token)
 *   2. Admin role
 */

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  getAllComplaints,
  updateComplaintStatus,
  getDashboardStats,
  getComplaintDetail,
  addAdminNote,
  updateComplaintPriority,
  assignComplaint
} = require('../controllers/adminController');

const router = express.Router();

// Middleware stack: First authenticate, then check admin role
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

/**
 * GET /api/admin/complaints
 * Get all complaints with filtering and sorting
 * Requires: Admin role
 * Query Params:
 *   - category: Filter by category (noise, garbage, water)
 *   - status: Filter by status (pending, in-progress, resolved)
 *   - sortBy: Sort order (newest or oldest)
 * Returns: Array of all complaints
 */
router.get('/complaints', getAllComplaints);

/**
 * PATCH /api/admin/complaints/:id/status
 * Update complaint status
 * Requires: Admin role
 * URL Params: id (complaint ID)
 * Body: { status: 'pending' | 'in-progress' | 'resolved' }
 * Returns: Updated complaint object
 */
router.patch('/complaints/:id/status', updateComplaintStatus);

/**
 * GET /api/admin/dashboard/stats
 * Get dashboard statistics
 * Requires: Admin role
 * Returns: Statistics including total, by status, by category, and resolution rate
 */
router.get('/dashboard/stats', getDashboardStats);

/**
 * GET /api/admin/complaints/:id
 * Get detailed information about a specific complaint
 * Requires: Admin role
 * URL Params: id (complaint ID)
 * Returns: Complaint object with all details
 */
router.get('/complaints/:id', getComplaintDetail);

/**
 * POST /api/admin/complaints/:id/notes
 * Add admin note to complaint
 * Requires: Admin role
 * URL Params: id (complaint ID)
 * Body: { note: 'Note text' }
 * Returns: Updated complaint object
 */
router.post('/complaints/:id/notes', addAdminNote);

/**
 * PATCH /api/admin/complaints/:id/priority
 * Update complaint priority
 * Requires: Admin role
 * URL Params: id (complaint ID)
 * Body: { priority: 'low' | 'medium' | 'high' }
 * Returns: Updated complaint object
 */
router.patch('/complaints/:id/priority', updateComplaintPriority);

/**
 * PATCH /api/admin/complaints/:id/assign
 * Assign complaint to admin
 * Requires: Admin role
 * URL Params: id (complaint ID)
 * Body: { assignedTo: adminId } (or null to unassign)
 * Returns: Updated complaint object
 */
router.patch('/complaints/:id/assign', assignComplaint);

module.exports = router;
