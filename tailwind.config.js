/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,jsx}', // Scan all relevant source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
