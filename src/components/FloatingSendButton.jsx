// FloatingSendButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FloatingSendButton = () => {
  return (
    <div className="fixed top-4 right-4 z-[1000]">
      <Link
        to="/chat"
        className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-md hover:bg-gray-100 transition font-medium"
      >
        Send a Message
      </Link>
    </div>
  );
};

export default FloatingSendButton;
