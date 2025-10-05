# Portfolio Website

A modern, responsive portfolio website built with React.js frontend and Python Flask backend. This project showcases a full-stack developer's skills, projects, and experience with a beautiful, interactive user interface.

## 🚀 Features

- **Modern Design**: Clean, responsive design with smooth animations
- **Interactive UI**: Built with React and Framer Motion for smooth animations
- **Backend API**: Python Flask backend with RESTful API endpoints
- **Contact Form**: Functional contact form with backend integration
- **Responsive**: Mobile-first design that works on all devices
- **Fast Loading**: Optimized for performance and SEO

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **React Router** - Client-side routing
- **Framer Motion** - Animation library for smooth transitions
- **React Icons** - Icon library
- **CSS3** - Custom styling with modern CSS features

### Backend
- **Python** - Programming language
- **Flask** - Lightweight web framework
- **Flask-CORS** - Cross-Origin Resource Sharing support
- **python-dotenv** - Environment variable management

## 📁 Project Structure

```
portfolio/
├── frontend/                 # React frontend
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.js    # Navigation component
│   │   │   ├── Hero.js      # Hero section
│   │   │   ├── About.js     # About section
│   │   │   ├── Projects.js  # Projects showcase
│   │   │   ├── Skills.js    # Skills section
│   │   │   ├── Experience.js # Work experience
│   │   │   ├── Contact.js   # Contact form
│   │   │   └── Footer.js    # Footer component
│   │   ├── App.js           # Main App component
│   │   ├── App.css          # Global styles
│   │   └── index.js         # Entry point
│   └── package.json         # Frontend dependencies
├── backend/                # Python backend
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── env.example         # Environment variables example
├── package.json            # Root package.json for scripts
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..

   # Install backend dependencies
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp backend/env.example backend/.env
   
   # Edit the .env file with your configuration
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   # Backend (Terminal 1)
   npm run server
   
   # Frontend (Terminal 2)
   npm run client
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📝 API Endpoints

### GET /api/portfolio
Returns portfolio data including about, projects, and experience information.

**Response:**
```json
{
  "about": {
    "name": "Your Name",
    "title": "Full Stack Developer",
    "description": "Passionate developer...",
    "skills": ["JavaScript", "React", "Python"]
  },
  "projects": [...],
  "experience": [...]
}
```

### POST /api/contact
Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to connect!"
}
```

### GET /api/health
Health check endpoint.

## 🎨 Customization

### Personal Information
1. Update the portfolio data in `backend/app.py`
2. Modify the contact information in the components
3. Replace placeholder images with your own photos
4. Update social media links

### Styling
- Modify CSS files in the `frontend/src/components/` directory
- Update color schemes in the CSS variables
- Customize animations in the Framer Motion components

### Content
- Add your projects to the projects array in `backend/app.py`
- Update your skills and experience information
- Modify the hero section text and animations

## 🚀 Deployment

### Frontend (React)
1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Backend (Python)
1. Deploy to a Python hosting service (Heroku, Railway, PythonAnywhere, etc.)
2. Set up environment variables on your hosting platform
3. Update the API URL in your frontend if needed

### Full Stack Deployment
- Deploy backend to a cloud service
- Deploy frontend to a static hosting service
- Update CORS settings for production
- Set up proper environment variables

## 📱 Features Overview

### Navigation
- Smooth scrolling navigation
- Mobile-responsive hamburger menu
- Active section highlighting

### Hero Section
- Animated typing effect
- Social media links
- Call-to-action buttons

### About Section
- Personal information display
- Skills showcase with progress bars
- Statistics counter

### Projects Section
- Filterable project gallery
- Project details with technologies
- Links to GitHub and live demos

### Skills Section
- Categorized skills display
- Interactive skill bars
- Technology icons

### Experience Section
- Timeline layout
- Work experience details
- Achievement statistics

### Contact Section
- Functional contact form
- Contact information display
- Social media links

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Framer Motion for smooth animations
- React Icons for the icon library
- Flask community for the lightweight framework

## 📞 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

---

⭐ Star this repository if you found it helpful!
