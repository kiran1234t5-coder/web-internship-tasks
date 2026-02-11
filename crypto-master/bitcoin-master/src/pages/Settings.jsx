import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { User, Mail, Bell, Moon, Sun, Save, Key } from 'lucide-react';

const Settings = () => {
  const { user, login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    preferences: {
      currency: 'USD',
      language: 'en'
    }
  });
  const [saveMessage, setSaveMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const handlePreferenceChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Update user data
    login({
      ...user,
      name: formData.name,
      email: formData.email
    });

    // Save preferences to localStorage
    localStorage.setItem('userPreferences', JSON.stringify({
      notifications: formData.notifications,
      preferences: formData.preferences
    }));

    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="settings-sections">
        {/* Profile Settings */}
        <motion.div
          className="settings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="section-header">
            <User size={24} />
            <h2>Profile Settings</h2>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={20} />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <button className="btn btn-secondary">
              <Key size={20} />
              Change Password
            </button>
          </div>
        </motion.div>

        {/* Theme Settings */}
        <motion.div
          className="settings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="section-header">
            {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
            <h2>Appearance</h2>
          </div>
          <div className="theme-toggle-section">
            <div className="theme-info">
              <h3>Theme</h3>
              <p>Switch between light and dark mode</p>
            </div>
            <button 
              className={`theme-toggle-btn ${theme}`}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <>
                  <Moon size={20} />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun size={20} />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          className="settings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-header">
            <Bell size={24} />
            <h2>Notifications</h2>
          </div>
          <div className="notification-settings">
            <div className="notification-item">
              <div className="notification-info">
                <h3>Email Notifications</h3>
                <p>Receive updates via email</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={formData.notifications.email}
                  onChange={(e) => handleNotificationChange('email', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="notification-item">
              <div className="notification-info">
                <h3>Push Notifications</h3>
                <p>Receive push notifications in browser</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={formData.notifications.push}
                  onChange={(e) => handleNotificationChange('push', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="notification-item">
              <div className="notification-info">
                <h3>SMS Notifications</h3>
                <p>Receive updates via SMS</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={formData.notifications.sms}
                  onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          className="settings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="section-header">
            <h2>Preferences</h2>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                value={formData.preferences.currency}
                onChange={(e) => handlePreferenceChange('currency', e.target.value)}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="BTC">BTC - Bitcoin</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                value={formData.preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          className="settings-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {saveMessage && (
            <div className="save-message success">{saveMessage}</div>
          )}
          <button className="btn btn-primary btn-large" onClick={handleSave}>
            <Save size={20} />
            Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
