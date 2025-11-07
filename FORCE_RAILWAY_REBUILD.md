# Force Railway Rebuild

Railway is caching your old deployment with SIGTERM handlers. Force a clean rebuild:

## Option 1: Trigger Clean Redeploy (Recommended)

1. Go to Railway Dashboard
2. Click on your service
3. Go to "Deployments" tab
4. Click the three dots ⋮ on the latest deployment
5. Select "Redeploy"
6. Or click "Settings" → "Deploy" → Click "Trigger Deploy"

## Option 2: Add a Dummy Change to Force Rebuild

Add a comment or version bump to force Railway to see changes.

## Option 3: Clear Build Cache

1. Railway Settings → General
2. Look for "Clear Build Cache" or similar option
3. Or delete and recreate the service

## What to Look For

After redeploying, your logs should show:
```
✓ Emergent LLM client initialized successfully
✓ Google Gemini client initialized successfully
Server running on 0.0.0.0:8080
Environment: production
Connected to MongoDB
[No SIGTERM, no stopping - server stays running!]
```

The error about `Connection.prototype.close()` confirms the old code is still running.
