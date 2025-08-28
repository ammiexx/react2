import React, { useState, useRef, useEffect } from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// render the profile photo
const Profile = () => {
  const navigate = useNavigate();
  const [loadingRedirect, setLoadingRedirect] = useState(false); // ✅ New state
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpen(false);
        setShowLogoutConfirm(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

if (!user) {
  return (
    <div className="relative inline-block cursor-pointer group" title="Not logged in">
      <div className="w-10 h-10 flex items-center justify-center text-gray-600 border-2 border-gray-300 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
      </div>

      <div className="absolute top-12 right-0 bg-white border border-gray-300 shadow-md rounded-md px-3 py-2 text-xs text-gray-700 whitespace-nowrap z-50">
        Account not created, please{' '}
     <button
  onClick={() => {
  if (!navigator.onLine) {
    alert('❌ No internet connection. Please check your connection and try again.');
    return;
  }
  setLoadingRedirect(true);
  setTimeout(() => {
   navigate('/login', { state: { fromRedirect: true } });
 // ✅ signal that it's from redirect
  }, 300);
}}

  className="text-blue-600 underline hover:text-blue-800 hover:underline transition duration-200"
>
  sign up
</button>

        {loadingRedirect && ( // ✅ Loading message
          <div className="mt-2 text-gray-500 text-xs animate-pulse"></div>
        )}
      </div>
    </div>
  );
}


  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const email = user.emailAddresses[0]?.emailAddress || '';

  return (
    <div ref={profileRef} className="relative inline-block">
      {/* Profile icon button */}
      <div
        className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-100 transition"
        title="Profile"
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
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
        <div className="absolute top-14 right-0 w-60 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50">
          <div className="flex items-center border-b pb-3 mb-3">
            <div className="w-12 h-12 text-gray-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-800">{user.fullName || `${firstName} ${lastName}`}</p>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </div>

          <div className="text-center text-sm font-medium text-gray-800 mb-3">
            {firstName} {lastName}
          </div>
                                        <div className="text-center mb-2">
                                <button
                                  onClick={() => {
                                    navigate('/myposts');
                                    setOpen(false); // close dropdown
                                  }}
                                  className="text-blue-600 hover:underline text-sm font-medium"
                                >
                                  My Posts
                                </button>
                              </div>


          <div className="text-center">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Log out
            </button>
          </div>

          {/* Logout confirmation modal */}
          {showLogoutConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                <p className="text-lg font-medium mb-4">Are you sure you want to log out?</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <SignOutButton>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                      Confirm
                    </button>
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
