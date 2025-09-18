import React, { useState } from "react";
import { useUser, SignOutButton, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!user) {
    return (
      <div className="text-center">
        <p className="mb-2">Not logged in</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In / Sign Up
        </button>
      </div>
    );
  }

  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  const email = user.emailAddresses[0]?.emailAddress || "";

  return (
    <div className="w-full">
      {/* User Header */}
      <div className="flex items-center border-b pb-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
              1.79-4 4 1.79 4 4 4zm0 2c-2.67 
              0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="font-semibold">{user.fullName || `${firstName} ${lastName}`}</p>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
      </div>

      

     
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <p className="text-lg font-medium mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <SignOutButton>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                  Confirm
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
