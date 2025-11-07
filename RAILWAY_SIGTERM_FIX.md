# 🚨 Railway SIGTERM Fix Guide

## Problem
Container starts successfully but Railway sends SIGTERM and stops it immediately.

## Root Cause
Railway's health check is likely failing or misconfigured, causing it to think the app hasn't started.

---

## ✅ Solution Steps

### Step 1: Verify Railway Service Settings

Go to Railway Dashboard → Your Service → Settings:

#### **1. Root Directory**
Set to: `server`

This tells Railway your app is in the `/server` folder.

#### **2. Start Command** 
Should be: `node server.js`

Or leave empty - Railway will use Procfile or package.json start script.

#### **3. Health Check (IMPORTANT)**
- **Option A - Disable Health Check (Recommended for now)**
  - Settings → Deploy → Health Check → **OFF**
  - This will let the app run without health check verification
  
- **Option B - Configure Health Check Properly**
  - Health Check Path: `/api/health`
  - Health Check Timeout: `300` seconds
  - Port: `$PORT` (Railway's dynamic port)

---

### Step 2: Environment Variables

Verify these are set in Railway Variables:

```env
✅ NODE_ENV=production
✅ PORT=${{Railway.STATICPORT}}  (Railway auto-assigns this)
✅ MONGODB_URI=mongodb+srv://...
✅ JWT_SECRET=your-secret
✅ GEMINI_API_KEY=your-key
✅ EMERGENT_LLM_KEY=your-key
✅ FRONTEND_URL=https://your-vercel-app.vercel.app
✅ BCRYPT_ROUNDS=12
✅ RATE_LIMIT_WINDOW_MS=900000
✅ RATE_LIMIT_MAX_REQUESTS=100
```

**Note:** Railway automatically injects a `PORT` variable - don't override it!

---

### Step 3: Check Deployment Settings

**In Railway Dashboard → Settings → Deploy:**

1. **Builder**: Nixpacks (default)
2. **Watch Paths**: Leave default or set to `server/**`
3. **Deploy on Push**: ✅ Enabled
4. **Auto Deploy**: ✅ Enabled

---

### Step 4: Manual Redeploy

After making the changes:
1. Click "Deploy" in Railway dashboard
2. Select "Deploy Latest" or "Trigger Deploy"
3. Watch the logs carefully

---

## 🔍 What to Look For in Logs

### ✅ **Success Logs Should Show:**
```
✓ Emergent LLM client initialized successfully
✓ Google Gemini client initialized successfully (gemini-2.0-flash-exp)
Server running on 0.0.0.0:8080
Environment: production
Connected to MongoDB
[No SIGTERM - app keeps running]
```

### ❌ **Failure Logs Show:**
```
Connected to MongoDB
Stopping Container  ← This should NOT appear
npm error signal SIGTERM  ← This is the problem
```

---

## 🎯 Quick Fix Checklist

- [ ] Root Directory set to `server` in Railway
- [ ] Health Check **DISABLED** (or properly configured)
- [ ] Start Command is `node server.js` (or empty)
- [ ] All environment variables are set
- [ ] PORT variable is NOT manually set (let Railway auto-assign)
- [ ] Redeployed after changes
- [ ] Logs show no SIGTERM

---

## 💡 Alternative: Use Railway's Database

If MongoDB Atlas connection is causing issues, Railway offers PostgreSQL.
But since you're already connected to MongoDB, this shouldn't be necessary.

---

## 🐛 Still Not Working?

### Try This Debugging Approach:

1. **Simplify Health Check**
   - Temporarily disable health check completely
   - If app stays running → health check was the issue

2. **Check Railway Status Page**
   - Visit https://railway.statuspage.io/
   - Ensure Railway platform is operational

3. **Try Different Port Binding**
   Your server is already binding to `0.0.0.0:$PORT` which is correct.

4. **Check Railway Logs Tab**
   - Click "View Logs" in Railway dashboard
   - Look for any hidden errors before SIGTERM

5. **Railway Discord Support**
   - Join Railway Discord: https://discord.gg/railway
   - Share your logs in #help channel
   - Railway team is very responsive

---

## ✨ Expected Final State

Once fixed, your Railway deployment should:
- ✅ Show "Running" status (green)
- ✅ Have a public URL accessible
- ✅ Respond to health check at `/api/health`
- ✅ Stay running indefinitely
- ✅ Auto-restart only on crashes (not healthy runs)

---

## 📞 Next Steps After Fix

1. Copy your Railway backend URL
2. Use it in Vercel frontend: `VITE_API_URL=https://your-railway-url.up.railway.app`
3. Update `FRONTEND_URL` in Railway to your Vercel URL
4. Test the full-stack app!

---

**Key Insight:** Railway's default health check might be too aggressive. Disabling it temporarily is often the quickest solution while you debug. You can re-enable it once the app is stable.
