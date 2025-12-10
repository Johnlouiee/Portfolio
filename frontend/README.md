# Portfolio Frontend

React frontend for the Portfolio website.

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=https://LPurisima-server.onrender.com
```

If `REACT_APP_API_URL` is not set, it will use the default backend URL.

## Deployment

### Render Static Site Deployment

1. **Service Type**: Static Site (not Web Service)
2. **Root Directory**: `frontend`
3. **Build Command**: `npm install && npm run build`
4. **Publish Directory**: `build`
5. **Environment Variables**:
   - `REACT_APP_API_URL=https://LPurisima-server.onrender.com`
   - `NODE_ENV=production`

**Important**: 
- Static sites don't need a start command or Procfile
- The `build` directory is automatically served by Render
- Environment variables must be set before building

### Alternative: Using Static Site Hosting

You can also deploy the `build` folder to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Make sure to set `REACT_APP_API_URL` environment variable during build.

