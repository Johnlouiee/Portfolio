# Quick Start - Separate Deployments

## ⚡ Quick Setup

### Step 1: Move Files (Required)

**Windows PowerShell:**
```powershell
# Move frontend files
Move-Item -Path src -Destination frontend\src -Force
# public/ is already in frontend/

# Backend server.js is already in backend/
```

**Linux/Mac:**
```bash
# Move frontend files
mv src frontend/
# public/ is already in frontend/

# Backend server.js is already in backend/
```

Or run the setup script:
```powershell
.\setup-separate-deployments.ps1
```

### Step 2: Install Dependencies

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

### Step 3: Test Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
REACT_APP_API_URL=http://localhost:5000 npm start
```

## 🚀 Render Deployment

### Frontend Service

- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npx serve -s build -l $PORT`
- **Environment Variables**:
  - `REACT_APP_API_URL=https://your-backend-service.onrender.com`

### Backend Service

- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `FLOWISE_API_URL=https://your-flowise-instance.com`
  - `FLOWISE_CHATFLOW_ID=your_chatflow_id`
  - `FLOWISE_API_KEY=your_api_key` (optional)

## 📁 Final Structure

After moving files:
```
Portfolio/
├── frontend/
│   ├── src/           # React source code
│   ├── public/        # Public assets
│   ├── package.json   # Frontend dependencies
│   ├── Procfile       # Frontend deployment
│   └── build.sh       # Build script
├── backend/
│   ├── server.js      # Express server
│   ├── package.json   # Backend dependencies
│   ├── Procfile       # Backend deployment
│   └── build.sh       # Build script
└── (root files...)
```

