import React, { useState } from 'react';
import { Bell, Globe, Moon, Volume2 } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('english');
  const [theme, setTheme] = useState('light');
  const [audioEnabled, setAudioEnabled] = useState(true);

  const handleNotificationChange = () => {
    setNotifications(!notifications);
    // Implement logic to update user preferences
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    // Implement logic to update user preferences and change app language
  };

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // Implement logic to update user preferences and change app theme
  };

  const handleAudioChange = () => {
    setAudioEnabled(!audioEnabled);
    // Implement logic to update user preferences
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-6 h-6 mr-3 text-gray-600" />
            <div>
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-sm text-gray-600">Receive reminders and updates</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notifications}
              onChange={handleNotificationChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Globe className="w-6 h-6 mr-3 text-gray-600" />
            <div>
              <h2 className="text-lg font-semibold">Language</h2>
              <p className="text-sm text-gray-600">Choose your preferred language</p>
            </div>
          </div>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5"
          >
            <option value="english">English</option>
            <option value="arabic">العربية</option>
            <option value="urdu">اردو</option>
            <option value="indonesian">Bahasa Indonesia</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Moon className="w-6 h-6 mr-3 text-gray-600" />
            <div>
              <h2 className="text-lg font-semibold">Dark Mode</h2>
              <p className="text-sm text-gray-600">Toggle dark theme</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === 'dark'}
              onChange={handleThemeChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Volume2 className="w-6 h-6 mr-3 text-gray-600" />
            <div>
              <h2 className="text-lg font-semibold">Audio</h2>
              <p className="text-sm text-gray-600">Enable audio for recitations</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={audioEnabled}
              onChange={handleAudioChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>
      
      <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
        Save Changes
      </button>
    </div>
  );
};

export default SettingsPage;