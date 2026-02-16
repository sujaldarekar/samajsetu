# SAMAJSETU - Digital Complaint Management System

## 🎯 Project Vision
SAMAJSETU (सामाज सेतु - "Social Bridge") is a digital platform that bridges the gap between citizens and government authorities for efficient complaint handling and resolution tracking.

---

## 📋 Table of Contents
1. [System Architecture](#system-architecture)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Setup Instructions](#setup-instructions)
5. [API Documentation](#api-documentation)
6. [Deployment Guide](#deployment-guide)
7. [Beginner Tips](#beginner-tips)

---

## 🏗️ System Architecture

### High-Level Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                    SAMAJSETU SYSTEM                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐      ┌──────────────────────┐   │
│  │   FRONTEND (React)   │◄─────►│  BACKEND (Express)   │   │
│  │                      │       │                      │   │
│  │ - Citizen Portal     │       │ - RESTful APIs       │   │
│  │ - Admin Dashboard    │       │ - JWT Auth           │   │
│  │ - Form Submission    │       │ - CRUD Operations    │   │
│  │ - Status Tracking    │       │ - File Handling      │   │
│  └──────────────────────┘       └──────────────────────┘   │
│           │                               │                  │
│           │                               │                  │
│           └───────────────────┬───────────┘                  │
│                               │                              │
│                    ┌──────────▼───────────┐                 │
│                    │    DATABASE (MongoDB) │                │
│                    │                       │                │
│                    │ - Users Collection    │                │
│                    │ - Complaints Coll.    │                │
│                    └───────────────────────┘                │
│                               │                              │
│                    ┌──────────▼───────────┐                 │
│                    │  CLOUDINARY (Cloud)   │                │
│                    │  Image Storage & CDN  │                │
│                    └───────────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow
1. **Citizen submits complaint** → Form validation → Upload image to Cloudinary → Save to MongoDB
2. **Admin views complaints** → Query MongoDB → Display with filters
3. **Status update** → Admin updates → Citizen receives notification (future enhancement)

---

## 📁 Project Structure

### Complete Folder Layout
```
samajsetu/
│
├── backend/                          # Node.js + Express API
│   ├── config/
│   │   ├── database.js              # MongoDB connection
│   │   ├── cloudinary.js            # Cloudinary setup
│   │   └── constants.js             # App constants
│   │
│   ├── controllers/
│   │   ├── authController.js        # Login, Register, JWT
│   │   ├── complaintController.js   # CRUD for complaints
│   │   └── adminController.js       # Admin operations
│   │
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   └── Complaint.js             # Complaint schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints
│   │   ├── complaintRoutes.js       # Complaint endpoints
│   │   └── adminRoutes.js           # Admin endpoints
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   ├── roleMiddleware.js        # Role validation
│   │   └── uploadMiddleware.js      # Multer config
│   │
│   ├── utils/
│   │   └── errorHandler.js          # Error handling
│   │
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Template for .env
│   ├── server.js                    # Entry point
│   ├── package.json
│   └── README.md
│
├── frontend/                         # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Top navigation
│   │   │   ├── Footer.jsx           # Footer
│   │   │   ├── ComplaintCard.jsx    # Complaint display card
│   │   │   ├── StatusBadge.jsx      # Status indicator
│   │   │   └── AdminSidebar.jsx     # Admin navigation
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Register.jsx         # User registration
│   │   │   ├── Login.jsx            # User login
│   │   │   ├── Dashboard.jsx        # Citizen dashboard
│   │   │   ├── SubmitComplaint.jsx  # Complaint form
│   │   │   ├── MyComplaints.jsx     # View own complaints
│   │   │   ├── AdminDashboard.jsx   # Admin panel
│   │   │   └── NotFound.jsx         # 404 page
│   │   │
│   │   ├── services/
│   │   │   ├── api.js               # Axios API calls
│   │   │   ├── authService.js       # Auth logic
│   │   │   └── complaintService.js  # Complaint logic
│   │   │
│   │   ├── styles/
│   │   │   └── globals.css          # Global styles
│   │   │
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── .env.example
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── docs/                            # Documentation
│   ├── SETUP_GUIDE.md              # Installation steps
│   ├── API_REFERENCE.md            # API documentation
│   ├── ARCHITECTURE.md             # System design details
│   ├── BEGINNER_GUIDE.md           # Tips for beginners
│   └── TROUBLESHOOTING.md          # Common issues & fixes
│
├── README.md                        # Project root README
└── .gitignore

```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React.js | UI framework |
| | Vite | Build tool (faster than CRA) |
| | Axios | HTTP client |
| | React Router | Navigation |
| | Tailwind CSS | Styling |
| **Backend** | Node.js | Runtime |
| | Express.js | Web framework |
| | Multer | File upload |
| | jsonwebtoken (JWT) | Authentication |
| | bcryptjs | Password encryption |
| **Database** | MongoDB | NoSQL database |
| | Mongoose | MongoDB ODM |
| **Cloud** | Cloudinary | Image storage |

---

## 🌈 Color Palette

```
Primary Blue:     #1E88E5  (Trust & credibility)
Success Green:    #43A047  (Resolution & completion)
Background:       #F5F7FA  (Clean & modern)
Accent Orange:    #FB8C00  (Important alerts)
Text Dark:        #2C3E50  (Readability)
Text Light:       #7F8C8D  (Secondary info)
```

---

## 👥 User Roles & Permissions

### Citizen (User)
- ✅ Register with email & password
- ✅ Login securely with JWT
- ✅ Submit complaints with images
- ✅ View own complaints only
- ✅ Track status in real-time
- ✅ Download complaint receipt (future)

### Government Admin
- ✅ Login with special admin credentials
- ✅ View ALL complaints from all citizens
- ✅ Filter by category, status, date
- ✅ Update complaint status
- ✅ Assign priority levels (future)
- ✅ Generate reports (future)

---

## 🔐 Authentication Flow

```
1. USER REGISTERS
   Input: Name, Email, Password
   → Hash password with bcryptjs
   → Save to MongoDB
   → Auto-login with JWT token
   
2. USER LOGS IN
   Input: Email, Password
   → Verify against database
   → Generate JWT token (expires in 7 days)
   → Return token to frontend
   
3. SUBSEQUENT REQUESTS
   Frontend sends: Authorization: Bearer <JWT_TOKEN>
   Backend validates token
   → If valid: Process request
   → If invalid: Return 401 Unauthorized
   
4. JWT TOKEN STRUCTURE
   Header: { alg: "HS256", type: "JWT" }
   Payload: { userId, role, email, iat, exp }
   Signature: HMAC-SHA256(header + payload + SECRET)
```

---

## 📊 Database Schemas

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: String, // "citizen" or "admin"
  createdAt: Date,
  updatedAt: Date
}
```

### Complaint Schema
```javascript
{
  _id: ObjectId,
  title: String,
  category: String, // "noise", "garbage", "water"
  description: String,
  location: String,
  imageUrl: String, // Cloudinary URL
  status: String, // "pending", "in-progress", "resolved"
  citizen: ObjectId, // Reference to User
  createdAt: Date,
  updatedAt: Date,
  resolvedAt: Date (optional)
}
```

---

## Quick Start (Overview)

### Backend Setup
```bash
cd backend
npm install
npm run dev        # Start server on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev        # Start Vite on http://localhost:5173
```

---

## 🎓 Key Concepts for Beginners

### What is JWT?
A secure token that proves user identity without storing session on server.

### What is Mongoose?
A library that makes MongoDB easier to use with JavaScript.

### What is Cloudinary?
A cloud service that stores images for you, giving you a URL to use anywhere.

### What is Middleware?
Functions that run between request and response to check permissions, validate data, etc.

---

## 💡 Next Steps from Here

1. **First**: Read [SETUP_GUIDE.md](./docs/SETUP_GUIDE.md)
2. **Then**: Follow backend setup in backend/README.md
3. **Next**: Follow frontend setup in frontend/README.md
4. **Finally**: Test all APIs with Postman

---

## 📝 Notes for Beginners

- **Don't Skip Steps**: Each step builds on the previous one
- **Test Frequently**: Test after each feature to catch errors early
- **Read Error Messages**: They tell you exactly what's wrong
- **Use Console.log()**: Add logs to understand code flow
- **Keep .env Secure**: Never commit .env file to GitHub

---

## 🤝 Support Resources

- MongoDB Docs: https://docs.mongodb.com/
- Express Guide: https://expressjs.com/
- React Docs: https://react.dev/
- Cloudinary Docs: https://cloudinary.com/developers

Last Updated: February 2026
