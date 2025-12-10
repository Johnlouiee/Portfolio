# Render Static Site Setup - Quick Reference

## Frontend Deployment Configuration

### Service Type
**Static Site** (not Web Service)

### Settings

| Setting | Value |
|---------|-------|
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |

### Environment Variables

Add these in Render dashboard:

```env
REACT_APP_API_URL=https://LPurisima-server.onrender.com
NODE_ENV=production
```

## Important Notes

✅ **Publish Directory**: `build` (not `frontend/build` or `./build`)  
✅ **No Start Command**: Static sites don't need a start command  
✅ **No Procfile**: Not needed for static sites  
✅ **Environment Variables**: Must be set BEFORE building

## Build Process

1. Render runs: `npm install && npm run build`
2. React creates `frontend/build/` directory
3. Render serves files from `build` directory
4. Your site is live! 🎉

## Directory Structure After Build

```
frontend/
├── src/              # Source code (not deployed)
├── public/           # Public assets (not deployed)
├── build/            # ← This is what gets deployed
│   ├── index.html
│   ├── static/
│   │   ├── css/
│   │   └── js/
│   └── ...
└── package.json
```

The `build` folder is created inside `frontend/` after running `npm run build`.

