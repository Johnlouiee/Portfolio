const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Determine if we're in production (serving frontend) or development
const FRONTEND_BUILD_PATH = path.join(__dirname, '../build/index.html');
const IS_PRODUCTION = fs.existsSync(FRONTEND_BUILD_PATH) || process.env.RENDER === 'true';

// Serve frontend build files in production
if (IS_PRODUCTION) {
  app.use(express.static(path.join(__dirname, '../build')));
}

// Portfolio data
const PORTFOLIO_DATA = {
  "about": {
    "name": "John Louie N. Purisima",
    "title": "Full Stack Developer",
    "description": "Passionate developer with expertise in React, JavaScript, Node.js, and modern web technologies. I love creating innovative solutions and learning new technologies.",
    "image": "/images/profile.jpg",
    "skills": [
      "JavaScript", "React", "Node.js", "Express", "PHP",
      "HTML/CSS", "Git", "SQL", "MySQL", "TypeScript"
    ]
  },
  "projects": [
    {
      "id": 1,
      "title": "Portfolio Website",
      "description": "Personal portfolio website built with React frontend and Node.js Express backend",
      "technologies": ["React", "JavaScript", "Node.js", "Express", "CSS"],
      "image": "/images/portfolio.jpg",
      "github": "https://github.com/Johnlouiee/portfolio",
      "demo": "https://johnlouiee.github.io/portfolio"
    },
    {
      "id": 2,
      "title": "User Management System",
      "description": "user management system for the students",
      "technologies": ["javascript", "typescript", "MySQL", "HTML", "CSS"],
      "image": "/images/student-mgmt.jpg",
      "github": "https://github.com/Johnlouiee/FINAL-INTPROG.git",
      "demo": "https://my-final-louie02.web.app/"
    },
    {
      "id": 3,
      "title": "Sit-In Program",
      "description": "Sit-In Program for the students of University of Cebu",
      "technologies": ["PHP", "MySQL"],
      "image": "/images/ecommerce.jpg",
      "github": "https://github.com/Johnlouiee/SYSARCH",
      "demo": "https://github.com/Johnlouiee/SYSARCH"
    },
    {
      "id": 4,
      "title": "eGrowtify",
      "description": "Real-time weather application with location-based forecasts and weather alerts",
      "technologies": ["JavaScript", "HTML", "CSS", "API Integration"],
      "image": "/images/weather-app.jpg",
      "github": "https://github.com/Johnlouiee/weather-app",
      "demo": "https://weather-app-demo.vercel.app"
    }
  ],
  "experience": [
    {
      "institution": "University of Cebu",
      "degree": "Bachelor of Science in Information Technology (BSIT)",
      "year": "4th Year Student",
      "duration": "2020 - 2024",
      "description": "Currently pursuing my degree in Information Technology with focus on software development, web technologies, and database management."
    }
  ]
};

// Serve frontend in production only
if (IS_PRODUCTION) {
  // Serve React app for all non-API routes
  app.get('*', (req, res, next) => {
    // Don't serve frontend for API routes
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
} else {
  // In development, just show API info
  app.get('/', (req, res) => {
    if (req.query.format === 'json' || req.headers.accept?.includes('application/json')) {
      return res.json({
        message: 'Portfolio API is running!',
        version: '1.0.0',
        endpoints: {
          portfolio: '/api/portfolio',
          contact: '/api/contact',
          chatbot: '/api/chatbot',
          health: '/api/health'
        },
        status: 'healthy',
        mode: 'development'
      });
    }
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Portfolio API - Development</title></head>
      <body>
        <h1>Portfolio API - Development Mode</h1>
        <p>API is running. Frontend should be running separately on localhost:3000</p>
        <p><a href="/?format=json">View JSON API Info</a></p>
      </body>
      </html>
    `);
  });
}

// API Routes
app.get('/api/portfolio', (req, res) => {
  res.json(PORTFOLIO_DATA);
});

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Here you would typically send an email
    // For now, we'll just log the message
    console.log('Contact form submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    
    res.json({ message: 'Thank you for your message! I will get back to you soon.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Portfolio API is running' });
});

// Chatbot endpoint
app.post('/api/chatbot', (req, res) => {
  try {
    const userMessage = (req.body.message || '').toLowerCase();
    
    // Personal information
    const name = "John Louie N. Purisima";
    const age = "22";
    const location = "Cebu, Philippines";
    const email = "purisimalouiejohn@gmail.com";
    const phone = "09083347352";
    const github = "https://github.com/Johnlouiee";
    
    // System/Portfolio technical information
    const systemTechStack = {
      frontend: {
        framework: "React",
        language: "JavaScript",
        styling: "CSS3",
        animations: "Framer Motion",
        icons: "React Icons",
        routing: "React Router"
      },
      backend: {
        framework: "Express.js",
        language: "Node.js",
        runtime: "Node.js",
        environment: "dotenv"
      },
      features: [
        "Responsive Design",
        "Dark Mode Toggle",
        "Particle Background Animation",
        "Interactive Chatbot",
        "Contact Form",
        "Resume Generator",
        "Profile Management",
        "Settings Modal",
        "Favorites System"
      ],
      deployment: "Can be deployed on various platforms",
      architecture: "RESTful API with React SPA"
    };
    
    // Developer technical background
    const devTechnicalInfo = {
      programmingLanguages: ["JavaScript", "Node.js", "PHP", "TypeScript", "HTML5", "CSS3"],
      frontendTech: ["React", "React Router", "Framer Motion", "React Icons", "Responsive Design"],
      backendTech: ["Express.js", "Node.js", "RESTful APIs", "CORS handling"],
      database: ["MySQL", "SQL", "Database Design"],
      tools: ["Git", "GitHub", "Version Control", "npm"],
      practices: ["Component-based Architecture", "API Integration", "Responsive Web Design", "Modern JavaScript (ES6+)"],
      yearsExperience: "2+ years of coding practice",
      focusAreas: ["Full-stack Development", "Web Applications", "User Interface Design", "Database Management"]
    };
    
    // Get portfolio data
    const projects = PORTFOLIO_DATA.projects || [];
    const skills = PORTFOLIO_DATA.about?.skills || [];
    const experience = PORTFOLIO_DATA.experience || [];
    
    // Helper function to check if any keyword matches
    const hasKeyword = (message, keywords) => {
      return keywords.some(keyword => message.includes(keyword));
    };
    
    // Check for name-related questions
    if (hasKeyword(userMessage, ['name', 'what is your name', 'who are you', "what's your name", 'who is john'])) {
      return res.json({
        response: `My name is ${name}. I'm a BSIT 4th year student at University of Cebu, passionate about full-stack development.`,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for age-related questions
    if (hasKeyword(userMessage, ['age', 'how old', 'what is your age', "what's your age", 'how old are you'])) {
      return res.json({
        response: `I'm ${age} years old.`,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for location/place-related questions
    if (hasKeyword(userMessage, ['where', 'location', 'place', 'live', 'from', 'address', 'city', 'country', 'reside'])) {
      return res.json({
        response: `I live in ${location}.`,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for specific project questions
    const projectKeywords = {
      'portfolio': ['portfolio website', 'portfolio', 'this website', 'this site'],
      'user management': ['user management', 'student management', 'user management system'],
      'sit-in': ['sit-in', 'sit in program', 'sit-in program'],
      'egrowtify': ['egrowtify', 'weather', 'weather app']
    };
    
    for (const [projectKey, keywords] of Object.entries(projectKeywords)) {
      if (hasKeyword(userMessage, keywords)) {
        const project = projects.find(p => 
          p.title.toLowerCase().includes(projectKey.toLowerCase()) ||
          keywords.some(kw => p.title.toLowerCase().includes(kw))
        );
        if (project) {
          const techList = project.technologies.join(', ');
          let response = `${project.title}: ${project.description} Built with ${techList}. `;
          if (project.github) response += `GitHub: ${project.github} `;
          if (project.demo) response += `Demo: ${project.demo}`;
          return res.json({
            response: response.trim(),
            timestamp: new Date().toISOString()
          });
        }
      }
    }
    
    // Check for technology-related questions
    const techKeywords = {
      'react': ['react', 'reactjs', 'react.js'],
      'javascript': ['javascript', 'js', 'ecmascript'],
      'node.js': ['node.js', 'nodejs', 'node'],
      'express': ['express', 'express.js'],
      'php': ['php'],
      'mysql': ['mysql', 'sql', 'database'],
      'typescript': ['typescript', 'ts'],
      'html': ['html'],
      'css': ['css', 'styling'],
      'git': ['git', 'github', 'version control']
    };
    
    for (const [tech, keywords] of Object.entries(techKeywords)) {
      if (hasKeyword(userMessage, keywords)) {
        const usedIn = projects.filter(p => 
          p.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
        ).map(p => p.title);
        
        let response = `Yes! ${tech.charAt(0).toUpperCase() + tech.slice(1)} is one of the technologies used. `;
        if (skills.some(s => s.toLowerCase().includes(tech.toLowerCase()))) {
          response += "It's one of John Louie's skills. ";
        }
        if (usedIn.length > 0) {
          response += `It's used in: ${usedIn.join(', ')}.`;
        } else {
          response += `John Louie has experience with ${tech}.`;
        }
        return res.json({
          response,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Check for projects list
    if (hasKeyword(userMessage, ['projects', 'project', 'what projects', 'list projects', 'show projects'])) {
      const projectList = projects.map(p => p.title).join(', ');
      return res.json({
        response: `John Louie has ${projects.length} projects: ${projectList}. Would you like to know more about any specific project?`,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for skills questions
    if (hasKeyword(userMessage, ['skills', 'skill', 'technologies', 'tech stack', 'what can you do', 'what do you know'])) {
      const skillsList = skills.join(', ');
      return res.json({
        response: `John Louie's skills include: ${skillsList}. He specializes in frontend development with React and JavaScript, backend with Node.js and Express, and database management with MySQL.`,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for education questions
    if (hasKeyword(userMessage, ['education', 'school', 'university', 'degree', 'student', 'bsit', 'study'])) {
      if (experience.length > 0) {
        const edu = experience[0];
        const response = `John Louie is a ${edu.year || '4th Year Student'} at ${edu.institution || 'University of Cebu'}, pursuing ${edu.degree || 'BSIT'} (${edu.duration || '2020-2024'}). ${edu.description || ''}`;
        return res.json({
          response,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Check for contact information
    if (hasKeyword(userMessage, ['contact', 'email', 'phone', 'reach', 'get in touch', 'how to contact'])) {
      return res.json({
        response: `You can contact John Louie via email at ${email} or phone at ${phone}. You can also check out his GitHub profile at ${github}.`,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for GitHub questions
    if (hasKeyword(userMessage, ['github', 'git', 'repository', 'repo', 'code'])) {
      return res.json({
        response: `John Louie's GitHub profile is ${github}. You can find all his projects and code repositories there!`,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for experience/background questions
    if (hasKeyword(userMessage, ['experience', 'background', 'about', 'tell me about', 'who is'])) {
      return res.json({
        response: `${name} is a ${age}-year-old BSIT 4th year student from ${location}. He's passionate about full-stack development with expertise in React, JavaScript, Node.js, Express, and MySQL. He has built several projects including a Portfolio Website, User Management System, Sit-In Program, and eGrowtify.`,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for website/portfolio tech questions
    if (hasKeyword(userMessage, ['this website', 'this site', 'portfolio website', 'built with', 'what technology', 'tech stack', 'system', 'architecture'])) {
      const response = `This portfolio website is built with:

**Frontend:**
• Framework: ${systemTechStack.frontend.framework}
• Language: ${systemTechStack.frontend.language}
• Styling: ${systemTechStack.frontend.styling}
• Animations: ${systemTechStack.frontend.animations}
• Routing: ${systemTechStack.frontend.routing}

**Backend:**
• Framework: ${systemTechStack.backend.framework}
• Language: ${systemTechStack.backend.language}
• API: RESTful API architecture

**Features:** ${systemTechStack.features.join(', ')}

**Architecture:** ${systemTechStack.architecture}`;
      return res.json({
        response,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for frontend technology questions
    if (hasKeyword(userMessage, ['frontend', 'react', 'ui', 'user interface', 'client side', 'framer motion'])) {
      const response = `**Frontend Technologies Used:**

• **Framework:** ${systemTechStack.frontend.framework} - Component-based UI library
• **Language:** ${systemTechStack.frontend.language} (ES6+)
• **Styling:** ${systemTechStack.frontend.styling} with custom animations
• **Animations:** ${systemTechStack.frontend.animations} for smooth transitions
• **Icons:** ${systemTechStack.frontend.icons} library
• **Routing:** ${systemTechStack.frontend.routing} for navigation

The frontend features responsive design, dark mode, particle effects, and interactive components.`;
      return res.json({
        response,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for backend technology questions
    if (hasKeyword(userMessage, ['backend', 'server', 'api', 'express', 'node.js backend', 'server side'])) {
      const response = `**Backend Technologies Used:**

• **Framework:** ${systemTechStack.backend.framework}
• **Language:** ${systemTechStack.backend.language}
• **Runtime:** ${systemTechStack.backend.runtime}
• **Environment:** ${systemTechStack.backend.environment} for configuration

The backend provides RESTful API endpoints for portfolio data, chatbot responses, and contact form submissions.`;
      return res.json({
        response,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for developer's technical skills and expertise
    if (hasKeyword(userMessage, ['technical skills', 'expertise', 'proficiency', 'what technologies', 'tech expertise', 'coding skills'])) {
      const response = `**John Louie's Technical Expertise:**

**Programming Languages:** ${devTechnicalInfo.programmingLanguages.join(', ')}

**Frontend Technologies:** ${devTechnicalInfo.frontendTech.join(', ')}

**Backend Technologies:** ${devTechnicalInfo.backendTech.join(', ')}

**Database:** ${devTechnicalInfo.database.join(', ')}

**Development Tools:** ${devTechnicalInfo.tools.join(', ')}

**Best Practices:** ${devTechnicalInfo.practices.join(', ')}

**Experience:** ${devTechnicalInfo.yearsExperience}
**Focus Areas:** ${devTechnicalInfo.focusAreas.join(', ')}`;
      return res.json({
        response,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for development practices and methodologies
    if (hasKeyword(userMessage, ['development practices', 'coding practices', 'methodology', 'approach', 'how does he code', 'coding style'])) {
      const response = `**Development Practices & Approach:**

• **Architecture:** ${devTechnicalInfo.practices.join(', ')}
• **Component-based Development:** Building reusable React components
• **RESTful API Design:** Clean API endpoints for data management
• **Responsive Design:** Mobile-first approach for all projects
• **Version Control:** Using Git and GitHub for project management
• **Modern JavaScript:** ES6+ features and best practices
• **Code Organization:** Modular and maintainable code structure`;
      return res.json({
        response,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for specific technology deep-dives
    if (hasKeyword(userMessage, ['framer motion', 'animations', 'particle', 'dark mode', 'responsive'])) {
      let response = '';
      if (userMessage.includes('framer motion') || userMessage.includes('animations')) {
        response = "**Framer Motion** is used in this portfolio for smooth animations and transitions. It provides declarative animations for React components, including page transitions, hover effects, and scroll-triggered animations. The portfolio uses it for component entrances, interactive elements, and visual feedback.";
      } else if (userMessage.includes('particle')) {
        response = "The **Particle Background** feature uses JavaScript to create an interactive animated background with moving particles. This adds a modern, dynamic visual element to the portfolio, enhancing user engagement and visual appeal.";
      } else if (userMessage.includes('dark mode')) {
        response = "The **Dark Mode Toggle** allows users to switch between light and dark themes. This feature improves user experience by providing visual comfort and follows modern web design trends. The preference is typically stored in browser storage.";
      } else if (userMessage.includes('responsive')) {
        response = "The portfolio uses **Responsive Design** principles to ensure optimal viewing experience across all devices (desktop, tablet, mobile). This includes flexible layouts, media queries, and adaptive component sizing.";
      }
      return res.json({
        response,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for system features
    if (hasKeyword(userMessage, ['features', 'what features', 'capabilities', 'what can this do', 'functionality'])) {
      let response = "**Portfolio System Features:**\n\n";
      systemTechStack.features.forEach((feature, i) => {
        response += `${i + 1}. ${feature}\n`;
      });
      response += "\nThe system also includes API endpoints for dynamic content, chatbot integration, and contact form handling. All features are designed with user experience in mind.";
      return res.json({
        response,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for developer's coding journey and experience
    if (hasKeyword(userMessage, ['coding journey', 'learning', 'how long', 'experience level', 'development journey'])) {
      const response = `**John Louie's Coding Journey:**

• **Experience:** ${devTechnicalInfo.yearsExperience}
• **Started:** Began coding practice 2 years ago out of curiosity
• **Evolution:** From curiosity to deep passion for building digital solutions
• **Current Status:** 4th year BSIT student at University of Cebu
• **Focus:** Full-stack development with modern web technologies
• **Approach:** Continuous learning and staying updated with tech trends
• **Projects:** Built multiple projects including portfolio, management systems, and web applications`;
      return res.json({
        response,
        timestamp: new Date().toISOString()
      });
    }
    
    // Check for API and system architecture questions
    if (hasKeyword(userMessage, ['api', 'endpoints', 'architecture', 'system design', 'how it works'])) {
      const response = `**System Architecture:**

**Type:** ${systemTechStack.architecture}

**API Endpoints:**
• \`/api/portfolio\` - GET portfolio data (projects, skills, experience)
• \`/api/chatbot\` - POST chatbot interactions
• \`/api/contact\` - POST contact form submissions
• \`/api/health\` - GET system health check

**Communication:** Frontend (React) communicates with Backend (Express) via RESTful API calls.
**Data Flow:** JSON data exchange between client and server.
**CORS:** Enabled for cross-origin resource sharing.`;
      return res.json({
        response,
        timestamp: new Date().toISOString()
      });
    }
    
    // Greetings
    if (hasKeyword(userMessage, ['hello', 'hi', 'hey', 'greetings'])) {
      return res.json({
        response: "Hello! I'm John Louie's portfolio assistant. I can help you learn about:\n• His projects, skills, and experience\n• Technical skills and expertise\n• This portfolio system's tech stack and architecture\n• Development practices and methodologies\n• Education and background\n• Contact information\n\nAsk me anything tech-related or about the developer!",
        timestamp: new Date().toISOString()
      });
    }
    
    // Help
    if (hasKeyword(userMessage, ['help', 'what can you do', 'what do you know', 'capabilities'])) {
      const response = `**I can help you with information about:**

**👤 Personal Info:**
• Name, age, location, contact details

**💼 Projects:**
• Portfolio Website, User Management System, Sit-In Program, eGrowtify

**🛠️ Technologies & Skills:**
• Programming languages (JavaScript, Node.js, PHP, TypeScript)
• Frontend tech (React, Framer Motion, CSS)
• Backend tech (Express.js, RESTful APIs)
• Databases (MySQL, SQL)
• Development tools (Git, GitHub)

**💻 System & Architecture:**
• Portfolio website tech stack
• Frontend and backend technologies
• System architecture and API endpoints
• Features and capabilities
• Development practices

**🎓 Education:**
• University, degree, academic journey

**📧 Contact:**
• Email, phone, GitHub profile

Just ask me anything about these topics!`;
      return res.json({
        response,
        timestamp: new Date().toISOString()
      });
    }
    
    // Default response
    const defaultResponse = `I'm not sure about that specific question. I can help you with information about:

• **Developer Info:** Projects, skills, experience, education, contact
• **Technical Skills:** Programming languages, frameworks, tools
• **System Info:** Portfolio tech stack, architecture, features, API endpoints
• **Development:** Practices, methodologies, coding journey

Try asking about:
• A specific project or technology
• The portfolio system architecture
• Frontend/backend technologies
• Development practices
• Or type 'help' to see all capabilities!`;
    
    res.json({
      response: defaultResponse,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Sorry, I encountered an error. Please try again.' });
  }
});

// Error handler for 404
if (!IS_PRODUCTION) {
  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Mode: ${IS_PRODUCTION ? 'Production' : 'Development'}`);
});

