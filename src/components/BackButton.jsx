// components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className = '', fallback = '/' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback); // fallback to home if no history
    }
  };

  return (
    <div className={`sticky top-0 bg-white z-10 py-2 px-4 ${className}`}>
      <button
        onClick={handleBack}
        className="text-blue-600 font-medium hover:underline flex items-center gap-1"
      >
        ← Back
      </button>
    </div>
  );
};

export default BackButton;
