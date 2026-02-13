@echo off
REM SamajSetu Setup Script for Windows
REM This script helps set up the entire project for development

echo.
echo 🚀 SamajSetu Setup Script
echo ========================
echo.

REM Check Node.js
echo ✅ Checking Node.js...
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js v14 or higher
    exit /b 1
)

echo Node.js version:
node --version
echo NPM version:
npm --version
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend
if not exist ".env" (
    echo   Creating .env file from .env.example...
    copy .env.example .env
    echo   ⚠️  Please update backend\.env with your credentials
)

echo   Installing dependencies...
call npm install

echo.
echo ✅ Backend setup complete!
echo.

REM Setup Frontend
cd ..\frontend
echo 📦 Setting up Frontend...

if not exist ".env" (
    echo   Creating .env file from .env.example...
    copy .env.example .env
)

echo   Installing dependencies...
call npm install

echo.
echo ✅ Frontend setup complete!
echo.

REM Summary
echo ================================
echo 🎉 Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Update backend\.env with your credentials:
echo    - MongoDB URI
echo    - Cloudinary credentials
echo    - JWT Secret
echo.
echo 2. Start the backend:
echo    cd backend ^&^& npm run dev
echo.
echo 3. In another terminal, start the frontend:
echo    cd frontend ^&^& npm run dev
echo.
echo 4. Open http://localhost:5173 in your browser
echo.
echo 📚 Documentation:
echo   - Setup Guides: docs/
echo   - API Reference: docs/API_REFERENCE.md
echo   - Contributing: CONTRIBUTING.md
echo   - Deployment: DEPLOY.md
echo.
echo Happy coding! 🚀
echo.
pause
