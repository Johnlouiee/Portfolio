# Separate Frontend and Backend Deployment Guide

This project is structured for separate frontend and backend deployments.

## Project Structure

```
Portfolio/
├── frontend/          # Frontend deployment config
│   ├── package.json   # Frontend dependencies
│   ├── Procfile       # Frontend deployment config
│   └── build.sh       # Frontend build script
├── backend/           # Backend deployment config
│   ├── package.json   # Backend dependencies
│   ├── server.js      # Backend server (copied from server/)
│   ├── Procfile       # Backend deployment config
│   └── build.sh       # Backend build script
├── src/               # React frontend source code
├── public/            # React public assets
└── server/            # Express backend source code
```

## Local Development

### Option 1: Using Root package.json (Current Setup)

```bash
# Install all dependencies
npm install

# Run both frontend and backend
npm run dev
```

### Option 2: Separate Services

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

## Render Deployment

### Frontend Service (Static Site)

1. **Create a new Static Site** on Render (not Web Service)
2. **Repository**: Your GitHub repo
3. **Root Directory**: `frontend`
4. **Build Command**: 
   ```bash
   npm install && npm run build
   ```
   Or use the build script:
   ```bash
   chmod +x frontend/build.sh && ./frontend/build.sh
   ```
5. **Publish Directory**: 
   ```
   build
   ```
   ⚠️ **Important**: This is the directory where React outputs the production build. It's created inside the `frontend` folder.
6. **Environment Variables**:
   - `REACT_APP_API_URL=https://LPurisima-server.onrender.com`
   - `NODE_ENV=production`
   
**Note**: Static sites don't need a start command or Procfile. Render automatically serves files from the publish directory.

### Backend Service

1. **Create a new Web Service** on Render
2. **Repository**: Your GitHub repo
3. **Root Directory**: Leave empty (root of repo) OR set to `backend` if you move files
4. **Build Command**: 
   ```bash
   cd backend && npm install
   ```
   Or use the build script:
   ```bash
   chmod +x backend/build.sh && ./backend/build.sh
   ```
5. **Start Command**: 
   ```bash
   cd backend && npm start
   ```
   Or:
   ```bash
   node backend/server.js
   ```
6. **Environment Variables**:
   - `PORT` (automatically set by Render)
   - `FLOWISE_API_URL=https://your-flowise-instance.com`
   - `FLOWISE_CHATFLOW_ID=your_chatflow_id`
   - `FLOWISE_API_KEY=your_api_key` (optional)
   - `NODE_ENV=production`

## Alternative: Move Files to Separate Directories

If you want cleaner separation, you can move files:

```bash
# Move frontend files
mv src frontend/
mv public frontend/

# Move backend files
mv server/* backend/
```

Then update:
- Frontend service root directory: `frontend`
- Backend service root directory: `backend`

## Environment Variables

### Frontend (.env or Render Environment Variables)

```env
REACT_APP_API_URL=https://your-backend-service.onrender.com
```

### Backend (.env or Render Environment Variables)

```env
PORT=5000
NODE_ENV=production
FLOWISE_API_URL=https://your-flowise-instance.com
FLOWISE_CHATFLOW_ID=your_chatflow_id_here
FLOWISE_API_KEY=your_api_key_here
```

## CORS Configuration

The backend has CORS enabled to allow requests from the frontend. Make sure your frontend URL is allowed if you have specific CORS restrictions.

## Testing Separate Deployments Locally

1. Start backend:
   ```bash
   cd backend
   npm install
   npm start
   # Backend runs on http://localhost:5000
   ```

2. Start frontend (in another terminal):
   ```bash
   cd frontend
   npm install
   REACT_APP_API_URL=http://localhost:5000 npm start
   # Frontend runs on http://localhost:3000
   ```

The frontend will connect to the backend using the `REACT_APP_API_URL` environment variable.

