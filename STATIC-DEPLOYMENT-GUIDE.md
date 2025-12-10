# Static Site Deployment Guide

## Frontend as Static Site on Render

### Step-by-Step Setup

1. **Go to Render Dashboard**
   - Click "New +" → Select "Static Site"

2. **Connect Repository**
   - Connect your GitHub repository

3. **Configure Settings**

   **Basic Settings:**
   - **Name**: `LPurisima-portfolio` (or your preferred name)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `frontend`

   **Build Settings:**
   - **Build Command**: 
     ```bash
     npm install && npm run build
     ```
   - **Publish Directory**: 
     ```
     build
     ```
     ⚠️ **Important**: This is the directory where React outputs the production build. It's created inside the `frontend` folder after running `npm run build`.

4. **Environment Variables**
   
   Click "Advanced" → "Add Environment Variable":
   
   ```env
   REACT_APP_API_URL=https://LPurisima-server.onrender.com
   NODE_ENV=production
   ```
   
   **Note**: These must be set BEFORE the build runs, as React embeds them during the build process.

5. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your site

## Directory Structure

After build, your structure will be:
```
frontend/
├── src/              # Source code
├── public/           # Public assets
├── build/            # ← This is the publish directory
│   ├── index.html
│   ├── static/
│   │   ├── css/
│   │   └── js/
│   └── ...
├── package.json
└── build.sh
```

## Key Differences: Static Site vs Web Service

| Feature | Static Site | Web Service |
|---------|-------------|-------------|
| **Service Type** | Static Site | Web Service |
| **Start Command** | ❌ Not needed | ✅ Required |
| **Procfile** | ❌ Not needed | ✅ Optional |
| **Publish Directory** | ✅ Required (`build`) | ❌ Not used |
| **Build Command** | ✅ Required | ✅ Required |
| **Cost** | Free tier available | May have costs |
| **Server** | CDN (fast) | Node.js server |

## Troubleshooting

### Build Fails

**Error**: "Cannot find module"
- **Solution**: Make sure `Root Directory` is set to `frontend`

**Error**: "Build directory not found"
- **Solution**: Check that `Publish Directory` is exactly `build` (not `frontend/build`)

### Environment Variables Not Working

**Issue**: API calls fail or use wrong URL
- **Solution**: 
  1. Environment variables must be set in Render dashboard
  2. They must be set BEFORE building
  3. Variable names must start with `REACT_APP_` for React to read them
  4. Rebuild the site after adding/changing variables

### 404 Errors on Routes

**Issue**: Direct URL access to routes (e.g., `/about`) returns 404
- **Solution**: This is normal for SPAs. Render's static hosting should handle this automatically, but if not, you may need to configure redirects (Render usually handles this automatically for React apps).

### API Connection Issues

**Issue**: Frontend can't connect to backend
- **Solution**: 
  1. Verify `REACT_APP_API_URL` is set correctly
  2. Check backend CORS allows your frontend URL
  3. Verify backend is running and accessible

## Alternative: Deploy to Other Static Hosts

You can also deploy the `build` folder to:

- **Vercel**: Connect repo, set root to `frontend`, build command: `npm run build`, output directory: `build`
- **Netlify**: Connect repo, set base directory: `frontend`, build command: `npm run build`, publish directory: `build`
- **GitHub Pages**: Use `gh-pages` package or GitHub Actions
- **AWS S3 + CloudFront**: Upload `build` folder contents

All require the same `build` directory as the publish/output directory.

