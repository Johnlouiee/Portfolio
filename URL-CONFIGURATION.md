# URL Configuration Guide

## Current Deployment URLs

- **Frontend**: `https://LPurisima-portfolio.onrender.com`
- **Backend**: `https://LPurisima-server.onrender.com`

## Configuration Summary

### Frontend Configuration

**File**: `frontend/src/config/api.js`

The frontend is configured to connect to:
- **Production**: `https://LPurisima-server.onrender.com`
- **Development**: Uses proxy to `http://localhost:5000`

**Environment Variable** (optional override):
```env
REACT_APP_API_URL=https://LPurisima-server.onrender.com
```

### Backend CORS Configuration

**File**: `backend/server.js`

CORS is configured to allow requests from:
- ✅ `https://LPurisima-portfolio.onrender.com`
- ✅ `https://lpurisima-portfolio.onrender.com` (lowercase variant)
- ✅ `http://localhost:3000` (local development)
- ✅ `http://localhost:3001` (local development)
- ✅ Custom origin from `FRONTEND_URL` environment variable

**Environment Variable** (optional):
```env
FRONTEND_URL=https://LPurisima-portfolio.onrender.com
```

## Render Environment Variables

### Frontend Service

Set these in Render dashboard for the frontend service:

```env
REACT_APP_API_URL=https://LPurisima-server.onrender.com
NODE_ENV=production
```

### Backend Service

Set these in Render dashboard for the backend service:

```env
FRONTEND_URL=https://LPurisima-portfolio.onrender.com
FLOWISE_API_URL=https://your-flowise-instance.com
FLOWISE_CHATFLOW_ID=your_chatflow_id
FLOWISE_API_KEY=your_api_key
NODE_ENV=production
```

## Testing

### Test Backend CORS

You can test if CORS is working by checking the browser console:

1. Open `https://LPurisima-portfolio.onrender.com`
2. Open browser DevTools (F12)
3. Check Console tab for any CORS errors
4. Check Network tab - API requests should have `Access-Control-Allow-Origin` header

### Test API Connection

Visit these URLs to test:

- Backend Health: `https://LPurisima-server.onrender.com/api/health`
- Backend Portfolio: `https://LPurisima-server.onrender.com/api/portfolio`

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. **Check backend CORS configuration** in `backend/server.js`
2. **Verify frontend URL** matches one in the `allowedOrigins` array
3. **Check environment variable** `FRONTEND_URL` is set correctly
4. **Ensure backend is running** and accessible

### API Connection Errors

If frontend can't connect to backend:

1. **Verify backend URL** in `frontend/src/config/api.js`
2. **Check environment variable** `REACT_APP_API_URL` is set correctly
3. **Test backend directly** by visiting the health endpoint
4. **Check network tab** in browser DevTools for request details

### Common Issues

**Issue**: Frontend shows "Network Error" or "Failed to fetch"
- **Solution**: Check if backend URL is correct and backend is running

**Issue**: CORS error: "Access to fetch at ... has been blocked by CORS policy"
- **Solution**: Add your frontend URL to the `allowedOrigins` array in `backend/server.js`

**Issue**: API returns 404
- **Solution**: Verify the backend service is deployed and running on Render

