# Portfolio Website - Full Stack Developer

A modern, responsive portfolio website built with React frontend and Python Flask backend, featuring an interactive chatbot, project showcase, and contact form.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Chatbot**: AI-powered assistant that answers questions about the developer, projects, and tech stack
- **Dark Mode**: Toggle between light and dark themes
- **Particle Background**: Animated particle effects for visual appeal
- **Project Showcase**: Display projects with filtering capabilities
- **Contact Form**: Submit messages directly from the website
- **Skills & Experience**: Showcase technical skills and educational background

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router
- Framer Motion (animations)
- React Icons
- CSS3

### Backend
- Python 3
- Flask
- Flask-CORS
- Gunicorn (production server)

## 📁 Project Structure

```
Portfolio/
├── frontend/          # React frontend application
│   ├── public/        # Static files
│   ├── src/           # Source code
│   │   ├── components/  # React components
│   │   ├── config/      # API configuration
│   │   └── utils/       # Utility functions
│   └── package.json
├── backend/           # Flask backend API
│   ├── app.py         # Main Flask application
│   ├── requirements.txt
│   └── Procfile       # Deployment configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8 or higher
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file (optional):
```bash
cp env.example .env
```

5. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

## 🌐 API Endpoints

- `GET /api/portfolio` - Get portfolio data (projects, skills, experience)
- `POST /api/chatbot` - Interactive chatbot endpoint
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check endpoint

## 📦 Building for Production

### Frontend

```bash
cd frontend
npm run build
```

The production build will be in the `frontend/build/` directory.

### Backend

The backend is ready for production deployment. Make sure to:
- Set environment variables (SECRET_KEY, etc.)
- Use Gunicorn for production: `gunicorn app:app`

## 🚢 Deployment

### Single Deployment (Backend Serves Frontend) - Recommended

This setup deploys both frontend and backend together, similar to `ij-portfolio.onrender.com`.

**Render Configuration:**
1. Connect your GitHub repository
2. **Root Directory**: Leave empty (root of repo)
3. **Build Command**: 
   ```bash
   cd frontend && npm install && REACT_APP_SERVED_BY_BACKEND=true npm run build && cd .. && cd backend && pip install -r requirements.txt
   ```
4. **Start Command**: 
   ```bash
   cd backend && gunicorn app:app
   ```
5. **Environment Variables**:
   - `RENDER=true` (optional)
   - `SECRET_KEY=your-secret-key-here` (recommended)

The backend will automatically serve the frontend build files in production.

### Separate Deployment (Alternative)

If you prefer separate deployments:

**Backend (Render):**
1. Root directory: `backend`
2. Build command: `pip install -r requirements.txt`
3. Start command: `gunicorn app:app`

**Frontend (Vercel/Netlify):**
1. Root directory: `frontend`
2. Build command: `npm run build`
3. Publish directory: `build`
4. Set `REACT_APP_API_URL` environment variable to your backend URL

## 🔧 Configuration

### API Configuration

The frontend automatically detects the environment:
- **Development**: Uses proxy to `localhost:5000`
- **Production**: Connects to deployed backend URL

To override, set `REACT_APP_API_URL` environment variable.

### Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**John Louie N. Purisima**
- GitHub: [@Johnlouiee](https://github.com/Johnlouiee)
- Email: purisimalouiejohn@gmail.com

## 🙏 Acknowledgments

- React community for excellent documentation
- Flask team for the lightweight framework
- All open-source contributors
