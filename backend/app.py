from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')

# Sample portfolio data
PORTFOLIO_DATA = {
    "about": {
        "name": "John Louie N. Purisima",
        "title": "Full Stack Developer",
        "description": "Passionate developer with expertise in React, Python, and modern web technologies. I love creating innovative solutions and learning new technologies.",
        "image": "/images/profile.jpg",
        "skills": [
            "JavaScript", "React", "Python", "Flask", "PHP", 
            "HTML/CSS", "Git", "SQL", "MySQL", "TypeScript"
        ]
    },
    "projects": [
        {
            "id": 1,
            "title": "Portfolio Website",
            "description": "Personal portfolio website built with React frontend and Python Flask backend",
            "technologies": ["React", "JavaScript", "Python", "Flask", "CSS"],
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
        },

]
}

@app.route('/', methods=['GET'])
def root():
    """Root endpoint - API information page"""
    # Check if client wants JSON (API clients or ?format=json)
    if request.args.get('format') == 'json' or request.headers.get('Accept', '').find('application/json') != -1:
        return jsonify({
            'message': 'Portfolio API is running!',
            'version': '1.0.0',
            'endpoints': {
                'portfolio': '/api/portfolio',
                'contact': '/api/contact',
                'chatbot': '/api/chatbot',
                'health': '/api/health'
            },
            'status': 'healthy'
        })
    
    # Return HTML page for browsers
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio API - John Louie N. Purisima</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            .container {
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-width: 800px;
                width: 100%;
                padding: 40px;
                animation: fadeIn 0.5s ease-in;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            h1 {
                color: #667eea;
                margin-bottom: 10px;
                font-size: 2.5em;
            }
            .subtitle {
                color: #666;
                margin-bottom: 30px;
                font-size: 1.1em;
            }
            .status-badge {
                display: inline-block;
                background: #10b981;
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.9em;
                font-weight: 600;
                margin-bottom: 30px;
            }
            .info-section {
                margin-bottom: 30px;
            }
            .info-section h2 {
                color: #333;
                margin-bottom: 15px;
                font-size: 1.5em;
                border-bottom: 2px solid #667eea;
                padding-bottom: 10px;
            }
            .endpoint-list {
                list-style: none;
            }
            .endpoint-item {
                background: #f8f9fa;
                padding: 15px 20px;
                margin-bottom: 10px;
                border-radius: 10px;
                border-left: 4px solid #667eea;
                transition: all 0.3s ease;
            }
            .endpoint-item:hover {
                background: #e9ecef;
                transform: translateX(5px);
            }
            .endpoint-method {
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 4px 12px;
                border-radius: 5px;
                font-size: 0.85em;
                font-weight: 600;
                margin-right: 10px;
            }
            .endpoint-path {
                font-family: 'Courier New', monospace;
                color: #333;
                font-weight: 600;
            }
            .endpoint-desc {
                color: #666;
                margin-top: 5px;
                font-size: 0.9em;
            }
            .tech-stack {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 15px;
            }
            .tech-badge {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.85em;
                font-weight: 500;
            }
            .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                color: #666;
            }
            .footer a {
                color: #667eea;
                text-decoration: none;
                font-weight: 600;
            }
            .footer a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Portfolio API</h1>
            <p class="subtitle">Backend API for John Louie N. Purisima's Portfolio</p>
            <span class="status-badge">✓ Status: Healthy</span>
            
            <div class="info-section">
                <h2>📡 Available Endpoints</h2>
                <ul class="endpoint-list">
                    <li class="endpoint-item">
                        <span class="endpoint-method">GET</span>
                        <span class="endpoint-path">/api/portfolio</span>
                        <div class="endpoint-desc">Get portfolio data including projects, skills, and experience</div>
                    </li>
                    <li class="endpoint-item">
                        <span class="endpoint-method">POST</span>
                        <span class="endpoint-path">/api/chatbot</span>
                        <div class="endpoint-desc">Interactive chatbot endpoint for portfolio queries</div>
                    </li>
                    <li class="endpoint-item">
                        <span class="endpoint-method">POST</span>
                        <span class="endpoint-path">/api/contact</span>
                        <div class="endpoint-desc">Submit contact form messages</div>
                    </li>
                    <li class="endpoint-item">
                        <span class="endpoint-method">GET</span>
                        <span class="endpoint-path">/api/health</span>
                        <div class="endpoint-desc">Health check endpoint for monitoring</div>
                    </li>
                </ul>
            </div>
            
            <div class="info-section">
                <h2>🛠️ Tech Stack</h2>
                <div class="tech-stack">
                    <span class="tech-badge">Python</span>
                    <span class="tech-badge">Flask</span>
                    <span class="tech-badge">RESTful API</span>
                    <span class="tech-badge">Flask-CORS</span>
                    <span class="tech-badge">Gunicorn</span>
                </div>
            </div>
            
            <div class="footer">
                <p>API Version: <strong>1.0.0</strong></p>
                <p>For API documentation, use JSON format: <a href="/?format=json">View JSON Response</a></p>
                <p style="margin-top: 10px;">Developed by <a href="https://github.com/Johnlouiee" target="_blank">John Louie N. Purisima</a></p>
            </div>
        </div>
    </body>
    </html>
    """
    return html_content

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    """Get portfolio data"""
    return jsonify(PORTFOLIO_DATA)

@app.route('/api/contact', methods=['POST'])
def send_contact():
    """Handle contact form submission"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Here you would typically send an email
        # For now, we'll just log the message
        print(f"Contact form submission:")
        print(f"Name: {data['name']}")
        print(f"Email: {data['email']}")
        print(f"Message: {data['message']}")
        
        return jsonify({'message': 'Thank you for your message! I will get back to you soon.'})
    
    except Exception as e:
        return jsonify({'error': 'Failed to send message'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Portfolio API is running'})

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    """Enhanced chatbot endpoint with comprehensive knowledge"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').lower()
        
        # Personal information
        name = "John Louie N. Purisima"
        age = "22"
        location = "Cebu, Philippines"
        email = "purisimalouiejohn@gmail.com"
        phone = "09083347352"
        github = "https://github.com/Johnlouiee"
        
        # System/Portfolio technical information
        system_tech_stack = {
            "frontend": {
                "framework": "React",
                "language": "JavaScript",
                "styling": "CSS3",
                "animations": "Framer Motion",
                "icons": "React Icons",
                "routing": "React Router"
            },
            "backend": {
                "framework": "Flask (Python)",
                "language": "Python 3",
                "cors": "Flask-CORS",
                "environment": "python-dotenv"
            },
            "features": [
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
            "deployment": "Can be deployed on various platforms",
            "architecture": "RESTful API with React SPA"
        }
        
        # Developer technical background
        dev_technical_info = {
            "programming_languages": ["JavaScript", "Python", "PHP", "TypeScript", "HTML5", "CSS3"],
            "frontend_tech": ["React", "React Router", "Framer Motion", "React Icons", "Responsive Design"],
            "backend_tech": ["Flask", "Python", "RESTful APIs", "CORS handling"],
            "database": ["MySQL", "SQL", "Database Design"],
            "tools": ["Git", "GitHub", "Version Control", "npm", "pip"],
            "practices": ["Component-based Architecture", "API Integration", "Responsive Web Design", "Modern JavaScript (ES6+)"],
            "years_experience": "2+ years of coding practice",
            "focus_areas": ["Full-stack Development", "Web Applications", "User Interface Design", "Database Management"]
        }
        
        # Get portfolio data
        projects = PORTFOLIO_DATA.get('projects', [])
        skills = PORTFOLIO_DATA.get('about', {}).get('skills', [])
        experience = PORTFOLIO_DATA.get('experience', [])
        
        # Check for name-related questions
        name_keywords = ['name', 'what is your name', 'who are you', 'what\'s your name', 'who is john']
        if any(keyword in user_message for keyword in name_keywords):
            return jsonify({
                'response': f"My name is {name}. I'm a BSIT 4th year student at University of Cebu, passionate about full-stack development.",
                'timestamp': str(datetime.now())
            })
        
        # Check for age-related questions
        age_keywords = ['age', 'how old', 'what is your age', 'what\'s your age', 'how old are you']
        if any(keyword in user_message for keyword in age_keywords):
            return jsonify({
                'response': f"I'm {age} years old.",
                'timestamp': str(datetime.now())
            })
        
        # Check for location/place-related questions
        location_keywords = ['where', 'location', 'place', 'live', 'from', 'address', 'city', 'country', 'reside']
        if any(keyword in user_message for keyword in location_keywords):
            return jsonify({
                'response': f"I live in {location}.",
                'timestamp': str(datetime.now())
            })
        
        # Check for specific project questions
        project_keywords = {
            'portfolio': ['portfolio website', 'portfolio', 'this website', 'this site'],
            'user management': ['user management', 'student management', 'user management system'],
            'sit-in': ['sit-in', 'sit in program', 'sit-in program'],
            'egrowtify': ['egrowtify', 'weather', 'weather app']
        }
        
        for project_key, keywords in project_keywords.items():
            if any(keyword in user_message for keyword in keywords):
                project = next((p for p in projects if project_key.lower() in p.get('title', '').lower() or 
                               any(kw in p.get('title', '').lower() for kw in keywords)), None)
                if project:
                    tech_list = ', '.join(project.get('technologies', []))
                    response = f"{project.get('title')}: {project.get('description')} "
                    response += f"Built with {tech_list}. "
                    if project.get('github'):
                        response += f"GitHub: {project.get('github')} "
                    if project.get('demo'):
                        response += f"Demo: {project.get('demo')}"
                    return jsonify({
                        'response': response.strip(),
                        'timestamp': str(datetime.now())
                    })
        
        # Check for technology-related questions
        tech_keywords = {
            'react': ['react', 'reactjs', 'react.js'],
            'javascript': ['javascript', 'js', 'ecmascript'],
            'python': ['python', 'py'],
            'flask': ['flask', 'python flask'],
            'php': ['php'],
            'mysql': ['mysql', 'sql', 'database'],
            'typescript': ['typescript', 'ts'],
            'html': ['html'],
            'css': ['css', 'styling'],
            'git': ['git', 'github', 'version control']
        }
        
        for tech, keywords in tech_keywords.items():
            if any(keyword in user_message for keyword in keywords):
                # Check if this tech is used in any project
                used_in = [p.get('title') for p in projects if tech.lower() in 
                          [t.lower() for t in p.get('technologies', [])]]
                response = f"Yes! {tech.capitalize()} is one of the technologies used. "
                if tech.lower() in [s.lower() for s in skills]:
                    response += f"It's one of John Louie's skills. "
                if used_in:
                    response += f"It's used in: {', '.join(used_in)}."
                else:
                    response += f"John Louie has experience with {tech}."
                return jsonify({
                    'response': response,
                    'timestamp': str(datetime.now())
                })
        
        # Check for projects list
        if any(word in user_message for word in ['projects', 'project', 'what projects', 'list projects', 'show projects']):
            project_list = ', '.join([p.get('title') for p in projects])
            response = f"John Louie has {len(projects)} projects: {project_list}. "
            response += "Would you like to know more about any specific project?"
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for skills questions
        if any(word in user_message for word in ['skills', 'skill', 'technologies', 'tech stack', 'what can you do', 'what do you know']):
            skills_list = ', '.join(skills)
            response = f"John Louie's skills include: {skills_list}. "
            response += "He specializes in frontend development with React and JavaScript, backend with Python and PHP, and database management with MySQL."
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for education questions
        if any(word in user_message for word in ['education', 'school', 'university', 'degree', 'student', 'bsit', 'study']):
            if experience:
                edu = experience[0]
                response = f"John Louie is a {edu.get('year', '4th Year Student')} at {edu.get('institution', 'University of Cebu')}, "
                response += f"pursuing {edu.get('degree', 'BSIT')} ({edu.get('duration', '2020-2024')}). "
                response += edu.get('description', '')
                return jsonify({
                    'response': response,
                    'timestamp': str(datetime.now())
                })
        
        # Check for contact information
        if any(word in user_message for word in ['contact', 'email', 'phone', 'reach', 'get in touch', 'how to contact']):
            response = f"You can contact John Louie via email at {email} or phone at {phone}. "
            response += f"You can also check out his GitHub profile at {github}."
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for GitHub questions
        if any(word in user_message for word in ['github', 'git', 'repository', 'repo', 'code']):
            response = f"John Louie's GitHub profile is {github}. "
            response += "You can find all his projects and code repositories there!"
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for experience/background questions
        if any(word in user_message for word in ['experience', 'background', 'about', 'tell me about', 'who is']):
            response = f"{name} is a {age}-year-old BSIT 4th year student from {location}. "
            response += "He's passionate about full-stack development with expertise in React, JavaScript, Python, PHP, and MySQL. "
            response += "He has built several projects including a Portfolio Website, User Management System, Sit-In Program, and eGrowtify."
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for website/portfolio tech questions
        if any(word in user_message for word in ['this website', 'this site', 'portfolio website', 'built with', 'what technology', 'tech stack', 'system', 'architecture']):
            response = "This portfolio website is built with:\n\n"
            response += "**Frontend:**\n"
            response += f"• Framework: {system_tech_stack['frontend']['framework']}\n"
            response += f"• Language: {system_tech_stack['frontend']['language']}\n"
            response += f"• Styling: {system_tech_stack['frontend']['styling']}\n"
            response += f"• Animations: {system_tech_stack['frontend']['animations']}\n"
            response += f"• Routing: {system_tech_stack['frontend']['routing']}\n\n"
            response += "**Backend:**\n"
            response += f"• Framework: {system_tech_stack['backend']['framework']}\n"
            response += f"• Language: {system_tech_stack['backend']['language']}\n"
            response += f"• API: RESTful API architecture\n\n"
            response += f"**Features:** {', '.join(system_tech_stack['features'])}\n\n"
            response += f"**Architecture:** {system_tech_stack['architecture']}"
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for frontend technology questions
        if any(word in user_message for word in ['frontend', 'react', 'ui', 'user interface', 'client side', 'framer motion']):
            response = "**Frontend Technologies Used:**\n\n"
            response += f"• **Framework:** {system_tech_stack['frontend']['framework']} - Component-based UI library\n"
            response += f"• **Language:** {system_tech_stack['frontend']['language']} (ES6+)\n"
            response += f"• **Styling:** {system_tech_stack['frontend']['styling']} with custom animations\n"
            response += f"• **Animations:** {system_tech_stack['frontend']['animations']} for smooth transitions\n"
            response += f"• **Icons:** {system_tech_stack['frontend']['icons']} library\n"
            response += f"• **Routing:** {system_tech_stack['frontend']['routing']} for navigation\n"
            response += "\nThe frontend features responsive design, dark mode, particle effects, and interactive components."
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for backend technology questions
        if any(word in user_message for word in ['backend', 'server', 'api', 'flask', 'python backend', 'server side']):
            response = "**Backend Technologies Used:**\n\n"
            response += f"• **Framework:** {system_tech_stack['backend']['framework']}\n"
            response += f"• **Language:** {system_tech_stack['backend']['language']}\n"
            response += f"• **CORS:** {system_tech_stack['backend']['cors']} for cross-origin requests\n"
            response += f"• **Environment:** {system_tech_stack['backend']['environment']} for configuration\n"
            response += "\nThe backend provides RESTful API endpoints for portfolio data, chatbot responses, and contact form submissions."
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for developer's technical skills and expertise
        if any(word in user_message for word in ['technical skills', 'expertise', 'proficiency', 'what technologies', 'tech expertise', 'coding skills']):
            response = "**John Louie's Technical Expertise:**\n\n"
            response += f"**Programming Languages:** {', '.join(dev_technical_info['programming_languages'])}\n\n"
            response += f"**Frontend Technologies:** {', '.join(dev_technical_info['frontend_tech'])}\n\n"
            response += f"**Backend Technologies:** {', '.join(dev_technical_info['backend_tech'])}\n\n"
            response += f"**Database:** {', '.join(dev_technical_info['database'])}\n\n"
            response += f"**Development Tools:** {', '.join(dev_technical_info['tools'])}\n\n"
            response += f"**Best Practices:** {', '.join(dev_technical_info['practices'])}\n\n"
            response += f"**Experience:** {dev_technical_info['years_experience']}\n"
            response += f"**Focus Areas:** {', '.join(dev_technical_info['focus_areas'])}"
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for development practices and methodologies
        if any(word in user_message for word in ['development practices', 'coding practices', 'methodology', 'approach', 'how does he code', 'coding style']):
            response = "**Development Practices & Approach:**\n\n"
            response += f"• **Architecture:** {', '.join(dev_technical_info['practices'])}\n"
            response += "• **Component-based Development:** Building reusable React components\n"
            response += "• **RESTful API Design:** Clean API endpoints for data management\n"
            response += "• **Responsive Design:** Mobile-first approach for all projects\n"
            response += "• **Version Control:** Using Git and GitHub for project management\n"
            response += "• **Modern JavaScript:** ES6+ features and best practices\n"
            response += "• **Code Organization:** Modular and maintainable code structure"
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for specific technology deep-dives
        if any(word in user_message for word in ['framer motion', 'animations', 'particle', 'dark mode', 'responsive']):
            if 'framer motion' in user_message or 'animations' in user_message:
                response = "**Framer Motion** is used in this portfolio for smooth animations and transitions. "
                response += "It provides declarative animations for React components, including page transitions, "
                response += "hover effects, and scroll-triggered animations. The portfolio uses it for component "
                response += "entrances, interactive elements, and visual feedback."
            elif 'particle' in user_message:
                response = "The **Particle Background** feature uses JavaScript to create an interactive animated "
                response += "background with moving particles. This adds a modern, dynamic visual element to the "
                response += "portfolio, enhancing user engagement and visual appeal."
            elif 'dark mode' in user_message:
                response = "The **Dark Mode Toggle** allows users to switch between light and dark themes. "
                response += "This feature improves user experience by providing visual comfort and follows modern "
                response += "web design trends. The preference is typically stored in browser storage."
            elif 'responsive' in user_message:
                response = "The portfolio uses **Responsive Design** principles to ensure optimal viewing "
                response += "experience across all devices (desktop, tablet, mobile). This includes flexible "
                response += "layouts, media queries, and adaptive component sizing."
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for system features
        if any(word in user_message for word in ['features', 'what features', 'capabilities', 'what can this do', 'functionality']):
            response = "**Portfolio System Features:**\n\n"
            for i, feature in enumerate(system_tech_stack['features'], 1):
                response += f"{i}. {feature}\n"
            response += "\nThe system also includes API endpoints for dynamic content, chatbot integration, "
            response += "and contact form handling. All features are designed with user experience in mind."
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for developer's coding journey and experience
        if any(word in user_message for word in ['coding journey', 'learning', 'how long', 'experience level', 'development journey']):
            response = f"**John Louie's Coding Journey:**\n\n"
            response += f"• **Experience:** {dev_technical_info['years_experience']}\n"
            response += "• **Started:** Began coding practice 2 years ago out of curiosity\n"
            response += "• **Evolution:** From curiosity to deep passion for building digital solutions\n"
            response += "• **Current Status:** 4th year BSIT student at University of Cebu\n"
            response += "• **Focus:** Full-stack development with modern web technologies\n"
            response += "• **Approach:** Continuous learning and staying updated with tech trends\n"
            response += "• **Projects:** Built multiple projects including portfolio, management systems, and web applications"
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Check for API and system architecture questions
        if any(word in user_message for word in ['api', 'endpoints', 'architecture', 'system design', 'how it works']):
            response = "**System Architecture:**\n\n"
            response += f"**Type:** {system_tech_stack['architecture']}\n\n"
            response += "**API Endpoints:**\n"
            response += "• `/api/portfolio` - GET portfolio data (projects, skills, experience)\n"
            response += "• `/api/chatbot` - POST chatbot interactions\n"
            response += "• `/api/contact` - POST contact form submissions\n"
            response += "• `/api/health` - GET system health check\n\n"
            response += "**Communication:** Frontend (React) communicates with Backend (Flask) via RESTful API calls.\n"
            response += "**Data Flow:** JSON data exchange between client and server.\n"
            response += "**CORS:** Enabled for cross-origin resource sharing."
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Greetings
        if any(word in user_message for word in ['hello', 'hi', 'hey', 'greetings']):
            response = "Hello! I'm John Louie's portfolio assistant. "
            response += "I can help you learn about:\n"
            response += "• His projects, skills, and experience\n"
            response += "• Technical skills and expertise\n"
            response += "• This portfolio system's tech stack and architecture\n"
            response += "• Development practices and methodologies\n"
            response += "• Education and background\n"
            response += "• Contact information\n\n"
            response += "Ask me anything tech-related or about the developer!"
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Help
        if any(word in user_message for word in ['help', 'what can you do', 'what do you know', 'capabilities']):
            response = "**I can help you with information about:**\n\n"
            response += "**👤 Personal Info:**\n"
            response += "• Name, age, location, contact details\n\n"
            response += "**💼 Projects:**\n"
            response += "• Portfolio Website, User Management System, Sit-In Program, eGrowtify\n\n"
            response += "**🛠️ Technologies & Skills:**\n"
            response += "• Programming languages (JavaScript, Python, PHP, TypeScript)\n"
            response += "• Frontend tech (React, Framer Motion, CSS)\n"
            response += "• Backend tech (Flask, RESTful APIs)\n"
            response += "• Databases (MySQL, SQL)\n"
            response += "• Development tools (Git, GitHub)\n\n"
            response += "**💻 System & Architecture:**\n"
            response += "• Portfolio website tech stack\n"
            response += "• Frontend and backend technologies\n"
            response += "• System architecture and API endpoints\n"
            response += "• Features and capabilities\n"
            response += "• Development practices\n\n"
            response += "**🎓 Education:**\n"
            response += "• University, degree, academic journey\n\n"
            response += "**📧 Contact:**\n"
            response += "• Email, phone, GitHub profile\n\n"
            response += "Just ask me anything about these topics!"
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Default response
        default_response = "I'm not sure about that specific question. "
        default_response += "I can help you with information about:\n\n"
        default_response += "• **Developer Info:** Projects, skills, experience, education, contact\n"
        default_response += "• **Technical Skills:** Programming languages, frameworks, tools\n"
        default_response += "• **System Info:** Portfolio tech stack, architecture, features, API endpoints\n"
        default_response += "• **Development:** Practices, methodologies, coding journey\n\n"
        default_response += "Try asking about:\n"
        default_response += "• A specific project or technology\n"
        default_response += "• The portfolio system architecture\n"
        default_response += "• Frontend/backend technologies\n"
        default_response += "• Development practices\n"
        default_response += "• Or type 'help' to see all capabilities!"
        
        return jsonify({
            'response': default_response,
            'timestamp': str(datetime.now())
        })
        
    except Exception as e:
        return jsonify({'error': 'Sorry, I encountered an error. Please try again.'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
