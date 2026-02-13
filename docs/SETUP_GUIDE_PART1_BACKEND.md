# 🚀 SAMAJSETU - Complete Setup Guide for Beginners

This guide will take you from zero to a working MERN application. Follow every step carefully!

---

## 📋 Prerequisites Checklist

Before starting, make sure you have these installed:

### Required Software
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
  - Check: Open terminal and type `node --version`
  - Should show: v18.0.0 or higher
  
- **MongoDB** (Local or Atlas)
  - Option 1: Local MongoDB Community Edition
  - Option 2: MongoDB Atlas (Cloud) - RECOMMENDED FOR BEGINNERS
  - [Setup guide](https://www.mongodb.com/docs/manual/installation/)

- **Git** (for version control)
  - [Download](https://git-scm.com/)
  - Check: `git --version`

- **VS Code** (or any code editor)
  - [Download](https://code.visualstudio.com/)
  - Recommended Extensions:
    - ES7+ React/Redux/React-Native Snippets
    - Prettier - Code Formatter
    - Thunder Client (or Postman for API testing)

### Accounts Needed
- **MongoDB Atlas Account** (free tier is enough)
  - [Create account](https://account.mongodb.com/account/register)
  
- **Cloudinary Account** (free tier is enough)
  - [Create account](https://cloudinary.com/users/register/free)

---

## 🔧 Step-by-Step Setup

### PHASE 1: Initial Project Setup

#### Step 1A: Create Project Folder Structure
```powershell
# Open PowerShell in your Documents folder
cd C:\Users\YourUsername\Downloads\Documents\samajsetu

# Create backend and frontend directories
mkdir backend
mkdir frontend
mkdir docs

# Navigate into backend
cd backend
```

#### Step 1B: Initialize Backend
```powershell
# Create Node.js project
npm init -y

# This creates package.json - keeps track of all dependencies
```

#### Step 1C: Install Backend Dependencies
```powershell
npm install express cors dotenv mongoose bcryptjs jsonwebtoken multer
npm install --save-dev nodemon

# What each does:
# express - Web framework
# cors - Allow requests from frontend
# dotenv - Read environment variables from .env file
# mongoose - MongoDB helper library
# bcryptjs - Hash passwords
# jsonwebtoken - Create JWT tokens
# multer - Handle file uploads
# nodemon - Auto-restart server on file changes
```

#### Step 1D: Create Backend File Structure
```powershell
# In the backend folder, create these directories:
mkdir config routes controllers models middleware utils

# Create main server file
New-Item -Path "server.js" -ItemType "file"
New-Item -Path ".env" -ItemType "file"
New-Item -Path ".env.example" -ItemType "file"
```

#### Step 1E: Initialize Frontend
```powershell
# Go back to samajsetu folder
cd ..

# Create React app with Vite (much faster than CRA)
npm create vite@latest frontend -- --template react

# Navigate into frontend
cd frontend

# Install dependencies
npm install

# Install additional packages
npm install axios react-router-dom tailwindcss postcss autoprefixer

# Initialize Tailwind CSS
npx tailwindcss init -p
```

---

## ⚙️ Environment Configuration

### Step 2A: Backend .env File
Create `.env` file in the backend folder with:

```env
# ============ SERVER CONFIG ============
PORT=5000
NODE_ENV=development

# ============ MONGODB CONFIG ============
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/samajsetu

# ============ JWT CONFIG ============
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_make_it_long_and_random
JWT_EXPIRE=7d

# ============ CLOUDINARY CONFIG ============
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**How to get these values:**
- **MONGODB_URI**: 
  1. Go to MongoDB Atlas (mongodb.com)
  2. Create cluster → Connect → Copy connection string
  3. Replace `<password>` and `<username>`
  
- **Cloudinary credentials**:
  1. Sign up on cloudinary.com
  2. Go to Dashboard
  3. Copy Cloud Name, API Key, and API Secret

### Step 2B: Create .env.example (for GitHub)
```env
# This file shows what variables are needed (without values)
# Never commit .env file to GitHub!

PORT=
NODE_ENV=
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRE=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Step 2C: Frontend .env File
Create `.env` in frontend folder:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Backend Implementation

### Step 3A: Create MongoDB Connection
Create file: `backend/config/database.js`

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📍 Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    // Exit process if connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
```

**What this does:**
- Connects to MongoDB using Mongoose
- Shows success/error messages
- Stops the app if connection fails

### Step 3B: Create Database Models

**Create file: `backend/models/User.js`**

```javascript
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// Define what a User should look like
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false // Don't send password in queries by default
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['citizen', 'admin'],
    default: 'citizen'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving user
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // Generate salt (random data)
    const salt = await bcryptjs.genSalt(10);
    // Hash password with salt
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Add method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

**Create file: `backend/models/Complaint.js`**

```javascript
const mongoose = require('mongoose');

// Define what a Complaint should look like
const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a complaint title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  category: {
    type: String,
    enum: ['noise', 'garbage', 'water'],
    required: [true, 'Please select a category']
  },
  description: {
    type: String,
    required: [true, 'Please provide complaint description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    type: String,
    required: [true, 'Please provide location']
  },
  imageUrl: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending'
  },
  // Reference to the citizen who submitted
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date,
    default: null
  }
});

// Auto-update the updatedAt field before saving
complaintSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // If status is being changed to 'resolved', set resolvedAt
  if (this.isModified('status') && this.status === 'resolved') {
    this.resolvedAt = Date.now();
  }
  
  next();
});

module.exports = mongoose.model('Complaint', complaintSchema);
```

### Step 3C: Create Authentication Middleware
**Create file: `backend/middleware/authMiddleware.js`**

```javascript
const jwt = require('jsonwebtoken');

// Verify JWT token and attach user info to request
const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    // Header looks like: "Bearer eyJhbGciOiJIUzI1NiIs..."
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided, please login' 
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

module.exports = authMiddleware;
```

**Create file: `backend/middleware/roleMiddleware.js`**

```javascript
// Check if user has required role
const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }
    
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. ${requiredRole} role required.` 
      });
    }
    
    next();
  };
};

module.exports = roleMiddleware;
```

### Step 3D: Create Cloudinary Configuration
**Create file: `backend/config/cloudinary.js`**

```javascript
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
```

### Step 3E: Create Upload Middleware
**Create file: `backend/middleware/uploadMiddleware.js`**

```javascript
const multer = require('multer');
const path = require('path');

// Configure storage (temporary, then upload to Cloudinary)
const storage = multer.memoryStorage(); // Store in memory temporarily

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif)'));
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

module.exports = upload;
```

### Step 3F: Create Controllers (Business Logic)
**Create file: `backend/controllers/authController.js`**

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Create new user (password will be hashed automatically)
    const user = await User.create({
      name,
      email,
      password,
      role: 'citizen' // New users are always citizens
    });
    
    // Generate token
    const token = generateToken(user._id, user.role);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }
    
    // Find user and explicitly select password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Check password
    const isPasswordCorrect = await user.matchPassword(password);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Generate token
    const token = generateToken(user._id, user.role);
    
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

**Create file: `backend/controllers/complaintController.js`**

```javascript
const Complaint = require('../models/Complaint');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

// Upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'samajsetu' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    
    // Convert buffer to stream
    Readable.from(buffer).pipe(stream);
  });
};

// Create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description, location } = req.body;
    const citizenId = req.user.userId; // From auth middleware
    
    // Validate required fields
    if (!title || !category || !description || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    
    // Validate category
    if (!['noise', 'garbage', 'water'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }
    
    // Upload image if provided
    let imageUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }
    
    // Create complaint
    const complaint = await Complaint.create({
      title,
      category,
      description,
      location,
      imageUrl,
      citizen: citizenId
    });
    
    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get complaints for logged-in citizen
exports.getMyComplaints = async (req, res) => {
  try {
    const citizenId = req.user.userId;
    
    const complaints = await Complaint.find({ citizen: citizenId })
      .sort({ createdAt: -1 }); // Newest first
    
    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single complaint by ID
exports.getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const citizenId = req.user.userId;
    
    const complaint = await Complaint.findById(id).populate('citizen');
    
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }
    
    // Check if user owns this complaint (unless admin)
    if (req.user.role === 'citizen' && complaint.citizen._id.toString() !== citizenId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this complaint'
      });
    }
    
    res.status(200).json({
      success: true,
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

**Create file: `backend/controllers/adminController.js`**

```javascript
const Complaint = require('../models/Complaint');

// Get all complaints with filters
exports.getAllComplaints = async (req, res) => {
  try {
    const { category, status, sortBy } = req.query;
    
    // Build filter object
    let filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    
    // Build sort object
    let sort = { createdAt: -1 }; // Default: newest first
    if (sortBy === 'oldest') sort = { createdAt: 1 };
    
    const complaints = await Complaint.find(filter)
      .populate('citizen', 'name email phone')
      .sort(sort);
    
    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update complaint status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Complaint status updated successfully',
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'pending' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'in-progress' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'resolved' });
    
    // Count by category
    const categoryStats = await Complaint.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.status(200).json({
      success: true,
      stats: {
        total: totalComplaints,
        pending: pendingComplaints,
        inProgress: inProgressComplaints,
        resolved: resolvedComplaints,
        byCategory: categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### Step 3G: Create API Routes
**Create file: `backend/routes/authRoutes.js`**

```javascript
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Public routes (no authentication needed)
router.post('/register', register);
router.post('/login', login);

module.exports = router;
```

**Create file: `backend/routes/complaintRoutes.js`**

```javascript
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  createComplaint,
  getMyComplaints,
  getComplaintById
} = require('../controllers/complaintController');

const router = express.Router();

// All complaint routes require authentication
router.use(authMiddleware);

// Create complaint (with image upload)
router.post('/create', upload.single('image'), createComplaint);

// Get citizen's own complaints
router.get('/my-complaints', getMyComplaints);

// Get single complaint
router.get('/:id', getComplaintById);

module.exports = router;
```

**Create file: `backend/routes/adminRoutes.js`**

```javascript
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  getAllComplaints,
  updateComplaintStatus,
  getDashboardStats
} = require('../controllers/adminController');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

// Get all complaints with filters
router.get('/complaints', getAllComplaints);

// Update complaint status
router.patch('/complaints/:id/status', updateComplaintStatus);

// Get dashboard statistics
router.get('/dashboard/stats', getDashboardStats);

module.exports = router;
```

### Step 3H: Create Main Server File
**Update `backend/server.js`**

```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'SAMAJSETU Backend is running!' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});
```

### Step 3I: Update Backend package.json Scripts
**In `backend/package.json`, update the scripts section:**

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

---

## ⚛️ Frontend Implementation (Coming Next Part)

This continues in the next section. The backend is now ready to test!

---

## 🧪 Testing Your Backend

### Start the Backend Server
```powershell
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully!
📍 Database: samajsetu
🚀 Server running at http://localhost:5000
📍 Environment: development
```

### Test Endpoints with Postman or Thunder Client

**1. Register a User**
```
POST http://localhost:5000/api/auth/register
Headers: Content-Type: application/json

Body:
{
  "name": "John Citizen",
  "email": "john@example.com",
  "password": "password123"
}
```

**2. Login**
```
POST http://localhost:5000/api/auth/login
Headers: Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response will include a token - copy it!
```

**3. Submit Complaint**
```
POST http://localhost:5000/api/complaints/create
Headers: 
  - Authorization: Bearer <YOUR_TOKEN_HERE>
  - Content-Type: multipart/form-data

Form Data:
  - title: "Noise Pollution on Main Street"
  - category: "noise"
  - description: "Construction noise during night hours"
  - location: "Main Street, Downtown"
  - image: <select an image file>
```

---

## 🎯 Beginner Tips

1. **Always check your .env file** - Missing variables cause cryptic errors
2. **Read error messages carefully** - They tell you exactly what's wrong
3. **Use console.log() liberally** - Help yourself understand code flow
4. **Test each endpoint before moving to next** - Catch errors early
5. **Never commit .env to GitHub** - It contains secrets!

---

## ⚠️ Common Beginner Mistakes

| Mistake | Solution |
|---------|----------|
| "Cannot find module 'express'" | Run `npm install` in backend folder |
| MongoDB connection fails | Check MONGODB_URI in .env |
| "Invalid token" error | Make sure you're sending token in Authorization header |
| Image upload fails | Check Cloudinary credentials in .env |
| CORS errors | Make sure backend has `app.use(cors())` |

---

Next Steps:
→ Continue with Frontend Setup (Part 2)
→ Connect Frontend and Backend
→ Test Full Application Flow
