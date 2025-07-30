import React from 'react';
import './Back.css';

const Back = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="back-to-top-container">
      <button className="back-to-top-button" onClick={scrollToTop}>
        ↑ Back to Top
      </button>
    </div>
  );
};

export default Back;
