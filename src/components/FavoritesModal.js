import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaHeart, FaCode, FaStar, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import './FavoritesModal.css';

const FavoritesModal = ({ isOpen, onClose }) => {
  const [favorites, setFavorites] = useState({
    projects: [],
    skills: [],
    notes: []
  });
  const [activeTab, setActiveTab] = useState('projects');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('portfolioFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('portfolioFavorites', JSON.stringify(newFavorites));
  };

  const addToFavorites = (type, item) => {
    const newFavorites = { ...favorites };
    if (!newFavorites[type].find(fav => fav.id === item.id)) {
      newFavorites[type].push({ ...item, addedAt: new Date().toISOString() });
      saveFavorites(newFavorites);
    }
  };

  const removeFromFavorites = (type, id) => {
    const newFavorites = { ...favorites };
    newFavorites[type] = newFavorites[type].filter(item => item.id !== id);
    saveFavorites(newFavorites);
  };

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        content: newNote.trim(),
        addedAt: new Date().toISOString()
      };
      const newFavorites = { ...favorites };
      newFavorites.notes.push(note);
      saveFavorites(newFavorites);
      setNewNote('');
    }
  };

  const sampleProjects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal portfolio website built with React frontend and Node.js Express backend",
      technologies: ["React", "JavaScript", "Node.js", "Express"],
      github: "https://github.com/Johnlouiee/portfolio"
    },
    {
      id: 2,
      title: "User Management System",
      description: "User management system for students",
      technologies: ["JavaScript", "TypeScript", "MySQL"],
      github: "https://github.com/Johnlouiee/FINAL-INTPROG.git"
    }
  ];

  const sampleSkills = [
    { id: 1, name: "React", category: "Frontend", level: 90 },
    { id: 2, name: "JavaScript", category: "Frontend", level: 85 },
    { id: 3, name: "Node.js", category: "Backend", level: 88 },
    { id: 4, name: "MySQL", category: "Database", level: 80 }
  ];

  const tabs = [
    { key: 'projects', label: 'Projects', icon: FaCode },
    { key: 'skills', label: 'Skills', icon: FaStar },
    { key: 'notes', label: 'Notes', icon: FaHeart }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>My Favorites</h2>
              <button className="close-button" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    className={`tab ${activeTab === tab.key ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <tab.icon />
                    <span>{tab.label}</span>
                    <span className="tab-count">{favorites[tab.key].length}</span>
                  </button>
                ))}
              </div>

              <div className="tab-content">
                {activeTab === 'projects' && (
                  <div className="projects-section">
                    <div className="section-header">
                      <h3>Favorite Projects</h3>
                      <p>Projects you've marked as favorites</p>
                    </div>
                    
                    {favorites.projects.length === 0 ? (
                      <div className="empty-state">
                        <FaCode className="empty-icon" />
                        <h4>No favorite projects yet</h4>
                        <p>Add some projects to your favorites to see them here</p>
                        <div className="sample-projects">
                          <h5>Sample Projects:</h5>
                          {sampleProjects.map(project => (
                            <div key={project.id} className="sample-item">
                              <h4>{project.title}</h4>
                              <p>{project.description}</p>
                              <button 
                                className="add-favorite-btn"
                                onClick={() => addToFavorites('projects', project)}
                              >
                                <FaHeart />
                                Add to Favorites
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="favorites-list">
                        {favorites.projects.map(project => (
                          <motion.div
                            key={project.id}
                            className="favorite-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            <div className="item-content">
                              <h4>{project.title}</h4>
                              <p>{project.description}</p>
                              <div className="item-meta">
                                <span className="added-date">
                                  Added {formatDate(project.addedAt)}
                                </span>
                                {project.github && (
                                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link">
                                    <FaExternalLinkAlt />
                                    GitHub
                                  </a>
                                )}
                              </div>
                            </div>
                            <button 
                              className="remove-btn"
                              onClick={() => removeFromFavorites('projects', project.id)}
                            >
                              <FaTrash />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="skills-section">
                    <div className="section-header">
                      <h3>Favorite Skills</h3>
                      <p>Skills you want to highlight</p>
                    </div>
                    
                    {favorites.skills.length === 0 ? (
                      <div className="empty-state">
                        <FaStar className="empty-icon" />
                        <h4>No favorite skills yet</h4>
                        <p>Add some skills to your favorites to see them here</p>
                        <div className="sample-skills">
                          <h5>Sample Skills:</h5>
                          {sampleSkills.map(skill => (
                            <div key={skill.id} className="sample-item">
                              <h4>{skill.name}</h4>
                              <p>{skill.category} - Level {skill.level}%</p>
                              <button 
                                className="add-favorite-btn"
                                onClick={() => addToFavorites('skills', skill)}
                              >
                                <FaStar />
                                Add to Favorites
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="favorites-list">
                        {favorites.skills.map(skill => (
                          <motion.div
                            key={skill.id}
                            className="favorite-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            <div className="item-content">
                              <h4>{skill.name}</h4>
                              <p>{skill.category} - Level {skill.level}%</p>
                              <span className="added-date">
                                Added {formatDate(skill.addedAt)}
                              </span>
                            </div>
                            <button 
                              className="remove-btn"
                              onClick={() => removeFromFavorites('skills', skill.id)}
                            >
                              <FaTrash />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="notes-section">
                    <div className="section-header">
                      <h3>Personal Notes</h3>
                      <p>Your personal notes and thoughts</p>
                    </div>
                    
                    <div className="add-note">
                      <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a personal note..."
                        rows="3"
                      />
                      <button 
                        className="add-note-btn"
                        onClick={addNote}
                        disabled={!newNote.trim()}
                      >
                        <FaHeart />
                        Add Note
                      </button>
                    </div>

                    <div className="notes-list">
                      {favorites.notes.length === 0 ? (
                        <div className="empty-state">
                          <FaHeart className="empty-icon" />
                          <h4>No notes yet</h4>
                          <p>Add your first personal note above</p>
                        </div>
                      ) : (
                        favorites.notes.map(note => (
                          <motion.div
                            key={note.id}
                            className="note-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            <div className="note-content">
                              <p>{note.content}</p>
                              <span className="note-date">
                                {formatDate(note.addedAt)}
                              </span>
                            </div>
                            <button 
                              className="remove-btn"
                              onClick={() => removeFromFavorites('notes', note.id)}
                            >
                              <FaTrash />
                            </button>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FavoritesModal;
