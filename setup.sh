#!/bin/bash

# SamajSetu Setup Script
# This script helps set up the entire project for development

echo "🚀 SamajSetu Setup Script"
echo "========================"
echo ""

# Check Node.js
echo "✅ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher"
    exit 1
fi

echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend
if [ ! -f ".env" ]; then
    echo "  Creating .env file from .env.example..."
    cp .env.example .env
    echo "  ⚠️  Please update backend/.env with your credentials"
fi

echo "  Installing dependencies..."
npm install

echo ""
echo "✅ Backend setup complete!"
echo ""

# Setup Frontend
cd ../frontend
echo "📦 Setting up Frontend..."

if [ ! -f ".env" ]; then
    echo "  Creating .env file from .env.example..."
    cp .env.example .env
fi

echo "  Installing dependencies..."
npm install

echo ""
echo "✅ Frontend setup complete!"
echo ""

# Summary
echo "================================"
echo "🎉 Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your credentials:"
echo "   - MongoDB URI"
echo "   - Cloudinary credentials"
echo "   - JWT Secret"
echo ""
echo "2. Start the backend:"
echo "   cd backend && npm run dev"
echo ""
echo "3. In another terminal, start the frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "📚 Documentation:"
echo "  - Setup Guides: docs/"
echo "  - API Reference: docs/API_REFERENCE.md"
echo "  - Contributing: CONTRIBUTING.md"
echo "  - Deployment: DEPLOY.md"
echo ""
echo "Happy coding! 🚀"
