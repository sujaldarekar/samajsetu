/**
 * File Upload Middleware
 * Handles image file uploads using Multer
 * Stores files in memory temporarily before uploading to Cloudinary
 */

const multer = require('multer');
const path = require('path');

// Configure storage strategy
// memoryStorage: keeps file in RAM temporarily (fast, suitable for cloud uploads)
const storage = multer.memoryStorage();

/**
 * File Filter Function
 * Only allows image files (jpeg, jpg, png, gif)
 */
const fileFilter = (req, file, cb) => {
  // Allowed file extensions
  const allowedTypes = /jpeg|jpg|png|gif/;

  // Check file extension
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  // Check MIME type
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    // File is allowed
    return cb(null, true);
  } else {
    // File is not allowed
    cb(new Error('❌ Only image files are allowed (jpeg, jpg, png, gif)'));
  }
};

// Create multer instance with configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Maximum file size: 5MB
  }
});

module.exports = upload;
