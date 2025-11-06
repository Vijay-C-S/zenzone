# 🔧 Fix MongoDB Connection Error in Railway

## Problem
Your backend is trying to connect to `localhost:27017` (local MongoDB) instead of MongoDB Atlas cloud database.

## Solution

### Step 1: Set up MongoDB Atlas (if not done)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create account
3. Create a new cluster (M0 Free tier)
4. Go to "Database Access" → Create database user
   - Username: `zenzone_user` (or your choice)
   - Password: Create a strong password (save it!)
   - Database User Privileges: Read and write to any database

5. Go to "Network Access" → Add IP Address
   - Click "Allow Access from Anywhere"
   - IP: `0.0.0.0/0`
   - Confirm

6. Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Driver: Node.js
   - Copy the connection string
   - It looks like: `mongodb+srv://zenzone_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

7. Replace `<password>` with your actual password
   - Example: `mongodb+srv://zenzone_user:MyP@ssw0rd123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority`

8. Add database name to the connection string:
   - Final: `mongodb+srv://zenzone_user:MyP@ssw0rd123@cluster0.abc123.mongodb.net/zenzone?retryWrites=true&w=majority`

### Step 2: Update Railway Environment Variables

1. Go to your Railway dashboard
2. Select your `zenzone` project
3. Click on your service
4. Go to "Variables" tab
5. Find `MONGODB_URI` and update it with your MongoDB Atlas connection string
6. Make sure these variables are set correctly:

```env
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zenzone?retryWrites=true&w=majority
JWT_SECRET=your-strong-secret-32-characters-minimum
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your-gemini-api-key
EMERGENT_LLM_KEY=your-emergent-api-key (optional)
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
FRONTEND_URL=https://your-app.vercel.app
```

### Step 3: Redeploy

1. After updating `MONGODB_URI`, Railway will automatically redeploy
2. Or click "Deploy" → "Redeploy"
3. Watch the logs - you should see: `Connected to MongoDB`

### Step 4: Verify Connection

Check the deployment logs. You should see:
```
✓ Emergent LLM client initialized successfully
✓ Google Gemini client initialized successfully (gemini-2.0-flash-exp)
Server running on port 8080
Environment: production
Connected to MongoDB
```

## 🎯 Quick Checklist

- [ ] MongoDB Atlas cluster created (M0 Free)
- [ ] Database user created with read/write permissions
- [ ] Network access set to `0.0.0.0/0` (allow all)
- [ ] Connection string copied and password replaced
- [ ] Database name `zenzone` added to connection string
- [ ] `MONGODB_URI` updated in Railway variables
- [ ] Service redeployed
- [ ] Logs show "Connected to MongoDB"

## 🐛 Still Having Issues?

### Error: Authentication failed
- Double-check your username and password in connection string
- Make sure password is URL-encoded if it contains special characters
- Verify database user has correct permissions

### Error: IP not whitelisted
- Go to Network Access in MongoDB Atlas
- Make sure `0.0.0.0/0` is added
- Wait 1-2 minutes for changes to take effect

### Error: Invalid connection string
- Make sure format is: `mongodb+srv://user:pass@cluster.mongodb.net/dbname?options`
- No spaces in the connection string
- Database name included before `?`

## 💡 Production Tips

1. **Security**: In production, you can whitelist specific Railway IPs instead of `0.0.0.0/0`
2. **Backups**: Enable automated backups in MongoDB Atlas (Settings → Backup)
3. **Monitoring**: Check MongoDB Atlas dashboard for connection stats
4. **Scaling**: Upgrade to M10+ cluster when you need more storage/performance

---

**Once MongoDB is connected, your backend will be fully operational!** ✅
