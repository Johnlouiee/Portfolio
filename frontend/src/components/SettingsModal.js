import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPalette, FaBell, FaLanguage, FaKeyboard, FaEye, FaVolumeUp, FaSave } from 'react-icons/fa';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'en',
    fontSize: 'medium',
    animations: true,
    sound: false,
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      screenReader: false
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Load settings from localStorage
      const savedSettings = localStorage.getItem('portfolioSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSettingChange = (category, key, value) => {
    const newSettings = { ...settings };
    if (category === 'accessibility') {
      newSettings.accessibility = { ...newSettings.accessibility, [key]: value };
    } else {
      newSettings[key] = value;
    }
    setSettings(newSettings);
    setHasChanges(true);
  };

  const saveSettings = () => {
    localStorage.setItem('portfolioSettings', JSON.stringify(settings));
    
    // Apply theme
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply font size
    document.documentElement.style.fontSize = 
      settings.fontSize === 'small' ? '14px' : 
      settings.fontSize === 'large' ? '18px' : '16px';
    
    // Apply accessibility settings
    if (settings.accessibility.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    if (settings.accessibility.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    
    setHasChanges(false);
  };

  const resetSettings = () => {
    const defaultSettings = {
      theme: 'light',
      notifications: true,
      language: 'en',
      fontSize: 'medium',
      animations: true,
      sound: false,
      accessibility: {
        highContrast: false,
        reducedMotion: false,
        screenReader: false
      }
    };
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  const settingSections = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: FaPalette,
      settings: [
        {
          key: 'theme',
          label: 'Theme',
          type: 'select',
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' }
          ]
        },
        {
          key: 'fontSize',
          label: 'Font Size',
          type: 'select',
          options: [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]
        },
        {
          key: 'animations',
          label: 'Enable Animations',
          type: 'toggle'
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: FaBell,
      settings: [
        {
          key: 'notifications',
          label: 'Enable Notifications',
          type: 'toggle'
        },
        {
          key: 'sound',
          label: 'Sound Effects',
          type: 'toggle'
        }
      ]
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      icon: FaEye,
      settings: [
        {
          key: 'highContrast',
          label: 'High Contrast Mode',
          type: 'toggle',
          category: 'accessibility'
        },
        {
          key: 'reducedMotion',
          label: 'Reduce Motion',
          type: 'toggle',
          category: 'accessibility'
        },
        {
          key: 'screenReader',
          label: 'Screen Reader Support',
          type: 'toggle',
          category: 'accessibility'
        }
      ]
    },
    {
      id: 'language',
      title: 'Language & Region',
      icon: FaLanguage,
      settings: [
        {
          key: 'language',
          label: 'Language',
          type: 'select',
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' }
          ]
        }
      ]
    }
  ];

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
              <h2>Settings</h2>
              <button className="close-button" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="settings-content">
                {settingSections.map(section => (
                  <div key={section.id} className="settings-section">
                    <div className="section-header">
                      <section.icon className="section-icon" />
                      <h3>{section.title}</h3>
                    </div>
                    
                    <div className="section-settings">
                      {section.settings.map(setting => (
                        <div key={setting.key} className="setting-item">
                          <div className="setting-label">
                            <label htmlFor={setting.key}>{setting.label}</label>
                            {setting.type === 'toggle' && (
                              <span className="setting-description">
                                {setting.key === 'highContrast' && 'Increases contrast for better visibility'}
                                {setting.key === 'reducedMotion' && 'Reduces animations for better accessibility'}
                                {setting.key === 'screenReader' && 'Optimizes for screen readers'}
                                {setting.key === 'animations' && 'Enables smooth animations throughout the app'}
                                {setting.key === 'notifications' && 'Shows notifications for important updates'}
                                {setting.key === 'sound' && 'Plays sound effects for interactions'}
                              </span>
                            )}
                          </div>
                          
                          <div className="setting-control">
                            {setting.type === 'toggle' ? (
                              <label className="toggle-switch">
                                <input
                                  type="checkbox"
                                  id={setting.key}
                                  checked={setting.category ? 
                                    settings[setting.category][setting.key] : 
                                    settings[setting.key]
                                  }
                                  onChange={(e) => handleSettingChange(
                                    setting.category || 'main', 
                                    setting.key, 
                                    e.target.checked
                                  )}
                                />
                                <span className="toggle-slider"></span>
                              </label>
                            ) : setting.type === 'select' ? (
                              <select
                                id={setting.key}
                                value={settings[setting.key]}
                                onChange={(e) => handleSettingChange('main', setting.key, e.target.value)}
                                className="setting-select"
                              >
                                {setting.options.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="settings-actions">
                <button 
                  className="reset-button"
                  onClick={resetSettings}
                >
                  Reset to Default
                </button>
                <button 
                  className="save-button"
                  onClick={saveSettings}
                  disabled={!hasChanges}
                >
                  <FaSave />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
