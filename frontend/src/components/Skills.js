import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaPython, FaJs, FaGitAlt, FaDatabase, FaCode } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      setPortfolioData(data.about);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setLoading(false);
    }
  };

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: FaReact, level: 90 },
        { name: 'JavaScript', icon: FaJs, level: 85 }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Python', icon: FaPython, level: 88 },
        { name: 'PHP', icon: FaCode, level: 85 },
        { name: 'Git', icon: FaGitAlt, level: 90 }
      ]
    },
    {
      title: 'Database',
      skills: [
        { name: 'MySQL', icon: FaDatabase, level: 80 }
      ]
    }
  ];

  if (loading) {
    return (
      <section id="skills" className="section skills">
        <div className="container">
          <div className="loading">Loading skills...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="skills-content">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-category"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="skill-icon">
                      <skill.icon />
                    </div>
                    <div className="skill-info">
                      <h4 className="skill-name">{skill.name}</h4>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-progress"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="skills-summary"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3>What I Do</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-icon">
                <FaReact />
              </div>
              <h4>Frontend Development</h4>
              <p>Building responsive user interfaces with React and JavaScript</p>
            </div>
            <div className="summary-item">
              <div className="summary-icon">
                <FaPython />
              </div>
              <h4>Backend Development</h4>
              <p>Creating robust server-side applications with Python</p>
            </div>
            <div className="summary-item">
              <div className="summary-icon">
                <FaDatabase />
              </div>
              <h4>Database Management</h4>
              <p>Designing and managing MySQL databases for optimal performance</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
