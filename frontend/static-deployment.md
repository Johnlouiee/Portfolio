# Frontend Static Site Deployment on Render

## Render Static Site Configuration

When creating a **Static Site** (not Web Service) on Render:

### Settings:

1. **Service Type**: Static Site
2. **Root Directory**: `frontend`
3. **Build Command**: 
   ```bash
   npm install && npm run build
   ```
4. **Publish Directory**: 
   ```
   build
   ```
   This is the directory where React creates the production build after running `npm run build`.

### Environment Variables:

Set these in Render dashboard:

```env
REACT_APP_API_URL=https://LPurisima-server.onrender.com
NODE_ENV=production
```

## Important Notes:

- **No Start Command**: Static sites don't need a start command or Procfile
- **Build Output**: The `build` folder contains all static files (HTML, CSS, JS)
- **SPA Routing**: React Router will work correctly with static hosting
- **Environment Variables**: Must be set during build time (before `npm run build`)

## Build Process:

1. Render runs: `npm install && npm run build`
2. React creates optimized production build in `frontend/build/` directory
3. Render serves all files from the `build` directory
4. All routes are handled by `index.html` (React Router)

