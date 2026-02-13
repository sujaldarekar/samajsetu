# 🐛 Troubleshooting Guide - SAMAJSETU

Solutions to common problems you might encounter.

---

## 🔴 Backend Issues

### Issue: "Cannot find module 'express'"

**Cause:** Dependencies not installed

**Solution:**
```bash
cd backend
npm install
```

**Verify:**
```bash
ls node_modules
# Should show many folders including express, mongodb, etc.
```

---

### Issue: "MongooseError: Cannot connect to MongoDB"

**Cause 1:** Services not running (local MongoDB)
```bash
# Windows with MongoDB installed:
# Search "Services" → Find MongoDB Server → Start it

# Or use MongoDB Atlas (cloud) instead
```

**Cause 2:** Wrong connection string in .env
```
❌ WRONG: MONGODB_URI=mongodb://localhost:27017
✅ RIGHT: MONGODB_URI=mongodb://localhost:27017/samajsetu

# OR for Atlas:
✅ RIGHT: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/samajsetu
```

**Cause 3:** Firewall blocking connection
```bash
# Windows Firewall → Allow MongoDB
# Or disable temporarily for testing
```

**Check Connection:**
```bash
# Test in Node.js console
node
> require('mongoose').connect('YOUR_URI')
# Should not throw error
```

---

### Issue: "Error: dotenv is not defined"

**Cause:** .env file not loaded before using env variables

**Solution:** In server.js, add at TOP:
```javascript
// Must be FIRST line
require('dotenv').config();

// Then other imports
const express = require('express');
```

**NOT like this:**
```javascript
const express = require('express');
require('dotenv').config(); // Wrong place!
```

---

### Issue: Server starts but API returns "Error: Cloudinary is not configured"

**Cause:** Cloudinary environment variables missing

**Solution:**
1. Get credentials from https://cloudinary.com/
2. Add to .env:
```
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Restart server:
```bash
npm run dev
```

---

### Issue: "Port 5000 already in use"

**Cause 1:** Application already running
```bash
# Kill running process
netstat -ano | findstr :5000  # Windows
kill -9 <PID>                # Mac/Linux

# Or simply:
# Check Task Manager → End Node.js process
```

**Cause 2:** Another application using port
```bash
# Use different port
# In .env:
PORT=5001

# Or run with:
PORT=5001 npm run dev
```

---

### Issue: "Cannot POST /api/auth/register" (404 Error)

**Cause:** Routes not mounted correctly

**Check:**
1. Routes file exists: `backend/routes/authRoutes.js`
2. Routes imported in server.js:
```javascript
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
```

3. POST endpoint exists in authRoutes.js:
```javascript
router.post('/register', register);
```

---

### Issue: "JWT token is invalid or expired"

**Cause 1:** Token string corrupted

**Fix in Frontend:**
```javascript
// Don't store full "Bearer token"
localStorage.setItem('token', response.token); // Just token
```

**Cause 2:** Token actually expired

```javascript
// JWT expires in 7 days by default
// User needs to login again
```

**Cause 3:** Secret key changed

```
// .env:
JWT_SECRET=your_secret_key
# Don't change this after deployment!
```

---

### Issue: Image upload returns "File too large"

**Cause:** File exceeds 5MB limit

**Check File Size:**
- Right-click file → Properties
- If > 5MB, compress it or use smaller image

**Adjust Limit (temp for testing):**
```javascript
// In uploadMiddleware.js
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});
```

---

### Issue: "Cloudinary upload failed" but no image validation error

**Cause:** Cloudinary credentials wrong

**Debug:**
```javascript
// In complaintController.js, add logging:
console.log('Cloudinary Name:', process.env.CLOUDINARY_NAME);
console.log('API Key exists:', !!process.env.CLOUDINARY_API_KEY);
console.log('API Secret exists:', !!process.env.CLOUDINARY_API_SECRET);
```

**Solution:**
1. Login to Cloudinary dashboard
2. Copy exact credentials
3. Paste in .env without extra spaces
4. Restart server

---

### Issue: CORS error - "Access to XMLHttpRequest blocked"

**Cause:** CORS not properly configured

**Fix in server.js:**
```javascript
const cors = require('cors');

// Add BEFORE routes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Then add routes
app.use('/api/auth', authRoutes);
```

**Error Message Example:**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/auth/login'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

---

## 🔵 Frontend Issues

### Issue: "VITE_API_URL is not defined"

**Cause:** .env.local missing

**Solution:**
```bash
cd frontend

# Create .env.local
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# Or manually create file with content:
# VITE_API_URL=http://localhost:5000/api
```

**Verify:**
```javascript
// In any component:
console.log(import.meta.env.VITE_API_URL);
// Should print: http://localhost:5000/api
```

---

### Issue: "Cannot find module 'react'"

**Cause:** Dependencies not installed

**Solution:**
```bash
cd frontend
npm install
```

---

### Issue: App runs but shows blank white page

**Cause 1:** JavaScript error in console

**Fix:**
1. Open DevTools (F12)
2. Go to Console tab
3. Read error message
4. Fix the error

**Cause 2:** index.html missing root element

**Check:**
```html
<!-- in index.html -->
<body>
  <div id="root"></div> <!-- This must exist -->
</body>
```

---

### Issue: Styles not loading (Tailwind not working)

**Cause 1:** tailwind.config.js not configured

**Check:**
```javascript
// frontend/tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  // ... rest of config
}
```

**Cause 2:** globals.css not imported

**Check:**
```javascript
// frontend/src/main.jsx
import './styles/globals.css'; // Must be here
import App from './App'
```

**Cause 3:** PostCSS not working

**Fix:**
```bash
cd frontend
npm install -D postcss autoprefixer
npm run dev
```

---

### Issue: Form submits but nothing happens

**Cause 1:** No error handling

**Add:**
```javascript
try {
  const result = await authService.login(email, password);
  console.log('Login successful:', result);
} catch (error) {
  console.log('Login failed:', error.message);
  setError(error.message);
}
```

**Cause 2:** API request not actually sent

**Check Network Tab:**
1. Open DevTools → Network tab
2. Submit form
3. Should see POST request
4. Click it to see response

---

### Issue: Login works but token not saving

**Cause:** localStorage not working

**Debug:**
```javascript
// In authService.js after login
console.log('Token before save:', token);
localStorage.setItem('token', token);
console.log('Token after save:', localStorage.getItem('token'));
```

**Common Fix:**
```javascript
// Don't save "Bearer token" string
// Save just the token
localStorage.setItem('token', response.token);

// In API interceptor:
const token = localStorage.getItem('token');
headers.Authorization = `Bearer ${token}`;
```

---

### Issue: Dashboard shows "401 Unauthorized"

**Cause:** Token not attached to requests

**Check axios interceptor:**
```javascript
// src/services/api.js
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

### Issue: Image upload shows "No file selected"

**Cause 1:** Input field name mismatch

**Check:**
```html
<!-- Form uses: -->
<input type="file" name="image" />

<!-- FormData expects: -->
formData.append('image', file);
```

**Cause 2:** Not stopping form default behavior

**Fix:**
```javascript
const handleSubmit = (e) => {
  e.preventDefault(); // Stop form from submitting normally
  uploadComplaint();
};
```

---

### Issue: Clicking buttons but no API call

**Cause:** onClick handler not defined

**Check:**
```javascript
// Wrong:
<button onClick="handleSubmit"></button>

// Correct:
<button onClick={handleSubmit}></button>

// OR with arrow function:
<button onClick={() => handleSubmit()}></button>
```

---

### Issue: Page keeps redirecting to login

**Cause:** Token expired

**Solution:**
```javascript
// In api.js response interceptor:
if (response.status === 401) {
  localStorage.clear();
  window.location.href = '/login';
}
```

**Fix:** Login again

---

### Issue: Admin dashboard shows 404

**Cause:** Not logged in as admin

**Check:**
1. Login with admin credentials
2. Verify email is "admin@example.com"
3. Check backend returns role: "admin" in token

---

## 🟡 Combined Frontend + Backend Issues

### Issue: Registration works but login doesn't

**Cause 1:** Password not hashed on registration

**Check backend/models/User.js:**
```javascript
// Must have pre-save middleware:
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

**Cause 2:** Password comparison wrong in login

**Check backend/controllers/authController.js:**
```javascript
const isPasswordMatch = await user.matchPassword(password);
// matchPassword method must exist in User model
```

---

### Issue: Complaint submits but doesn't appear

**Cause 1:** Not refetching after submit

**Fix:**
```javascript
// After successful submit:
const newComplaints = await complaintService.getMyComplaints();
setComplaints(newComplaints);
```

**Cause 2:** Backend create endpoint failing silently

**Check:**
1. Open browser Network tab
2. Submit complaint
3. Check POST response
4. Should see complaint object or error

---

### Issue: Image uploads but URL not showing

**Cause:** imageUrl not populated in response

**Check Backend:**
```javascript
// In complaintController.js
const complaint = await Complaint.create({
  // ... other fields
  imageUrl: cloudinaryUrl // Must set this
});
```

---

## 🟣 Environment & Setup Issues

### Issue: "npm: command not found"

**Cause:** Node.js not installed

**Solution:** Download and install from https://nodejs.org/

**Verify:**
```bash
node --version  # Should show v18+
npm --version   # Should show 8+
```

---

### Issue: MongoDB not starting on Windows

**Solution:**
1. Search "Services" in Windows
2. Find "MongoDB Server"
3. Right-click → Start

---

### Issue: Postman showing "Could not get any response"

**Cause 1:** Backend not running

**Fix:**
```bash
cd backend
npm run dev
# Should show "Server running on port 5000"
```

**Cause 2:** Wrong URL in Postman

**Check:**
```
✅ http://localhost:5000/api/auth/login
❌ http://localhost:3000/api/auth/login (wrong port)
❌ http://5000/api/auth/login (missing host)
```

---

### Issue: "Cannot find module 'dotenv'"

**Solution:**
```bash
npm install dotenv
```

---

## 📋 Debugging Checklist

Before asking for help, try:

- [ ] Read the error message carefully
- [ ] Check browser console (F12 → Console)
- [ ] Check server terminal for errors
- [ ] Verify .env files exist and have values
- [ ] Verify MongoDB is running
- [ ] Verify backend is running on 5000
- [ ] Verify frontend is running on 5173
- [ ] Check Network tab for API response
- [ ] Search error message on Google
- [ ] Check Stack Overflow for similar issues
- [ ] Read the relevant setup guide again

---

## 🆘 Getting Help

### 1. Collect Information
```
- Full error message
- What you were doing
- What you expected to happen
- Frontend or backend issue?
- .env variables set? (don't share values)
- Node/npm versions
```

### 2. Format Error
```
❌ "It's not working"

✅ "When I submit a complaint form, I get 
   '401 Unauthorized' in the Network tab"
```

### 3. Share
- Screenshot of error
- Code snippet causing issue
- Steps to reproduce

### 4. Don't Share
- ❌ .env files with real values
- ❌ API keys or secrets
- ❌ Passwords
- ❌ Full database URLs

---

## 📞 Additional Resources

- **Node.js Debugging:** https://nodejs.org/en/docs/guides/debugging-getting-started/
- **Express Error Handling:** https://expressjs.com/en/guide/error-handling.html
- **React Error Boundaries:** https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
- **MongoDB Troubleshooting:** https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/
- **Cloudinary Docs:** https://cloudinary.com/documentation

---

Last Updated: February 2026
