# API Reference - SAMAJSETU

Complete API documentation with examples for all endpoints.

---

## Base URL

```
http://localhost:5000/api
```

---

## Authentication

Most endpoints require JWT authentication. Include token in Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## API Endpoints

### Authentication (Public)

#### Register New User
```
POST /auth/register

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  }
}
```

#### Login User
```
POST /auth/login

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  }
}
```

---

### Complaints (Protected - Citizen)

#### Create Complaint
```
POST /complaints/create
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
{
  "title": "Noise Pollution in Sector 5",
  "category": "noise",
  "description": "There is excessive construction noise since 6 AM every day",
  "location": "Sector 5, Downtown District",
  "image": <file>
}

Response (201):
{
  "success": true,
  "message": "Complaint submitted successfully! Complaint ID: 507f...",
  "complaint": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Noise Pollution in Sector 5",
    "category": "noise",
    "description": "There is excessive construction noise...",
    "location": "Sector 5, Downtown District",
    "imageUrl": "https://res.cloudinary.com/...",
    "status": "pending",
    "citizen": "507f1f77bcf86cd799439012",
    "createdAt": "2026-02-09T10:30:00.000Z",
    "updatedAt": "2026-02-09T10:30:00.000Z"
  }
}
```

#### Get My Complaints
```
GET /complaints/my-complaints
Headers: Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "count": 3,
  "message": "📋 You have 3 complaints",
  "complaints": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Noise Pollution in Sector 5",
      "category": "noise",
      "status": "pending",
      "createdAt": "2026-02-09T10:30:00.000Z"
    }
    // More complaints...
  ]
}
```

#### Get Complaint Details
```
GET /complaints/:id
Headers: Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "complaint": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Noise Pollution in Sector 5",
    "category": "noise",
    "description": "There is excessive construction noise...",
    "location": "Sector 5, Downtown District",
    "imageUrl": "https://res.cloudinary.com/...",
    "status": "pending",
    "citizen": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "address": "Sector 5, Downtown"
    },
    "createdAt": "2026-02-09T10:30:00.000Z"
  }
}
```

---

### Admin (Protected - Admin Role Only)

#### Get All Complaints
```
GET /admin/complaints
Headers: Authorization: Bearer <admin_token>

Query Parameters (Optional):
?category=noise         → Filter by category (noise, garbage, water)
?status=pending         → Filter by status (pending, in-progress, resolved)
?sortBy=oldest          → Sort by oldest first (default is newest)

Example: /admin/complaints?category=noise&status=pending

Response (200):
{
  "success": true,
  "count": 15,
  "filter": {
    "category": "noise",
    "status": "pending",
    "sortBy": null
  },
  "complaints": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Noise Pollution",
      "category": "noise",
      "status": "pending",
      "citizen": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2026-02-09T10:30:00.000Z"
    }
    // More complaints...
  ]
}
```

#### Update Complaint Status
```
PATCH /admin/complaints/:id/status
Headers: Authorization: Bearer <admin_token>
Content-Type: application/json

Request Body:
{
  "status": "in-progress"
}

Valid statuses: "pending" | "in-progress" | "resolved"

Response (200):
{
  "success": true,
  "message": "Complaint status updated successfully",
  "complaint": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Noise Pollution",
    "status": "in-progress",
    "updatedAt": "2026-02-09T11:45:00.000Z"
  }
}
```

#### Get Dashboard Statistics
```
GET /admin/dashboard/stats
Headers: Authorization: Bearer <admin_token>

Response (200):
{
  "success": true,
  "stats": {
    "total": 250,
    "pending": 45,
    "inProgress": 120,
    "resolved": 85,
    "resolutionRate": "34%",
    "byCategory": [
      {
        "_id": "noise",
        "count": 78
      },
      {
        "_id": "garbage",
        "count": 95
      },
      {
        "_id": "water",
        "count": 77
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired authentication token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. This action requires admin privileges"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Complaint not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Testing with Postman/Thunder Client

### 1. Register
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "test123"
}
```
**Save the token from response**

### 3. Submit Complaint
```
POST http://localhost:5000/api/complaints/create
Headers:
  Authorization: Bearer <token_from_login>
  Content-Type: multipart/form-data

Form Data:
  title: "Test Complaint"
  category: "noise"
  description: "Testing the API"
  location: "Test Location"
  image: <select a file>
```

### 4. Get My Complaints
```
GET http://localhost:5000/api/complaints/my-complaints
Headers:
  Authorization: Bearer <your_token>
```

### 5. Admin: Get All Complaints
```
GET http://localhost:5000/api/admin/complaints?category=noise
Headers:
  Authorization: Bearer <admin_token>
```

### 6. Admin: Update Status
```
PATCH http://localhost:5000/api/admin/complaints/<complaint_id>/status
Headers:
  Authorization: Bearer <admin_token>
Body (JSON):
{
  "status": "resolved"
}
```

---

## Rate Limiting

Currently no rate limiting. In production, implement:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Pagination (Future Feature)

Planned addition:
```
GET /api/admin/complaints?page=2&limit=20
```

---

## Response Headers

All successful responses include:
```
Content-Type: application/json
Access-Control-Allow-Origin: *
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Auth token missing/invalid |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Backend issue |

---

## Tips for Testing

1. **Always copy the full token** including "Bearer " prefix
2. **Check Content-Type headers** for each request
3. **Use JSON format** for body (except file uploads)
4. **Test filters one at a time** before combining
5. **Save tokens in Postman** for reuse

---

Last Updated: February 2026
