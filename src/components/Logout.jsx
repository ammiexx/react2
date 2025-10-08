// src/components/Logout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setConfirmOpen(true);
  }, []);

  const handleCancel = () => {
    setConfirmOpen(false);
    navigate(-1); 
  };

  const handleConfirmLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <>
      {confirmOpen && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-box">
            <p className="logout-confirm-text">You want to logout?</p>
            <div className="logout-confirm-buttons">
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleConfirmLogout} className="confirm-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
