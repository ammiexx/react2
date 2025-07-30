// src/components/Hamburger.jsx
import React from 'react';
import './Hamburger.css';
const Hamburger = ({ isOpen, toggle }) => {
  return (
    <button
      className={`hamburger-btn ${isOpen ? 'open' : ''}`}
      onClick={toggle}
      aria-label="Toggle menu"
      type="button"
    >
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
    </button>
  );
};

export default Hamburger;
