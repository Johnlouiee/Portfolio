import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaCog, FaDownload, FaSignOutAlt, FaEdit, FaHeart } from 'react-icons/fa';
import { downloadResume } from '../utils/resumeGenerator';
import EditProfileModal from './EditProfileModal';
import FavoritesModal from './FavoritesModal';
import SettingsModal from './SettingsModal';
import './AvatarDropdown.css';

const AvatarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      icon: FaUser,
      label: 'View Profile',
      action: () => {
        // Scroll to about section
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    },
    {
      icon: FaDownload,
      label: 'Download Resume',
      action: () => {
        downloadResume();
        setIsOpen(false);
      }
    },
    {
      icon: FaEdit,
      label: 'Edit Profile',
      action: () => {
        setShowEditProfile(true);
        setIsOpen(false);
      }
    },
    {
      icon: FaHeart,
      label: 'Favorites',
      action: () => {
        setShowFavorites(true);
        setIsOpen(false);
      }
    },
    {
      icon: FaCog,
      label: 'Settings',
      action: () => {
        setShowSettings(true);
        setIsOpen(false);
      }
    }
  ];

  return (
    <div className="avatar-dropdown" ref={dropdownRef}>
      <motion.button
        className="avatar-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <div className="avatar-image">
          <img 
            src="/profile.jpg" 
            alt="John Louie N. Purisima" 
            className="avatar-img"
          />
        </div>
        <div className="avatar-status"></div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="dropdown-header">
              <div className="user-info">
                <div className="user-avatar">
                  <img 
                    src="/profile.jpg" 
                    alt="John Louie N. Purisima" 
                    className="user-avatar-img"
                  />
                </div>
                <div className="user-details">
                  <h4>John Louie N. Purisima</h4>
                  <p>BSIT Student</p>
                </div>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-items">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  className="dropdown-item"
                  onClick={item.action}
                  whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <div className="item-icon">
                    <item.icon />
                  </div>
                  <span className="item-label">{item.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-footer">
              <motion.button
                className="logout-button"
                whileHover={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}
                onClick={() => {
                  console.log('Logout clicked');
                  setIsOpen(false);
                }}
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <EditProfileModal 
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={(data) => {
          console.log('Profile saved:', data);
          // You can implement profile update logic here
        }}
      />
      
      <FavoritesModal 
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
      />
      
      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};

export default AvatarDropdown;
