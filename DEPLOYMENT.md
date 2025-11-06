# ZenZone Deployment Guide

This guide will help you deploy ZenZone to production using Vercel (frontend) and Railway/Render (backend).

## 🚀 Quick Deployment

### Prerequisites
- GitHub account
- Vercel account (free)
- Railway or Render account (free tier available)
- MongoDB Atlas account (free tier available)

---

## Part 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier (M0 Sandbox)

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "M0 Free" tier
   - Select your preferred region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and strong password
   - Set role to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/zenzone?retryWrites=true&w=majority`

---

## Part 2: Backend Deployment (Railway)

### Option A: Deploy to Railway (Recommended)

1. **Push Code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin master
   ```

2. **Sign up for Railway**
   - Go to [Railway.app](https://railway.app/)
   - Sign up with GitHub

3. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `zenzone` repository
   - Select the `server` directory as root

4. **Configure Environment Variables**
   Click "Variables" and add:
   ```
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-very-strong-random-secret-32-chars-minimum
   JWT_EXPIRES_IN=7d
   GEMINI_API_KEY=your-gemini-api-key
   EMERGENT_LLM_KEY=your-emergent-api-key
   BCRYPT_ROUNDS=12
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   FRONTEND_URL=https://your-app.vercel.app
   ```

5. **Configure Build Settings**
   - Root Directory: `/server`
   - Build Command: `npm install`
   - Start Command: `node server.js`

6. **Deploy**
   - Railway will auto-deploy
   - Copy your backend URL (e.g., `https://zenzone-backend.up.railway.app`)

### Option B: Deploy to Render

1. **Sign up for Render**
   - Go to [Render.com](https://render.com/)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `zenzone-backend`
     - Environment: `Node`
     - Build Command: `cd server && npm install`
     - Start Command: `cd server && node server.js`

3. **Add Environment Variables**
   Same as Railway (see above)

4. **Deploy**
   - Click "Create Web Service"
   - Copy your backend URL

---

## Part 3: Frontend Deployment (Vercel)

1. **Push Code to GitHub** (if not already done)

2. **Sign up for Vercel**
   - Go to [Vercel.com](https://vercel.com/)
   - Sign up with GitHub

3. **Import Project**
   - Click "Add New..." → "Project"
   - Import your `zenzone` repository
   - Framework Preset: Vite (auto-detected)

4. **Configure Build Settings**
   - Root Directory: `./` (leave as root)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Copy your frontend URL (e.g., `https://zenzone.vercel.app`)

7. **Update Backend FRONTEND_URL**
   - Go back to Railway/Render
   - Update `FRONTEND_URL` environment variable with your Vercel URL
   - Redeploy backend

---

## Part 4: Post-Deployment Configuration

### Update CORS in Backend

Make sure your backend CORS configuration allows your frontend URL. Check `server/server.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
```

### Test the Deployment

1. **Visit your Vercel URL**
2. **Register a new account**
3. **Test key features:**
   - Login/Logout
   - Mood tracking
   - Journal entry
   - AI Chatbot (all 3 modes)
   - Goals and Habits
   - Meditation
   - Crisis Resources

### Monitor Logs

**Backend Logs (Railway):**
- Go to your project → "Deployments" → Click latest
- View logs in real-time

**Frontend Logs (Vercel):**
- Go to your project → "Deployments" → Click latest
- View build logs and runtime logs

---

## 🔧 Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` in backend matches Vercel URL exactly
- Check CORS configuration in `server/server.js`
- Redeploy backend after changing environment variables

### API Connection Failed
- Verify `VITE_API_URL` in Vercel matches Railway backend URL
- Check backend is running (visit `https://your-backend-url.railway.app`)
- Verify MongoDB connection string is correct

### AI Chatbot Not Working
- Check `GEMINI_API_KEY` is set correctly
- Verify API key has quota remaining
- Check backend logs for AI API errors
- Test with `server/testAI.js` locally

### Database Connection Errors
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check database user credentials are correct
- Verify connection string format
- Test connection locally first

### Build Failures
- Check all dependencies are in `package.json`
- Verify Node.js version compatibility
- Clear build cache and redeploy
- Check build logs for specific errors

---

## 📊 Monitoring & Maintenance

### Set Up Monitoring
- **Uptime Monitoring**: [UptimeRobot](https://uptimerobot.com/) (free)
- **Error Tracking**: [Sentry](https://sentry.io/) (free tier)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) (built-in)

### Regular Maintenance
- [ ] Monitor database storage (MongoDB Atlas dashboard)
- [ ] Check API usage/quota (Gemini, Emergent AI)
- [ ] Review error logs weekly
- [ ] Update dependencies monthly
- [ ] Backup MongoDB data regularly
- [ ] Monitor performance metrics

### Scaling Considerations
- **Frontend**: Vercel scales automatically
- **Backend**: Upgrade Railway/Render plan as needed
- **Database**: Upgrade MongoDB Atlas tier when > 512MB
- **API Limits**: Monitor AI API usage and upgrade plans

---

## 🔐 Security Checklist

- [ ] Strong JWT_SECRET (minimum 32 characters)
- [ ] MongoDB Atlas network access configured
- [ ] Environment variables never committed to git
- [ ] HTTPS enabled (automatic on Vercel/Railway)
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] Regular dependency updates

---

## 💰 Cost Breakdown (Free Tier)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **Vercel** | ✅ Free | 100GB bandwidth/month |
| **Railway** | ✅ $5 credit/month | ~500 hours runtime |
| **Render** | ✅ Free | 750 hours/month, sleeps after inactivity |
| **MongoDB Atlas** | ✅ Free | 512MB storage, M0 cluster |
| **Google Gemini** | ✅ Free tier | 60 requests/minute |
| **Emergent AI** | 💳 Paid | Check their pricing |

**Total Monthly Cost (without Emergent AI): $0** 🎉

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## 🆘 Need Help?

- **GitHub Issues**: [Report deployment issues](https://github.com/Vijaygowda09/zenzone/issues)
- **Discussions**: [Ask questions](https://github.com/Vijaygowda09/zenzone/discussions)

---

**🎉 Congratulations! Your ZenZone app is now live!**

Share your deployment URL and help others on their mental wellness journey! 💚
