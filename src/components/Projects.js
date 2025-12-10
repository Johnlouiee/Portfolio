import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      console.log('Fetching projects from API...');
      const response = await fetch(API_ENDPOINTS.PORTFOLIO);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      console.log('Projects:', data.projects);
      
      setProjects(data.projects || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Set some default projects if API fails
      setProjects([
        {
          id: 1,
          title: "Portfolio Website",
          description: "Personal portfolio website built with React frontend and Node.js Express backend",
          technologies: ["React", "JavaScript", "Node.js", "Express", "CSS"],
          image: "/images/portfolio.jpg",
          github: "https://github.com/Johnlouiee/portfolio",
          demo: "https://johnlouiee.github.io/portfolio"
        },
        {
          id: 2,
          title: "User Management System",
          description: "User management system for the students",
          technologies: ["JavaScript", "TypeScript", "MySQL", "HTML", "CSS"],
          image: "/images/student-mgmt.jpg",
          github: "https://github.com/Johnlouiee/FINAL-INTPROG.git",
          demo: "https://my-final-louie02.web.app/"
        }
      ]);
      setLoading(false);
    }
  };

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'react', label: 'React' },
    { key: 'nodejs', label: 'Node.js' },
    { key: 'javascript', label: 'JavaScript' },
    { key: 'php', label: 'PHP' }
  ];

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.technologies.some(tech => 
      tech.toLowerCase().includes(filter.toLowerCase())
    );
  });

  if (loading) {
    return (
      <section id="projects" className="section projects">
        <div className="container">
          <div className="loading"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>

        <motion.div
          className="project-filters"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filters.map((filterItem) => (
            <button
              key={filterItem.key}
              className={`filter-btn ${filter === filterItem.key ? 'active' : ''}`}
              onClick={() => setFilter(filterItem.key)}
            >
              {filterItem.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="projects-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                <div className="image-placeholder">
                  <FaCode />
                </div>
                <div className="project-overlay">
                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      url={project.github}
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="no-projects"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p></p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
