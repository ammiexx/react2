import React from 'react';
import { useUser } from '@clerk/clerk-react';

const MyProfile = () => {
  const { user } = useUser();

  if (!user) {
    return <p className="text-center mt-10 text-gray-600">Please log in to view your profile.</p>;
  }

  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const email = user.primaryEmailAddress?.emailAddress || '';

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>First Name:</strong> {firstName}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
};

export default MyProfile;
