import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const root = document.body; // 👈 use body instead of html

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.body;
    const newTheme = root.classList.contains('dark') ? 'light' : 'dark';

    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', newTheme);
    setIsDark(newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 text-sm"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
