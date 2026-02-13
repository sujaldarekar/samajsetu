/**
 * Cloudinary Configuration
 * This file configures Cloudinary for image upload and storage
 */

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Export configured cloudinary instance
module.exports = cloudinary;
