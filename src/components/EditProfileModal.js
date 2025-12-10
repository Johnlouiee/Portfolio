import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaSave, FaImage } from 'react-icons/fa';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: 'John Louie N. Purisima',
    title: 'BSIT Student',
    email: 'purisimalouiejohn@gmail.com',
    phone: '09083347352',
    location: 'Cebu, Philippines',
    github: 'https://github.com/Johnlouiee',
    linkedin: 'https://linkedin.com/in/johnlouiee',
    bio: 'Passionate BSIT student with expertise in React, JavaScript, Node.js, and MySQL. Currently pursuing my degree at University of Cebu with focus on software development and web technologies.',
    profileImage: '/profile.jpg'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the onSave callback with updated data
      onSave(formData);
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
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
              <h2>Edit Profile</h2>
              <button className="close-button" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="profile-form">
              <div className="profile-image-section">
                <div className="image-preview">
                  <img 
                    src={formData.profileImage} 
                    alt="Profile Preview" 
                    className="preview-image"
                  />
                </div>
                <label className="image-upload-button">
                  <FaImage />
                  <span>Change Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="title">
                    <FaUser />
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., BSIT Student, Developer"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter your email"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <FaPhone />
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="location">
                    <FaMapMarkerAlt />
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter your location"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="github">
                    <FaGithub />
                    GitHub
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="linkedin">
                    <FaLinkedin />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="save-button" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
