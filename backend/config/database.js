/**
 * MongoDB Database Connection
 * This file handles connecting to MongoDB using Mongoose
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB with options
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📍 Database Name: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed!');
    console.error(`❌ Error: ${error.message}`);
    
    // Exit process if database connection fails
    // Without database, the app cannot function
    process.exit(1);
  }
};

module.exports = connectDB;
