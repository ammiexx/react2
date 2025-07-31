// src/components/Profile.jsx
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import './Profile.css';

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <div className="profile-container">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Profile</h2>
      <div className="profile-card">
        <img
          src={user.imageUrl}
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <p><strong>Name:</strong> {user.fullName || user.firstName + ' ' + user.lastName}</p>
          <p><strong>Email:</strong> {user.primaryEmailAddress.emailAddress}</p>
          <p><strong>Username:</strong> {user.username || "N/A"}</p>
          <p><strong>Phone:</strong> {user.phoneNumbers?.[0]?.phoneNumber || "Not provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
