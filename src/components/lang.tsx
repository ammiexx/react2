// src/components/Lang.tsx
import React, { useState } from 'react';
import './Lang.css';

const Lang = () => {
  const [selectedLang, setSelectedLang] = useState('en');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLang(e.target.value);
    // Add logic here to change language, if using i18n library
  };

  return (
    <div className="lang-selector">
      <label htmlFor="lang">🌐 Language:</label>
      <select id="lang" value={selectedLang} onChange={handleChange}>
        <option value="en">English</option>
        <option value="am">Amharic</option>
        <option value="fr">French</option>
        <option value="ar">Arabic</option>
      </select>
    </div>
  );
};

export default Lang;
