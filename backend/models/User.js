/**
 * User Model
 * Defines the schema for User collection in MongoDB
 * Includes both citizens and government admins
 */

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// Define User Schema
const userSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },

  // User's email (must be unique)
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    // Regex to validate email format
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },

  // User's password (hashed for security)
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false // Don't return password in queries by default
  },

  // User's phone number (optional)
  phone: {
    type: String,
    default: '',
    maxlength: [10, 'Phone number cannot exceed 10 digits']
  },

  // User's residential address (optional)
  address: {
    type: String,
    default: '',
    maxlength: [200, 'Address cannot exceed 200 characters']
  },

  // User's role: 'citizen' or 'admin'
  role: {
    type: String,
    enum: {
      values: ['citizen', 'admin'],
      message: 'Role must be either "citizen" or "admin"'
    },
    default: 'citizen'
  },

  // Account creation timestamp
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true // Cannot be changed after creation
  },

  // Last update timestamp
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * MIDDLEWARE: Hash password before saving
 * This runs automatically before saving a user to database
 */
userSchema.pre('save', async function(next) {
  // Only hash password if it's new or modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt (random data for hashing)
    // Higher number = more secure but slower
    const salt = await bcryptjs.genSalt(10);

    // Hash the password
    this.password = await bcryptjs.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

/**
 * INSTANCE METHOD: Compare password
 * Used during login to check if provided password matches stored hash
 */
userSchema.methods.matchPassword = async function(enteredPassword) {
  // Returns true if password matches, false otherwise
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Create and export User model
module.exports = mongoose.model('User', userSchema);
