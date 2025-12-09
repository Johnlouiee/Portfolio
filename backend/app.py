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
        if any(word in user_message for word in ['this website', 'this site', 'portfolio website', 'built with', 'what technology', 'tech stack']):
            response = "This portfolio website is built with React for the frontend and Python Flask for the backend. "
            response += "It uses modern web technologies including JavaScript, CSS, and responsive design principles."
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Greetings
        if any(word in user_message for word in ['hello', 'hi', 'hey', 'greetings']):
            response = "Hello! I'm John Louie's portfolio assistant. "
            response += "I can help you learn about his projects, skills, technologies, education, and contact information. What would you like to know?"
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Help
        if any(word in user_message for word in ['help', 'what can you do', 'what do you know', 'capabilities']):
            response = "I can help you with information about:\n"
            response += "• Personal info (name, age, location)\n"
            response += "• Projects (Portfolio Website, User Management System, Sit-In Program, eGrowtify)\n"
            response += "• Technologies (React, JavaScript, Python, Flask, PHP, MySQL, etc.)\n"
            response += "• Skills and expertise\n"
            response += "• Education and background\n"
            response += "• Contact information\n"
            response += "Just ask me anything about these topics!"
            return jsonify({
                'response': response,
                'timestamp': str(datetime.now())
            })
        
        # Default response
        default_response = "I'm not sure about that specific question. "
        default_response += "I can help you with information about John Louie's projects, skills, technologies, education, contact info, or personal details. "
        default_response += "Try asking about a specific project, technology, or ask for help to see what I can answer!"
        
        return jsonify({
            'response': default_response,
            'timestamp': str(datetime.now())
        })
        
    except Exception as e:
        return jsonify({'error': 'Sorry, I encountered an error. Please try again.'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
