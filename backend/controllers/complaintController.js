/**
 * Complaint Controller
 * Handles complaint submission and citizen complaint operations
 */

const Complaint = require('../models/Complaint');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

/**
 * Upload Image to Cloudinary
 * Converts image buffer to stream and uploads to Cloudinary cloud storage
 * Returns secure URL of the uploaded image
 */
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    // Create upload stream to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'samajsetu' // Organize images in 'samajsetu' folder on Cloudinary
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer to readable stream and pipe to Cloudinary
    Readable.from(buffer).pipe(stream);
  });
};

/**
 * Create New Complaint
 * Allows citizens to submit a complaint with optional image
 * 
 * Request Body:
 *   - title: Complaint title/summary
 *   - category: One of [noise, garbage, water]
 *   - description: Detailed description
 *   - location: Location where issue occurred
 *   - image: Optional image file (multipart)
 */
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description, location } = req.body;
    const citizenId = req.user.userId; // From auth middleware

    // Validate that all required fields are provided
    if (!title || !category || !description || !location) {
      return res.status(400).json({
        success: false,
        message: '❌ Please provide title, category, description, and location'
      });
    }

    // Validate that category is one of the allowed types
    if (!['noise', 'garbage', 'water'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: '❌ Invalid category. Must be: noise, garbage, or water'
      });
    }

    // Upload image to Cloudinary if provided
    let imageUrl = null;
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: `❌ Image upload failed: ${uploadError.message}`
        });
      }
    }

    // Create complaint in database
    const complaint = await Complaint.create({
      title,
      category,
      description,
      location,
      imageUrl,
      citizen: citizenId
      // status defaults to 'pending' from schema
    });

    // Return successful response
    res.status(201).json({
      success: true,
      message: '✅ Complaint submitted successfully! Your complaint ID: ' + complaint._id,
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Failed to create complaint: ${error.message}`
    });
  }
};

/**
 * Get All Complaints for Logged-In Citizen
 * Returns only complaints submitted by the authenticated citizen
 */
exports.getMyComplaints = async (req, res) => {
  try {
    const citizenId = req.user.userId; // From auth middleware

    // Fetch all complaints for this citizen, sorted by newest first
    const complaints = await Complaint.find({ citizen: citizenId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      message: `📋 You have ${complaints.length} complaints`,
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
 * Get Single Complaint by ID
 * Allows citizen to view specific complaint details
 * Security: Citizens can only view their own complaints
 */
exports.getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; // From auth middleware
    const userRole = req.user.role;

    // Find complaint by ID and populate citizen details
    const complaint = await Complaint.findById(id).populate(
      'citizen',
      'name email phone address'
    );

    // Check if complaint exists
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: '❌ Complaint not found'
      });
    }

    // Security check: Citizens can only view their own complaints
    // Admins can view any complaint
    if (userRole === 'citizen' && complaint.citizen._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: '❌ You are not authorized to view this complaint'
      });
    }

    res.status(200).json({
      success: true,
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Failed to fetch complaint: ${error.message}`
    });
  }
};
