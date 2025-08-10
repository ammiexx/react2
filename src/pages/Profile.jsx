import React, { useState, useRef, useEffect } from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import './Profile.css';

const Profile = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown if click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpen(false);
        setShowLogoutConfirm(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Fallback UI if no user loaded yet
  if (!user) {
    return (
      <div className="profile-wrapper" title="Not logged in">
        <div className="profile-icon" onClick={() => {}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="human-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </div>
      </div>
    );
  }

  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const email = user.emailAddresses[0]?.emailAddress || '';

  return (
    <div className="profile-wrapper" ref={profileRef}>
      {/* Profile icon toggles dropdown */}
      <div
        className="profile-icon"
        title="Profile"
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="human-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="profile-dropdown">
          <div className="profile-info">
            <div className="profile-large-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="human-icon-large"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </div>
            <div className="profile-details">
              <strong>{user.fullName || firstName + ' ' + lastName}</strong>
              <div className="profile-email">{email}</div>
            </div>
          </div>

          <div className="profile-name">
            <span>{firstName}</span> <span>{lastName}</span>
          </div>

          <div className="profile-actions">
            <button
              className="logout-btn"
              onClick={() => setShowLogoutConfirm(true)}
            >
              Log out
            </button>
          </div>

          {/* Confirmation Modal */}
          {showLogoutConfirm && (
            <div className="confirm-modal">
              <div className="confirm-modal-content">
                <p>Are you sure you want to log out?</p>
                <div className="confirm-buttons">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <SignOutButton>
                    <button className="confirm-btn">Confirm</button>
                  </SignOutButton>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
