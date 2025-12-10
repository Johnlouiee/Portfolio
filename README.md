# Portfolio Website - Full Stack JavaScript

A modern, responsive portfolio website built entirely with JavaScript - React and Node.js Express, featuring an interactive chatbot, project showcase, and contact form.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Chatbot**: AI-powered assistant that answers questions about the developer, projects, and tech stack
- **Dark Mode**: Toggle between light and dark themes
- **Particle Background**: Animated particle effects for visual appeal
- **Project Showcase**: Display projects with filtering capabilities
- **Contact Form**: Submit messages directly from the website
- **Skills & Experience**: Showcase technical skills and educational background

## 🛠️ Tech Stack

### Technologies
- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
Portfolio/
├── src/              # React frontend source code
│   ├── components/   # React components
│   ├── config/       # API configuration
│   └── utils/        # Utility functions
├── server/           # Express backend API
│   └── server.js     # Main Express application
├── public/           # Static files
├── build/            # Production build (generated)
├── package.json      # Dependencies and scripts
└── Procfile          # Deployment configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install all dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```bash
cp .env.example .env
```

### Development

Run both React app and server together:
```bash
npm run dev
```

Or run separately:
```bash
# Server only (Terminal 1)
npm run server

# React app only (Terminal 2)
npm run client
```

- React App: `http://localhost:3000`
- Server API: `http://localhost:5000`

## 🌐 API Endpoints

- `GET /api/portfolio` - Get portfolio data (projects, skills, experience)
- `POST /api/chatbot` - Interactive chatbot endpoint
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check endpoint

## 📦 Building for Production

```bash
npm run build
```

The production build will be in the `build/` directory. The server will automatically serve it in production.

## 🚢 Deployment

### Render Deployment

**Configuration:**
1. Connect your GitHub repository
2. **Root Directory**: Leave empty (root of repo)
3. **Build Command**: 
   ```bash
   chmod +x render-build.sh && ./render-build.sh
   ```
   Or inline:
   ```bash
   npm install && export REACT_APP_SERVED_BY_BACKEND=true && npm run build
   ```
4. **Start Command**: 
   ```bash
   node server/server.js
   ```
5. **Environment Variables**:
   - `RENDER=true` (optional)
   - `SECRET_KEY=your-secret-key-here` (optional)
   - `PORT` (automatically set by Render)

The server will automatically serve the React build files in production.

## 🔧 Configuration

### API Configuration

The frontend automatically detects the environment:
- **Development**: Uses proxy to `localhost:5000` (configured in `package.json`)
- **Production**: Uses relative paths when served from same domain

To override, set `REACT_APP_API_URL` environment variable.

### Environment Variables

Create a `.env` file in the root directory:

```env
SECRET_KEY=your-secret-key-here
PORT=5000
NODE_ENV=development
```

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**John Louie N. Purisima**
- GitHub: [@Johnlouiee](https://github.com/Johnlouiee)
- Email: purisimalouiejohn@gmail.com

## 🙏 Acknowledgments

- React community for excellent documentation
- Express.js team for the lightweight framework
- All open-source contributors
