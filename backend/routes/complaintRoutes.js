/**
 * Complaint Routes
 * Routes for complaint submission and citizen complaint operations
 * All routes require authentication
 */

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  createComplaint,
  getMyComplaints,
  getComplaintById
} = require('../controllers/complaintController');

const router = express.Router();

// All routes in this file require authentication
router.use(authMiddleware);

/**
 * POST /api/complaints/create
 * Create a new complaint with optional image
 * Requires: Authentication (JWT token)
 * Body: { title, category, description, location, image (file) }
 */
router.post('/create', upload.single('image'), createComplaint);

/**
 * GET /api/complaints/my-complaints
 * Get all complaints submitted by logged-in citizen
 * Requires: Authentication (JWT token)
 * Returns: Array of complaints
 */
router.get('/my-complaints', getMyComplaints);

/**
 * GET /api/complaints/:id
 * Get single complaint by ID
 * Requires: Authentication (JWT token)
 * Security: Citizens can only view their own complaints
 * Returns: Complaint object with citizen details
 */
router.get('/:id', getComplaintById);

module.exports = router;
