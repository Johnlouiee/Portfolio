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
        "name": "Your Name",
        "title": "Full Stack Developer",
        "description": "Passionate developer with expertise in React, Python, and modern web technologies. I love creating innovative solutions and learning new technologies.",
        "image": "/images/profile.jpg",
        "skills": [
            "JavaScript", "React", "Python", "Flask", "PHP", 
            "HTML/CSS", "Git", "SQL", "MySQL"
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
    """Simple chatbot endpoint"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').lower()
        
        # Simple keyword-based responses
        responses = {
            'hello': "Hello! I'm John Louie's portfolio assistant. How can I help you today?",
            'hi': "Hi there! I'm here to help you learn about John Louie's projects and skills.",
            'name': "My name is John Louie N. Purisima, a BSIT 4th year student at University of Cebu.",
            'projects': "John Louie has several projects including a Portfolio Website, User Management System, Sit-In Program, and Weather App. You can find them in the Projects section!",
            'skills': "John Louie's main skills are React, JavaScript, Python, PHP, and MySQL. Check out the Skills section for more details!",
            'education': "John Louie is a 4th year BSIT student at University of Cebu, graduating in 2024.",
            'contact': "You can contact John Louie at purisimalouiejohn@gmail.com or call 09083347352.",
            'github': "Check out John Louie's GitHub profile at https://github.com/Johnlouiee",
            'portfolio': "This is John Louie's portfolio website built with React and Python Flask!",
            'help': "I can help you learn about John Louie's projects, skills, education, and contact information. Just ask me anything!",
            'default': "I'm not sure about that. You can ask me about John Louie's projects, skills, education, or contact information!"
        }
        
        # Find matching response
        response = responses.get('default')
        for keyword, reply in responses.items():
            if keyword in user_message:
                response = reply
                break
        
        return jsonify({
            'response': response,
            'timestamp': str(datetime.now())
        })
        
    except Exception as e:
        return jsonify({'error': 'Sorry, I encountered an error. Please try again.'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
