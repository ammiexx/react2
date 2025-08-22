// QuickLinks.jsx
import React from 'react';

const QuickLinks = () => {
  const scrollToFooter = () => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToFooter}
      className="text-blue-600 hover:underline font-semibold"
    >
      Quick Links
    </button>
  );
};

export default QuickLinks;
