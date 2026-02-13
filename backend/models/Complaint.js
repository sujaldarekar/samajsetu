/**
 * Complaint Model
 * Defines the schema for Complaint collection in MongoDB
 * Stores complaint details submitted by citizens
 */

const mongoose = require('mongoose');

// Define Complaint Schema
const complaintSchema = new mongoose.Schema({
  // Complaint title/summary
  title: {
    type: String,
    required: [true, 'Please provide a complaint title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
    minlength: [5, 'Title must be at least 5 characters']
  },

  // Complaint category: noise, garbage, or water
  category: {
    type: String,
    enum: {
      values: ['noise', 'garbage', 'water'],
      message: 'Category must be one of: noise, garbage, or water'
    },
    required: [true, 'Please select a complaint category']
  },

  // Detailed description of the complaint
  description: {
    type: String,
    required: [true, 'Please provide a detailed description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    minlength: [10, 'Description must be at least 10 characters']
  },

  // Location where complaint occurred (text-based address)
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    maxlength: [200, 'Location cannot exceed 200 characters']
  },

  // Image URL from Cloudinary
  imageUrl: {
    type: String,
    default: null // Image is optional
  },

  // Current status of the complaint
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'resolved'],
      message: 'Status must be one of: pending, in-progress, or resolved'
    },
    default: 'pending'
  },

  // Reference to the citizen who submitted this complaint
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // When complaint was submitted
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true // Cannot be changed after creation
  },

  // When complaint was last updated
  updatedAt: {
    type: Date,
    default: Date.now
  },

  // When complaint was resolved (if applicable)
  resolvedAt: {
    type: Date,
    default: null
  },

  // Admin notes on the complaint
  adminNotes: [
    {
      note: {
        type: String,
        required: true
      },
      addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  // Priority level for complaints
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: 'Priority must be one of: low, medium, or high'
    },
    default: 'medium'
  },

  // Assigned admin (if any)
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
});

/**
 * MIDDLEWARE: Update timestamps before saving
 * This runs automatically before updating a complaint
 */
complaintSchema.pre('save', function(next) {
  // Always update the updatedAt timestamp
  this.updatedAt = Date.now();

  // If status is being changed to 'resolved', record when it was resolved
  if (this.isModified('status') && this.status === 'resolved') {
    this.resolvedAt = Date.now();
  }

  next();
});

// Create and export Complaint model
module.exports = mongoose.model('Complaint', complaintSchema);
