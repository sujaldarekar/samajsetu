/**
 * SAMAJSETU - Main Server File
 * Entry point for the Express backend
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// ========== ENVIRONMENT SETUP ==========
// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5000;

// ========== DATABASE CONNECTION ==========
// Connect to MongoDB
connectDB();

// ========== MIDDLEWARE ==========
// Enable CORS - allows requests from frontend on different port
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse incoming URL encoded data (form data)
app.use(express.urlencoded({ extended: true }));

// ========== ROUTE IMPORTS ==========
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const adminRoutes = require('./routes/adminRoutes');

// ========== API ROUTES ==========
// Mount routes with their base paths
app.use('/api/auth', authRoutes); // Registration and login
app.use('/api/complaints', complaintRoutes); // Citizen complaint operations
app.use('/api/admin', adminRoutes); // Admin operations

// ========== HEALTH CHECK ENDPOINT ==========
// Simple endpoint to verify server is running
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '✅ SAMAJSETU Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// ========== 404 NOT FOUND HANDLER ==========
// Handle requests to non-existent routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '❌ Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// ========== GLOBAL ERROR HANDLER ==========
// Catches all errors thrown in the application
app.use((error, req, res, next) => {
  console.error('❌ Error:', error.message);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || '❌ Internal server error',
    error: process.env.NODE_ENV === 'development' ? error : {} // Show full error in dev, hide in production
  });
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log('\n');
  console.log('╔═══════════════════════════════════╗');
  console.log('║   SAMAJSETU BACKEND SERVER        ║');
  console.log('╚═══════════════════════════════════╝');
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`⏰ Started at: ${new Date().toLocaleTimeString()}`);
  console.log('\n');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
