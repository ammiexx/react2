import React, { useState } from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import './Profile.css';

const Profile = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const email = user.emailAddresses[0]?.emailAddress || '';
  const firstInitial = firstName.charAt(0).toUpperCase();

  return (
    <div className="profile-wrapper" onClick={() => setOpen(!open)}>
      {/* Human icon or placeholder with first initial */}
      <div className="profile-icon" title="Profile">
        {/* Using SVG human icon */}
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

      {/* Dropdown on click */}
      {open && (
        <div className="profile-dropdown">
          <div className="profile-info">
            <div className="profile-large-icon">
              {/* Larger human icon */}
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
              <strong>{user.fullName}</strong>
              <div className="profile-email">{email}</div>
            </div>
          </div>

          {/* Show first name and last name above logout */}
          <div className="profile-name">
            <span>{firstName}</span> <span>{lastName}</span>
          </div>

          <div className="profile-actions">
            <SignOutButton>
              <button className="logout-btn">Log out</button>
            </SignOutButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
