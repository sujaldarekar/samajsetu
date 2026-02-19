# 🌉 SamajSetu - Digital Complaint Management System

> **SamajSetu** (सामाज सेतु - "Social Bridge") - Bridging the gap between citizens and government for efficient complaint handling.

A complete MERN full-stack web application for managing citizen complaints related to social services. Built for portfolio projects and real-world problem solving.

**Live Demo**: Coming Soon | **Documentation**: [Read Full Docs](./PROJECT_OVERVIEW.md)

---

## Quick Links
- 📖 [Full Documentation](./PROJECT_OVERVIEW.md)
- 🛠️ [Setup Guides](./docs/)
- 📚 [API Reference](./docs/API_REFERENCE.md)
- 🤝 [Contributing](./CONTRIBUTING.md)
- 🔒 [Security Policy](./SECURITY.md)
- ❓ [FAQ & Support](./SUPPORT.md)

---

## ✨ Features

### For Citizens 👨‍💼
- ✅ Register and secure login with JWT authentication
- ✅ Submit complaints with photo proof
- ✅ Real-time status tracking (Pending → In Progress → Resolved)
- ✅ View all own submitted complaints
- ✅ Responsive mobile-friendly interface

### For Government Admin ⚙️
- ✅ Secure admin login
- ✅ View ALL complaints from citizens
- ✅ Filter complaints by category and status
- ✅ Update complaint status in real-time
- ✅ View dashboard statistics and analytics

### Complaint Categories 📋
- 🔊 **Noise Pollution** - Loud construction, loudspeakers, traffic noise
- 🗑️ **Garbage/Cleanliness** - Uncleaned streets, waste dumping
- 💧 **Water Supply** - No water, contamination, pipe leaks

---

## 🛠️ Tech Stack

---

## 📁 Project Structure

```
samajsetu/ **Database** | MongoDB (Atlas or Local) |
| **Image Storage** | Cloudinary |
| **Authentication** | JWT (JSON Web Tokens) with bcrypt |

---

## 📦 Project Structure

```
samajsetu/
│
├── backend/                          # Node.js Express API
│   ├── config/                       # Configuration files
│   ├── controllers/                  # Business logic
│   ├── models/                       # MongoDB schemas
│   ├── routes/                       # API endpoints
│   ├── middleware/                   # Custom middleware
│   ├── server.js                     # Entry point
│   └── package.json
│
├── frontend/                         # React + Vite App
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   ├── pages/                    # Page components
│   │   ├── services/                 # API services
│   │   ├── styles/                   # CSS/Tailwind styles
│   │   ├── App.jsx                   # Root component
│   │   └── main.jsx                  # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── docs/                             # Documentation
│   ├── PROJECT_OVERVIEW.md           # Complete overview
│   ├── SETUP_GUIDE_PART1_BACKEND.md  # Backend setup
│   ├── SETUP_GUIDE_PART2_FRONTEND.md # Frontend setup
│   ├── API_REFERENCE.md              # API documentation
│   ├── BEGINNER_GUIDE.md             # Tips for beginners
│   └── TROUBLESHOOTING.md            # Common issues
│
└── README.md                         # This file
```

---

## Quick Start (5 Minutes)

### Prerequisites
- Node.js v18+
- MongoDB Account (Atlas free tier)
- Cloudinary Account (free tier)
- VS Code or any editor

### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file (copy from .env.example)
# Add your MongoDB URI and Cloudinary credentials

# 4. Start backend server
npm run dev
# Server runs at http://localhost:5000
```

### Frontend Setup (New Terminal)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env.local (copy from .env.example)
# Already configured for localhost:5000

# 4. Start frontend server
npm run dev
# Frontend runs at http://localhost:5173
```

### Test the Application

1. Open `http://localhost:5173` in your browser
2. Register a new account or use demo credentials:
   - **Citizen**: citizen@example.com / password123
   - **Admin**: admin@example.com / admin123

---

## 🚀 Deploy on Render

This repository now includes a Render Blueprint file: `render.yaml` (project root).

### One-time setup
1. Push this repo to GitHub.
2. In Render, create a new **Blueprint** and select this repository.
3. Render will create:
  - `samajsetu-backend` (Node web service)
  - `samajsetu-frontend` (Static site)

### Required environment variables

#### Backend (`samajsetu-backend`)
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRE` (default in blueprint: `7d`)
- `ADMIN_REGISTRATION_CODE`
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

#### Frontend (`samajsetu-frontend`)
- `VITE_API_URL` = `https://<your-backend-service>.onrender.com/api`

### SPA routing
`render.yaml` already includes a rewrite rule (`/* -> /index.html`) so React Router routes work correctly.

---

## 📚 Complete Documentation

### Setup & Installation
- **[Setup Guide Part 1: Backend](./docs/SETUP_GUIDE_PART1_BACKEND.md)** - Complete backend setup with code
- **[Setup Guide Part 2: Frontend](./docs/SETUP_GUIDE_PART2_FRONTEND.md)** - Frontend setup and components
- **[Environment Configuration](./docs/CONFIGURATION.md)** - How to configure .env files

### API & Architecture
- **[API Reference](./docs/API_REFERENCE.md)** - All API endpoints with examples
- **[Architecture Overview](./docs/ARCHITECTURE.md)** - System design and data flow
- **[Database Schema](./docs/DATABASE_SCHEMA.md)** - MongoDB collections

### For Beginners
- **[Beginner's Guide](./docs/BEGINNER_GUIDE.md)** - Concepts explained simply
- **[Common Mistakes](./docs/COMMON_MISTAKES.md)** - What NOT to do
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Fix common issues

### Deployment
- **[Deploy to Heroku](./docs/DEPLOY_HEROKU.md)** - Backend deployment
- **[Deploy to Vercel](./docs/DEPLOY_VERCEL.md)** - Frontend deployment

---

## 🎨 UI Features

### Color Palette
```
Primary Blue:    #1E88E5  (Trust & credibility)
Success Green:   #43A047  (Resolution & completion)
Accent Orange:   #FB8C00  (Important alerts)
Background:      #F5F7FA  (Clean & modern)
Dark Text:       #2C3E50  (Readability)
```

### Responsive Design
- ✅ Mobile-first approach
- ✅ Tablet optimized
- ✅ Desktop fully featured
- ✅ Tailwind CSS for styling
- ✅ Smooth animations and transitions

---

## 🔐 Security Features

### Authentication
- JWT tokens with expiration (7 days)
- Password hashing with bcryptjs
- Protected routes for citizens and admins
- Role-based access control

### Data Protection
- HTTPS ready (for production)
- Environment variables for secrets
- Secure password transmission
- Input validation on frontend and backend

---

## 📖 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register          → Register new user
POST   /api/auth/login             → Login user
```

### Complaint Endpoints (Authenticated)
```
POST   /api/complaints/create      → Create new complaint
GET    /api/complaints/my-complaints → Get citizen's complaints
GET    /api/complaints/:id         → Get complaint details
```

### Admin Endpoints (Admin Role Only)
```
GET    /api/admin/complaints       → Get all complaints (with filters)
PATCH  /api/admin/complaints/:id/status → Update complaint status
GET    /api/admin/dashboard/stats  → Get dashboard statistics
```

For detailed API documentation, see [API_REFERENCE.md](./docs/API_REFERENCE.md)

---

## 🎯 User Roles & Permissions

### Citizen
- Register and login
- Submit complaints (max 1000 char description)
- Upload image proof (max 5MB)
- View only own complaints
- Track status updates
- Cannot access admin features

### Admin
- Login with admin credentials
- View ALL complaints from all citizens
- Filter by category, status, date
- Update complaint status
- View statistics and analytics
- Cannot submit complaints (admin only)

---

## 💡 Key Concepts for Beginners

### What is JWT?
A secure token system where the server signs a token with a secret key. The client stores this token and sends it with every request. Server verifies the signature to ensure token is valid.

### What is MongoDB?
A NoSQL database that stores data in JSON-like documents instead of traditional tables. Great for flexible schemas and scalability.

### What is Mongoose?
A JavaScript library that makes it easier to work with MongoDB. It provides schema validation, middleware hooks, and cleaner syntax.

### What is Multer?
A middleware for Node.js that handles file uploads. It validates and processes files before they're sent to Cloudinary.

### What is Cloudinary?
A cloud service that hosts and delivers images. Instead of storing images on your server, you upload them to Cloudinary and get a URL to use.

---

## Going to Production

### Backend
1. Deploy to Heroku, Railway, or AWS
2. Set secure environment variables
3. Use MongoDB Atlas (cloud)
4. Enable HTTPS
5. Set up logging and monitoring

### Frontend
1. Build optimized: `npm run build`
2. Deploy to Vercel, Netlify, or GitHub Pages
3. Update API URL in .env
4. Enable caching and CDN

See deployment guides in `./docs/` for detailed steps.

---

## 📊 Database Schemas

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: String, // "citizen" or "admin"
  createdAt: Date
}
```

### Complaint Collection
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
  resolvedAt: Date
}
```

---

## 🤝 Contributing

This is a beginner-friendly project! Feel free to:
- Fork the repository
- Submit pull requests
- Report issues
- Suggest improvements
- Add new features

---

## 📝 Code Comments

Every function and important logic is commented with:
- What the function does
- What parameters it accepts
- What it returns
- Why we're doing it this way

This makes the code perfect for learning!

---

## 🎓 Learning Path

**Week 1-2: Basics**
- Learn Node.js and Express fundamentals
- Understand MongoDB and Mongoose
- Practice creating CRUD operations

**Week 2-3: Authentication**
- Implement JWT authentication
- Hash passwords with bcryptjs
- Create protected routes

**Week 3-4: Frontend**
- Learn React hooks (useState, useEffect)
- Master React Router for navigation
- Handle forms and validation

**Week 4-5: Integration**
- Connect frontend to backend API
- Handle file uploads with Multer
- Store images on Cloudinary

**Week 5-6: Polish & Deploy**
- Add error handling
- Improve UI/UX
- Write tests
- Deploy to production

---

## 🐛 Debugging Tips

1. **Check Console Errors**: Both browser console and VS Code terminal
2. **Use Network Tab**: See actual API requests and responses
3. **Check .env Files**: Most errors come from missing variables
4. **Add console.log()**: Strategic logging helps understand flow
5. **Read Error Messages Carefully**: They tell you exactly what's wrong
6. **Google Error Messages**: Most errors have solutions online

---

## 📞 Support & Help

### Resources
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

### Common Issues & Fixes
See [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) for solutions to common problems.

---

## ⭐ Next Steps for Real-World Scale

1. **Email Notifications** - Send updates to citizens automatically
2. **SMS Integration** - Notify via SMS for urgent cases
3. **Real-time Updates** - Use WebSockets for live status changes
4. **Analytics Dashboard** - More detailed reports and insights
5. **Mobile App** - Build iOS/Android apps with React Native
6. **Blockchain** - Immutable complaint records
7. **AI Features** - Auto-categorize complaints, detect fraudulent submissions
8. **Multi-language** - Support multiple languages
9. **Payment Integration** - For premium features (future)
10. **API for Third Parties** - Allow external integrations

---

## � Stats & Badges

<div align="center">

![GitHub Stars](https://img.shields.io/badge/Stars-⭐⭐⭐⭐⭐-yellow)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-green)
![Last Updated](https://img.shields.io/badge/Last%20Update-Feb%202024-blue)
![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)
![React](https://img.shields.io/badge/React-18.2-blue)

</div>

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- How to report bugs
- How to suggest features
- How to submit pull requests
- Code style guidelines

**Quick steps:**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔒 Security

Security is important! See [SECURITY.md](SECURITY.md) for:
- Security best practices
- How to report vulnerabilities
- Environment variable setup
- Production recommendations

⚠️ **Important**: Never commit `.env` files with real credentials!

---

## ❓ FAQ & Support

### Common Questions
- **Q: Can I deploy this?** Yes! See deployment guides in docs.
- **Q: Is this production-ready?** The code is solid, but add unit tests before production.
- **Q: Can I use this commercially?** Yes, it's MIT licensed.
- **Q: How do I add new features?** See Contributing Guide and code structure.

For more help, visit [SUPPORT.md](SUPPORT.md)

---

## 📄 License

This project is open source and available under the **MIT License** - see [LICENSE](LICENSE) file for details.

```
MIT License © 2024 Sujal Y. Darekar
```

---

## 🙏 Acknowledgments

- Built with ❤️ for learning and community service
- Inspired by real-world government systems
- Thanks to MongoDB, Express, React, and Node.js communities
- Thanks to all contributors and supporters

---

## 👥 Community

- **[GitHub Issues]** - Report bugs and request features
- **[GitHub Discussions]** - Ask questions and share ideas
- **[Email Support]** - Direct communication

---

## 🎯 Project Status

- ✅ **Core Features Complete** - Full complaint management system
- ✅ **Authentication System** - User and admin authentication
- ✅ **Cloud Integration** - Cloudinary image hosting
- 🔄 **In Development** - Real-time notifications, Advanced analytics
- 📋 **Roadmap** - Mobile app, Two-factor auth, Payment integration

---

## 📈 Growth & Learning Path

**For Beginners:**
1. Clone the project
2. Understand the folder structure
3. Follow Setup Guides
4. Try modifying frontend UI
5. Experiment with backend logic

**For Intermediate Developers:**
1. Add new complaint categories
2. Implement new filtering options
3. Create additional admin features
4. Add input validation

**For Advanced Developers:**
1. Set up CI/CD pipelines
2. Add automated tests
3. Implement caching strategies
4. Optimize database queries
5. Deploy to production

---

## 📧 Contact & Feedback

Have suggestions? Found a bug? Want to collaborate?
- Open an issue on GitHub
- Contact via email
- Join our community

---

<div align="center">

**SAMAJSETU** - Bridging Citizens & Government 🌉

Built with Node.js | React | MongoDB | Cloudinary

Made for Learning | Made for Community

⭐ If this helped you, please star the repository!

</div>
