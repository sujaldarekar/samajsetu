# SAMAJSETU Backend

Node.js + Express API for the SAMAJSETU complaint management system.

## 📋 Prerequisites

- Node.js v18+
- MongoDB (Atlas or Local)
- Cloudinary Account
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file based on `.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Run Server
```bash
npm run dev
```

Server starts at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # Business logic
├── models/          # MongoDB schemas
├── routes/          # API endpoints
├── middleware/      # Custom middleware
├── utils/           # Helper functions
├── server.js        # Main entry point
└── package.json
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Complaints
- `POST /api/complaints/create` - Submit complaint
- `GET /api/complaints/my-complaints` - Get citizen's complaints
- `GET /api/complaints/:id` - Get complaint details

### Admin
- `GET /api/admin/complaints` - Get all complaints
- `PATCH /api/admin/complaints/:id/status` - Update status
- `GET /api/admin/dashboard/stats` - Dashboard statistics

## 🔐 Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

## 📚 Documentation

See [SETUP_GUIDE_PART1_BACKEND.md](../docs/SETUP_GUIDE_PART1_BACKEND.md) for detailed setup instructions.

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT in .env |
| MongoDB connection fails | Check MONGODB_URI in .env |
| Invalid token error | Make sure to include full "Bearer" prefix |
| CORS errors | Check cors() middleware is enabled |

## 📝 Code Comments

Every function and important logic is commented to help beginners understand the code.

---

**Built with ❤️ for SAMAJSETU**
