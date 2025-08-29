import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or system preference
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply or remove dark mode class on <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleMode = () => setDarkMode(prev => !prev);

  return (
    <div className="flex items-center gap-3 cursor-pointer" onClick={toggleMode}>
      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </span>
      <div
        className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-all duration-300`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            darkMode ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </div>
    </div>
  );
};

export default DarkModeToggle;
