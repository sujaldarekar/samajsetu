/**
 * Admin Controller
 * Handles admin-only operations for complaint management
 * Only users with 'admin' role can access these functions
 */

const Complaint = require('../models/Complaint');

/**
 * Get All Complaints with Filters
 * Allows admin to view all complaints from all citizens
 * Supports filtering and sorting
 * 
 * Query Parameters:
 *   - category: Filter by category (noise, garbage, water)
 *   - status: Filter by status (pending, in-progress, resolved)
 *   - sortBy: Sort order (newest/oldest)
 */
exports.getAllComplaints = async (req, res) => {
  try {
    const { category, status, sortBy } = req.query;

    // Build filter object dynamically
    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (status) {
      filter.status = status;
    }

    // Build sort object
    let sort = { createdAt: -1 }; // Default: newest first
    if (sortBy === 'oldest') {
      sort = { createdAt: 1 }; // Oldest first
    }

    // Query database with filters and sorting
    const complaints = await Complaint.find(filter)
      .populate('citizen', 'name email phone address') // Include citizen details
      .sort(sort);

    res.status(200).json({
      success: true,
      count: complaints.length,
      filter: { category, status, sortBy }, // Echo back applied filters
      complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Failed to fetch complaints: ${error.message}`
    });
  }
};

/**
 * Update Complaint Status
 * Allows admin to change complaint status
 * 
 * URL Parameter:
 *   - id: Complaint ID
 * 
 * Request Body:
 *   - status: New status (pending, in-progress, resolved)
 */
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate that status is provided
    if (!status) {
      return res.status(400).json({
        success: false,
        message: '❌ Please provide a status'
      });
    }

    // Validate that status is one of allowed values
    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: '❌ Invalid status. Must be: pending, in-progress, or resolved'
      });
    }

    // Update complaint and run validators
    // { new: true } returns updated document
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: '❌ Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      message: '✅ Complaint status updated successfully',
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Failed to update complaint: ${error.message}`
    });
  }
};

/**
 * Get Dashboard Statistics
 * Provides admin with overview of all complaints
 * Shows counts by status and category
 */
exports.getDashboardStats = async (req, res) => {
  try {
    // Count complaints by status
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({
      status: 'pending'
    });
    const inProgressComplaints = await Complaint.countDocuments({
      status: 'in-progress'
    });
    const resolvedComplaints = await Complaint.countDocuments({
      status: 'resolved'
    });

    // Count complaints by category using aggregation pipeline
    const categoryStats = await Complaint.aggregate([
      {
        $group: {
          _id: '$category', // Group by category
          count: { $sum: 1 } // Count documents in each group
        }
      },
      {
        $sort: { count: -1 } // Sort by count, highest first
      }
    ]);

    // Count complaints by priority
    const priorityStats = await Complaint.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Calculate resolution rate percentage
    const resolutionRate =
      totalComplaints > 0
        ? Math.round((resolvedComplaints / totalComplaints) * 100)
        : 0;

    res.status(200).json({
      success: true,
      stats: {
        total: totalComplaints,
        pending: pendingComplaints,
        inProgress: inProgressComplaints,
        resolved: resolvedComplaints,
        resolutionRate: `${resolutionRate}%`,
        byCategory: categoryStats,
        byPriority: priorityStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Failed to fetch statistics: ${error.message}`
    });
  }
};

/**
 * Get Single Complaint Detail
 * Allows admin to view detailed information about a specific complaint
 */
exports.getComplaintDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id)
      .populate('citizen', 'name email phone address')
      .populate('assignedTo', 'name email')
      .populate('adminNotes.addedBy', 'name email');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: '❌ Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Failed to fetch complaint detail: ${error.message}`
    });
  }
};

/**
 * Add Admin Note to Complaint
 * Allows admin to add notes/updates to a complaint
 */
exports.addAdminNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const adminId = req.user.id; // From auth middleware

    if (!note || note.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: '❌ Please provide a note'
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      {
        $push: {
          adminNotes: {
            note: note.trim(),
            addedBy: adminId
          }
        }
      },
      { new: true }
    )
      .populate('adminNotes.addedBy', 'name email');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: '❌ Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      message: '✅ Note added successfully',
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Failed to add note: ${error.message}`
    });
  }
};

/**
 * Update Complaint Priority
 * Allows admin to set priority level
 */
exports.updateComplaintPriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    if (!['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: '❌ Invalid priority. Must be: low, medium, or high'
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { priority },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: '❌ Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      message: '✅ Priority updated successfully',
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Failed to update priority: ${error.message}`
    });
  }
};

/**
 * Assign Complaint to Admin
 * Allows admins to assign complaints to themselves or other admins
 */
exports.assignComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { assignedTo: assignedTo || null },
      { new: true }
    )
      .populate('assignedTo', 'name email');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: '❌ Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      message: '✅ Complaint assigned successfully',
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Failed to assign complaint: ${error.message}`
    });
  }
};
