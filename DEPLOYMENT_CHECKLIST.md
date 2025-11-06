# 🚀 Quick Deployment Checklist

Use this checklist to ensure smooth deployment to Vercel.

## ✅ Pre-Deployment Checklist

### 1. Code Preparation
- [x] All changes committed to Git
- [x] Code pushed to GitHub
- [x] README.md updated with latest features
- [x] DEPLOYMENT.md guide created
- [x] Vercel.json configured
- [x] .env.example updated
- [x] .gitignore configured properly

### 2. Required Accounts & Setup
- [ ] GitHub account (your code is already there!)
- [ ] Vercel account - [Sign up](https://vercel.com/signup)
- [ ] Railway account - [Sign up](https://railway.app/)
- [ ] MongoDB Atlas account - [Sign up](https://www.mongodb.com/cloud/atlas/register)
- [ ] Google Gemini API key - [Get key](https://makersuite.google.com/app/apikey)
- [ ] (Optional) Emergent AI API key - [Get key](https://emergentmethods.ai/)

### 3. MongoDB Atlas Setup
- [ ] Created M0 Free cluster
- [ ] Created database user with read/write permissions
- [ ] Whitelisted all IPs (0.0.0.0/0)
- [ ] Copied connection string
- [ ] Replaced `<password>` in connection string

### 4. Backend Deployment (Railway)
- [ ] Signed up for Railway with GitHub
- [ ] Created new project from GitHub repo
- [ ] Set root directory to `/server`
- [ ] Added all environment variables:
  - [ ] NODE_ENV=production
  - [ ] PORT=3001
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET (strong 32+ character random string)
  - [ ] JWT_EXPIRES_IN=7d
  - [ ] GEMINI_API_KEY
  - [ ] EMERGENT_LLM_KEY (optional)
  - [ ] BCRYPT_ROUNDS=12
  - [ ] RATE_LIMIT_WINDOW_MS=900000
  - [ ] RATE_LIMIT_MAX_REQUESTS=100
  - [ ] FRONTEND_URL (add after Vercel deployment)
- [ ] Deployed successfully
- [ ] Copied backend URL (e.g., https://zenzone-backend.up.railway.app)

### 5. Frontend Deployment (Vercel)
- [ ] Signed up for Vercel with GitHub
- [ ] Imported zenzone repository
- [ ] Verified build settings:
  - [ ] Framework: Vite
  - [ ] Build Command: npm run build
  - [ ] Output Directory: dist
  - [ ] Install Command: npm install
- [ ] Added environment variable:
  - [ ] VITE_API_URL=<your-railway-backend-url>
- [ ] Deployed successfully
- [ ] Copied frontend URL (e.g., https://zenzone.vercel.app)

### 6. Post-Deployment Configuration
- [ ] Updated FRONTEND_URL in Railway with Vercel URL
- [ ] Redeployed backend after updating FRONTEND_URL
- [ ] Verified CORS is working

### 7. Testing
- [ ] Visited frontend URL
- [ ] Registered new test account
- [ ] Logged in successfully
- [ ] Tested mood tracker
- [ ] Created journal entry
- [ ] Tested AI chatbot (all 3 modes)
  - [ ] Share Thoughts mode
  - [ ] Find Calm mode
  - [ ] Just Chat mode
- [ ] Created a goal
- [ ] Created a habit
- [ ] Tested meditation timer
- [ ] Viewed wellness library
- [ ] Checked crisis resources
- [ ] Tested on mobile device

### 8. Monitoring Setup (Optional but Recommended)
- [ ] Set up UptimeRobot for uptime monitoring
- [ ] Configure Vercel Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Monitor MongoDB storage usage

### 9. Documentation
- [ ] Updated README with production URLs
- [ ] Documented any deployment-specific issues
- [ ] Shared with team/community

## 🎉 Deployment Complete!

Your ZenZone app is now live! Share the URL:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.railway.app

## 📊 Next Steps

1. **Share your app** on social media
2. **Monitor logs** for any errors
3. **Gather user feedback**
4. **Plan future features**
5. **Keep dependencies updated**

## 🆘 Troubleshooting

If you encounter issues, check:
1. DEPLOYMENT.md - Comprehensive troubleshooting guide
2. README.md - Setup and configuration details
3. GitHub Issues - Report new issues
4. Railway/Vercel logs - Check for runtime errors

## 💡 Pro Tips

- **Free Tier Limits**: Monitor your usage on all platforms
- **Database Backups**: Set up automated backups on MongoDB Atlas
- **Environment Variables**: Never commit .env files to Git
- **HTTPS**: Automatic on Vercel and Railway
- **Custom Domain**: Can be added in Vercel settings (free)

---

**Made with 💚 by the ZenZone team**

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
