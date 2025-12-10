# Separate Frontend and Backend Deployment

This guide explains how to deploy the frontend and backend as separate services.

## Current Structure

```
Portfolio/
├── frontend/          # Frontend deployment configuration
│   ├── package.json   # Frontend dependencies
│   ├── Procfile       # Frontend deployment (Render)
│   └── build.sh       # Frontend build script
├── backend/           # Backend deployment configuration
│   ├── package.json   # Backend dependencies
│   ├── server.js      # Backend server (copy from server/)
│   ├── Procfile       # Backend deployment (Render)
│   └── build.sh       # Backend build script
├── src/               # React frontend source (needs to move to frontend/)
├── public/            # React public assets (needs to move to frontend/)
└── server/            # Express backend source (server.js copied to backend/)
```

## Setup Steps

### Option 1: Manual File Movement (Recommended)

1. **Move frontend files:**
   ```bash
   # Windows PowerShell
   Move-Item -Path src -Destination frontend\src
   Move-Item -Path public -Destination frontend\public
   
   # Linux/Mac
   mv src frontend/
   mv public frontend/
   ```

2. **Copy backend file:**
   ```bash
   # Windows PowerShell
   Copy-Item -Path server\server.js -Destination backend\server.js
   
   # Linux/Mac
   cp server/server.js backend/server.js
   ```

### Option 2: Use Setup Script

**Windows:**
```powershell
.\setup-separate-deployments.ps1
```

**Linux/Mac:**
```bash
chmod +x setup-separate-deployments.sh
./setup-separate-deployments.sh
```

## Render Deployment Configuration

### Frontend Service

1. **Service Type**: Web Service
2. **Root Directory**: `frontend`
3. **Build Command**: 
   ```bash
   npm install && npm run build
   ```
   Or:
   ```bash
   chmod +x build.sh && ./build.sh
   ```
4. **Start Command**: 
   ```bash
   npx serve -s build -l $PORT
   ```
5. **Environment Variables**:
   - `REACT_APP_API_URL=https://your-backend-service.onrender.com`
   - `NODE_ENV=production`

### Backend Service

1. **Service Type**: Web Service
2. **Root Directory**: `backend`
3. **Build Command**: 
   ```bash
   npm install
   ```
   Or:
   ```bash
   chmod +x build.sh && ./build.sh
   ```
4. **Start Command**: 
   ```bash
   npm start
   ```
   Or:
   ```bash
   node server.js
   ```
5. **Environment Variables**:
   - `PORT` (automatically set by Render)
   - `FLOWISE_API_URL=https://your-flowise-instance.com`
   - `FLOWISE_CHATFLOW_ID=your_chatflow_id`
   - `FLOWISE_API_KEY=your_api_key` (optional)
   - `NODE_ENV=production`

## Local Development

### Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### Run Services

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
REACT_APP_API_URL=http://localhost:5000 npm start
# Runs on http://localhost:3000
```

Or use the root package.json for development:
```bash
npm install
npm run dev
```

## Important Notes

1. **Frontend API URL**: Make sure to set `REACT_APP_API_URL` to your backend service URL in production
2. **CORS**: Backend has CORS enabled to allow frontend requests
3. **Build Output**: Frontend build creates a `build/` directory in the `frontend/` folder
4. **Environment Variables**: Each service has its own environment variables on Render

## Troubleshooting

### Frontend can't connect to backend
- Check `REACT_APP_API_URL` is set correctly
- Verify backend service is running
- Check CORS configuration in backend

### Build fails
- Make sure all dependencies are installed
- Check Node.js version (should be 14+)
- Verify all files are in correct directories

### 404 errors
- Frontend: Make sure `homepage: "."` is set in package.json
- Backend: Check API routes are correct

