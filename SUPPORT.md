# Support

Thank you for using **SamajSetu**! We're here to help.

## 📞 Getting Help

### 📚 Documentation
- **[Setup Guide](./docs/SETUP_GUIDE_PART1_BACKEND.md)** - Complete setup instructions
- **[Beginner Guide](./docs/BEGINNER_GUIDE.md)** - For those new to the project
- **[API Reference](./docs/API_REFERENCE.md)** - Detailed API documentation
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Project Overview](./PROJECT_OVERVIEW.md)** - Architecture and design

### 🐛 Found a Bug?
1. Check [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
2. Search existing GitHub issues
3. Create a new issue with:
   - Clear problem description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots (if applicable)

### 💡 Feature Request?
1. Check [Project Overview](./PROJECT_OVERVIEW.md) for roadmap
2. Search existing GitHub issues
3. Create an issue with:
   - Clear title
   - Detailed description
   - Use case and benefits
   - Proposed solution (optional)

### ❓ General Questions?
- Check the [FAQ](#faq) below
- Review GitHub discussions
- Create a new discussion

## FAQ

### Setup & Installation

**Q: I'm getting MongoDB connection errors**
A: See [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md#database-issues)

**Q: How do I get Cloudinary credentials?**
A: Create a free account at [cloudinary.com](https://cloudinary.com) and copy your API credentials to `.env`

**Q: Can I run this locally without MongoDB Atlas?**
A: Yes! Install MongoDB locally and use `mongodb://localhost:27017/samajsetu` as MONGODB_URI

### Features & Usage

**Q: How do I submit a complaint as a user?**
A: Register → Login → Navigate to "Submit Complaint" → Fill form → Upload image → Submit

**Q: How do I access the admin dashboard?**
A: Go to Admin Login → Use admin credentials → You'll need the admin registration code first

**Q: Can I edit a complaint after submission?**
A: Currently, you can only view and track status. Full edit is in the roadmap.

### Deployment

**Q: Where can I host this project?**
A: 
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, Render, DigitalOcean, AWS
- **Database**: MongoDB Atlas (free tier available)

**Q: How do I deploy to production?**
A: See [Setup Guide Part 2](./docs/SETUP_GUIDE_PART2_FRONTEND.md)

### Development

**Q: How do I add a new complaint category?**
A: See backend models and controllers. Update both backend and frontend constants.

**Q: How do I customize the UI?**
A: All styling uses Tailwind CSS. Check `frontend/src/styles/globals.css`

## 📋 Common Issues & Solutions

### Frontend Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend Won't Connect to Database
```bash
# Verify .env has correct MONGODB_URI
# Test connection in MongoDB Atlas
# Check database name matches
```

### Images Not Uploading
```bash
# Verify Cloudinary credentials in .env
# Check image file size (max should be set)
# Check multer configuration in uploadMiddleware.js
```

## 📞 Contact

- **Issues**: GitHub Issues (create in your repository)
- **Discussions**: GitHub Discussions (create in your repository)
- **Email**: Contact the maintainer

## ⏱️ Response Times

- **Bug Reports**: 24-48 hours
- **Documentation**: Within 1 week
- **Feature Requests**: Reviewed within 1 week
- **Security Issues**: [See SECURITY.md](./SECURITY.md)

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT Guide](https://jwt.io/)

---

We appreciate your patience and support! 🙏

**Happy coding!** 🚀
