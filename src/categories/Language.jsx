import React, { useState } from 'react';
import './Language.css';

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'de', label: 'German', flag: '🇩🇪' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
];

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleSelectLanguage = (code) => {
    setSelectedLanguage(code);
    alert(`Language changed to: ${languages.find(l => l.code === code).label}`);
    // TODO: integrate with your i18n logic or reload text here
  };

  return (
    <div className="language-container">
      <h2>Select Your Language</h2>
      <p className="language-desc">Choose your preferred language for browsing our website.</p>
      <ul className="language-list">
        {languages.map(({ code, label, flag }) => (
          <li
            key={code}
            className={`language-item ${selectedLanguage === code ? 'selected' : ''}`}
            onClick={() => handleSelectLanguage(code)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSelectLanguage(code)}
          >
            <span className="language-flag" aria-label={`${label} flag`}>
              {flag}
            </span>
            <span className="language-label">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Language;
