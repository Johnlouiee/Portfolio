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
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

If `REACT_APP_API_URL` is not set, it will use the default backend URL.

## Deployment

### Render Deployment

1. **Root Directory**: `frontend` (or set to root if using monorepo)
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npx serve -s build -l $PORT`
4. **Environment Variables**:
   - `REACT_APP_API_URL=https://your-backend-url.onrender.com`

### Alternative: Using Static Site Hosting

You can also deploy the `build` folder to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Make sure to set `REACT_APP_API_URL` environment variable during build.

