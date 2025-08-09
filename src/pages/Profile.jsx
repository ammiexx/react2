import React, { useState } from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const firstName = user.firstName || '';
  const email = user.emailAddresses[0]?.emailAddress || '';
  const profileImage = user.imageUrl;
  const firstInitial = firstName.charAt(0).toUpperCase();

  return (
    <div className="profile-wrapper" onClick={() => setOpen(!open)}>
      {/* Avatar or placeholder with first initial */}
      {profileImage ? (
        <img src={profileImage} alt="Profile" className="profile-avatar" />
      ) : (
        <div className="profile-placeholder">{firstInitial}</div>
      )}

      {/* Dropdown on click */}
      {open && (
        <div className="profile-dropdown">
          <div className="profile-info">
            {profileImage && (
              <img src={profileImage} alt="Large Profile" className="profile-large" />
            )}
            <div className="profile-details">
              <strong>{user.fullName}</strong>
              <div className="profile-email">{email}</div>
            </div>
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
