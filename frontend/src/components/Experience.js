import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaCode, FaBook } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const [education, setEducation] = useState([
    {
      institution: "University of Cebu",
      degree: "Bachelor of Science in Information Technology (BSIT)",
      year: "4th Year Student",
      duration: "2020 - 2024",
      description: "Currently pursuing my degree in Information Technology with focus on software development, web technologies, and database management."
    }
  ]);

  const [projects, setProjects] = useState([
    {
      title: "Academic Projects",
      description: "Various programming projects completed during coursework including web applications, database systems, and software development projects.",
      technologies: ["React", "JavaScript", "Python", "MySQL"]
    }
  ]);

  const loading = false;

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Education & Academic Journey
        </motion.h2>

        <div className="experience-timeline">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="timeline-icon">
                    <FaGraduationCap />
                  </div>
                  <div className="timeline-meta">
                    <h3 className="company">{edu.institution}</h3>
                    <h4 className="position">{edu.degree}</h4>
                    <div className="timeline-duration">
                      <FaCalendarAlt />
                      <span>{edu.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="timeline-description">
                  <p>{edu.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="academic-projects"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3>Academic Projects</h3>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="project-icon">
                  <FaCode />
                </div>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="experience-summary"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="summary-content">
            <h3>Academic Journey</h3>
            <p>
              As a 4th year BSIT student at University of Cebu, I'm passionate about 
              software development and continuously learning new technologies. I'm eager 
              to apply my academic knowledge to real-world projects and contribute to 
              innovative solutions in the tech industry.
            </p>
            <div className="achievements">
              <div className="achievement-item">
                <div className="achievement-number">4th</div>
                <div className="achievement-label">Year Student</div>
              </div>
              <div className="achievement-item">
                <div className="achievement-number">BSIT</div>
                <div className="achievement-label">Degree Program</div>
              </div>
              <div className="achievement-item">
                <div className="achievement-number">UC</div>
                <div className="achievement-label">University of Cebu</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
