# Portfolio Backend

Express.js backend API for the Portfolio website.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs the server with nodemon (auto-restart on changes).

## Production

```bash
npm start
```

Runs the server in production mode.

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
PORT=5000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://LPurisima-portfolio.onrender.com

# Flowise Configuration
FLOWISE_API_URL=https://your-flowise-instance.com
FLOWISE_CHATFLOW_ID=your_chatflow_id_here
FLOWISE_API_KEY=your_api_key_here
```

## API Endpoints

- `GET /api/portfolio` - Get portfolio data
- `POST /api/chatbot` - Chatbot endpoint (Flowise integration)
- `POST /api/contact` - Contact form submission
- `GET /api/health` - Health check

## CORS

CORS is enabled to allow requests from the frontend. Make sure your frontend URL is allowed if you have specific CORS restrictions.

## Deployment

### Render Deployment

1. **Root Directory**: `backend` (or set to root if using monorepo)
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **Environment Variables**:
   - `PORT` (automatically set by Render)
   - `FLOWISE_API_URL`
   - `FLOWISE_CHATFLOW_ID`
   - `FLOWISE_API_KEY` (optional)

The backend will run on the port specified by Render's `PORT` environment variable.

