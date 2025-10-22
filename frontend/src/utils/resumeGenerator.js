// Resume data
export const resumeData = {
  personalInfo: {
    name: "John Louie N. Purisima",
    title: "BSIT Student",
    email: "purisimalouiejohn@gmail.com",
    phone: "09083347352",
    location: "Cebu, Philippines",
    github: "https://github.com/Johnlouiee",
    linkedin: "https://linkedin.com/in/johnlouiee"
  },
  education: {
    institution: "University of Cebu",
    degree: "Bachelor of Science in Information Technology (BSIT)",
    year: "4th Year Student",
    duration: "2020 - 2024",
    description: "Currently pursuing degree in Information Technology with focus on software development, web technologies, and database management."
  },
  skills: {
    frontend: ["React", "JavaScript"],
    backend: ["Python", "PHP"],
    database: ["MySQL"],
    tools: ["Git"]
  },
  projects: [
    {
      title: "Portfolio Website",
      description: "Personal portfolio website built with React frontend and Python Flask backend",
      technologies: ["React", "JavaScript", "Python", "Flask", "CSS"],
      github: "https://github.com/Johnlouiee/portfolio"
    },
    {
      title: "User Management System",
      description: "User management system for students",
      technologies: ["JavaScript", "TypeScript", "MySQL", "HTML", "CSS"],
      github: "https://github.com/Johnlouiee/FINAL-INTPROG.git"
    },
    {
      title: "Sit-In Program",
      description: "Academic project for student attendance management",
      technologies: ["React", "JavaScript", "MySQL"],
      github: "https://github.com/Johnlouiee/Sit-In-Program"
    },
    {
      title: "Weather App",
      description: "Weather application with real-time data",
      technologies: ["JavaScript", "API Integration", "CSS"],
      github: "https://github.com/Johnlouiee/Weather-App"
    }
  ]
};

// Generate resume as HTML content
export const generateResumeHTML = () => {
  const { personalInfo, education, skills, projects } = resumeData;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${personalInfo.name} - Resume</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 20px;
                background: #f5f5f5;
                color: #333;
            }
            .resume-container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #667eea;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .name {
                font-size: 2.5em;
                color: #667eea;
                margin: 0;
                font-weight: bold;
            }
            .title {
                font-size: 1.2em;
                color: #666;
                margin: 10px 0;
            }
            .contact-info {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 20px;
                margin-top: 15px;
            }
            .contact-item {
                color: #555;
                font-size: 0.9em;
            }
            .section {
                margin-bottom: 30px;
            }
            .section-title {
                font-size: 1.4em;
                color: #667eea;
                border-bottom: 2px solid #667eea;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            .education-item {
                margin-bottom: 20px;
            }
            .institution {
                font-size: 1.1em;
                font-weight: bold;
                color: #333;
            }
            .degree {
                color: #666;
                margin: 5px 0;
            }
            .duration {
                color: #888;
                font-style: italic;
            }
            .skills-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
            }
            .skill-category {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #667eea;
            }
            .skill-category h4 {
                margin: 0 0 10px 0;
                color: #667eea;
            }
            .skill-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .skill-list li {
                padding: 5px 0;
                color: #555;
            }
            .project-item {
                margin-bottom: 25px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #667eea;
            }
            .project-title {
                font-size: 1.1em;
                font-weight: bold;
                color: #333;
                margin: 0 0 8px 0;
            }
            .project-description {
                color: #666;
                margin: 8px 0;
            }
            .project-tech {
                margin: 8px 0;
            }
            .tech-tag {
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 3px 8px;
                border-radius: 12px;
                font-size: 0.8em;
                margin: 2px 5px 2px 0;
            }
            .github-link {
                color: #667eea;
                text-decoration: none;
                font-size: 0.9em;
            }
            .github-link:hover {
                text-decoration: underline;
            }
            @media print {
                body { background: white; }
                .resume-container { box-shadow: none; }
            }
        </style>
    </head>
    <body>
        <div class="resume-container">
            <div class="header">
                <h1 class="name">${personalInfo.name}</h1>
                <p class="title">${personalInfo.title}</p>
                <div class="contact-info">
                    <span class="contact-item">📧 ${personalInfo.email}</span>
                    <span class="contact-item">📱 ${personalInfo.phone}</span>
                    <span class="contact-item">📍 ${personalInfo.location}</span>
                    <span class="contact-item">🔗 ${personalInfo.github}</span>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Education</h2>
                <div class="education-item">
                    <div class="institution">${education.institution}</div>
                    <div class="degree">${education.degree}</div>
                    <div class="duration">${education.duration} - ${education.year}</div>
                    <p>${education.description}</p>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Technical Skills</h2>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h4>Frontend</h4>
                        <ul class="skill-list">
                            ${skills.frontend.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>Backend</h4>
                        <ul class="skill-list">
                            ${skills.backend.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>Database</h4>
                        <ul class="skill-list">
                            ${skills.database.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>Tools</h4>
                        <ul class="skill-list">
                            ${skills.tools.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Projects</h2>
                ${projects.map(project => `
                    <div class="project-item">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <a href="${project.github}" class="github-link" target="_blank">View on GitHub →</a>
                    </div>
                `).join('')}
            </div>
        </div>
    </body>
    </html>
  `;
};

// Download resume as PDF
export const downloadResume = () => {
  const htmlContent = generateResumeHTML();
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'John_Louie_Purisima_Resume.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
