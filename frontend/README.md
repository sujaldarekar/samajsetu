# SAMAJSETU Frontend

React.js + Vite frontend for the SAMAJSETU complaint management system.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env.local` based on `.env.example`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```

Frontend starts at `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── styles/          # CSS files
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── public/              # Static files
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json
```

## 🎨 Available Routes

### Public
- `/` - Home page
- `/register` - Register new user
- `/login` - Login to account

### Protected (Citizen)
- `/dashboard` - Citizen dashboard
- `/submit-complaint` - Submit new complaint
- `/my-complaints` - View own complaints

### Protected (Admin)
- `/admin` - Admin dashboard with all complaints

## 🛠️ Technologies

- React.js 18.2
- Vite (fast build tool)
- React Router v6
- Axios (HTTP client)
- Tailwind CSS (styling)

## 📝 Component Structure

### Components
- `Navbar.jsx` - Top navigation
- `Footer.jsx` - Bottom footer
- `LoadingSpinner.jsx` - Loading indicator
- `ProtectedRoute.jsx` - Route protection
- `StatusBadge.jsx` - Status indicator
- `ComplaintCard.jsx` - Complaint display

### Pages
- `Home.jsx` - Landing page
- `Register.jsx` - Registration form
- `Login.jsx` - Login form
- `Dashboard.jsx` - Citizen main dashboard
- `SubmitComplaint.jsx` - Complaint form
- `MyComplaints.jsx` - Citizen's complaints list
- `AdminDashboard.jsx` - Admin panel
- `NotFound.jsx` - 404 page

### Services
- `api.js` - Axios configuration with interceptors
- `authService.js` - Authentication API calls
- `complaintService.js` - Complaint API calls

## 🔐 Authentication

JWT tokens are stored in `localStorage` and automatically added to all requests via axios interceptor.

## 🎨 Color Scheme

- Primary: #1E88E5 (Blue)
- Secondary: #43A047 (Green)
- Accent: #FB8C00 (Orange)
- Background: #F5F7FA (Light)
- Dark: #2C3E50
- Light: #7F8C8D

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| Port 5173 in use | Change port in `vite.config.js` |
| API calls failing | Check `VITE_API_URL` in `.env.local` |
| Styles not loading | Run `npm run dev` to rebuild Tailwind |
| 401 Unauthorized errors | Clear localStorage and re-login |

---

**Built with ❤️ for SAMAJSETU**
