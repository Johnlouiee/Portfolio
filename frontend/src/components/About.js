import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaUsers, FaHeart } from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/api';
import './About.css';

const About = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PORTFOLIO);
      const data = await response.json();
      setPortfolioData(data.about);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setLoading(false);
    }
  };

  const stats = [
    { icon: FaCode, number: '2', label: 'Projects Completed' },
    { icon: FaRocket, number: '3+', label: 'Years Experience' },
  
  ];

  if (loading) {
    return (
      <section id="about" className="section about">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="about-text">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            
            <motion.div
              className="about-description"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p>
                {portfolioData?.description || "I'm a full-stack developer on a journey of growth and discovery. Although I only began practicing coding two years ago, what started as curiosity has evolved into a deep passion for building innovative digital solutions. Today, I'm driven by a strong desire to create clean, efficient, and user-focused applications using modern web technologies."}
              </p>
              <p>
              Outside of coding, I enjoy diving into new tools and frameworks, contributing to open-source projects, and engaging with the developer community. I'm committed to continuous learning and staying in sync with the ever-evolving tech landscape.
              </p>
            </motion.div>

            <motion.div
              className="about-stats"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-item"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="stat-icon">
                    <stat.icon />
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="image-wrapper">
              <div className="image-placeholder">
                <img 
                  src="/profile.jpg" 
                  alt="John Louie N. Purisima" 
                  className="profile-image"
                />
              </div>
              <div className="image-decoration"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
