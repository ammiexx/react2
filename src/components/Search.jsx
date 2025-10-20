import React, { useState, useRef, useEffect } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import Hamburger from './Hamburger';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

import Profile from '../pages/Profile';

import { UserIcon, DocumentTextIcon, ClockIcon, ArrowRightOnRectangleIcon, 
  QuestionMarkCircleIcon,TagIcon,CalendarDaysIcon,GiftIcon, } from '@heroicons/react/24/outline';
import { CalendarIcon } from 'lucide-react';

const categories = [
  "Daily Discounts",
  "Weekly Discounts",
  "Holyday Discounts",
  "Upcomming Offers",
];

const accountLinks = (setOpenProfile, setShowLogoutConfirm, isSignedIn) => [
  { name: 'My Profile', icon: UserIcon, onClick: () => setOpenProfile(true) },
  { name: 'Logout', icon: ArrowRightOnRectangleIcon, onClick: () => setShowLogoutConfirm(true), requiresSignIn: true },
];

const Search = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); 
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { signOut, isSignedIn } = useClerk();
  const { user } = useUser();
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const [darkMode, setDarkMode] = useState(false);

const toggleDarkMode = () => {
  setDarkMode(!darkMode);
  if (!darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

  const handleCategoryClick = (category) => {
    closeMenu();
    navigate(`/${encodeURIComponent(category.toLowerCase())}`);
  };

  const confirmLogout = async () => {
    await signOut();
    setShowLogoutConfirm(false);
    closeMenu();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Top Navigation */}
      <nav className="w-full bg-white border-b border-gray-200 text-gray-800 shadow-sm flex items-center px-1 py-1 gap-5 font-sans whitespace-nowrap overflow-x-hidden relative">
       <div className="flex items-center flex-shrink-0 mr-4 cursor-pointer hover:bg-gray-200 rounded-full p-1 transition">
  <Hamburger isOpen={menuOpen} toggle={toggleMenu} color="gray" />
</div>


        {/* Category Buttons */}
        <div className="flex gap-1 -ml-8 flex-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-transparent">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(cat)}
              className="flex-shrink-0 px-3 py-1.5 text-sm rounded-full 
                         bg-gray-100 text-gray-800 border border-gray-300
                         hover:bg-blue-600 hover:text-white hover:border-blue-600 
                         transition whitespace-nowrap shadow-sm"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Floating Sign Up button */}
        {!isSignedIn && (
          <div className="absolute top-3 right-4">
            
           
          </div>
        )}
      </nav>

      {/* Backdrop Overlay */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/5 z-40 backdrop-blur-[1px] transition-opacity duration-300"
        />
      )}

      {/* Side Drawer */}
<div
  ref={menuRef}
  className={`fixed top-0 left-0 h-screen w-80 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
    menuOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
>



        {/* Header */}
        <div className="flex items-center justify-between h-20 px-5 border-b border-gray-200 bg-gray-400 dark:bg-gray-800 dark:border-gray-700">

          {isSignedIn && user ? (
            <div className="flex items-center gap-3">
            
              <h2 className="text-lg font-semibold text-gray-900">
  Hi {user.firstName} {user.lastName}
</h2>

            </div>
            
          ) : (
            <div className="flex items-center justify-between h-16 px-5 border-b border-gray-200 bg-gray-400">
  <Link
    to="/login"
     className="px-3 py-1 text-white text-xs font-medium rounded-md shadow hover:bg-gray-600 transition"
  >
    Sign Up
  </Link>

 
</div>

          )}

          <button
            onClick={closeMenu}
            className="w-8 h-8 flex items-center justify-center border border-gray-400 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Menu Content */}
        <div className="flex-grow overflow-y-auto p-5 space-y-8">
          {/* Account Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"></h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">

              {accountLinks(setOpenProfile, setShowLogoutConfirm, isSignedIn).map((link, index) => {
                if (link.requiresSignIn && !isSignedIn) return null;
                const IconComponent = link.icon || QuestionMarkCircleIcon;
                return (
                  <li key={index}>
                    {link.href ? (
                      <Link
                        to={link.href}
                        onClick={closeMenu}
                        className="flex items-center gap-2 hover:text-blue-600"
                      >
                        <IconComponent className="h-5 w-5" />
                        {link.name}
                      </Link>
                    ) : (
                      <button
                        onClick={link.onClick}
                        className="flex items-center gap-5 w-full text-left hover:text-blue-600"
                      >
                        <IconComponent className="h-5 w-5" />
                        {link.name}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Support Section */}
         
            <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"></h3>
            <ul className="space-y-5 text-sm text-gray-600">
              <li><Link to="/daily discounts" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-5">
                <TagIcon className="h-5 w-5" /> Daily Discounts
              </Link></li>
              <li><Link to="/weekly discounts" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-5">
                <CalendarIcon className="h-5 w-5" /> Weekly Discounts
              </Link></li>
               <li><Link to="/holyday discounts" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-5">
                <GiftIcon className="h-5 w-5" /> Holyday Discounts
              </Link></li>
              <li><Link to="/upcomming offers" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-5">
                <ClockIcon className="h-5 w-5" /> Upcoming Discounts
              </Link></li>



            </ul>
            {/* <div className="flex justify-end mb-4">
  <button
    onClick={toggleDarkMode}
    className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    aria-label="Toggle Dark Mode"
  >
    {darkMode ? (
      <SunIcon className="h-5 w-5 text-yellow-400" />
    ) : (
      <MoonIcon className="h-5 w-5 text-gray-700" />
    )}
  </button>
</div> */}
 
          </div>
           <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"></h3>
            <ul className="space-y-5 text-sm text-gray-600">
              <li><Link to="/myposts" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-5">
                <DocumentTextIcon className="h-5 w-5" /> My Posts
              </Link></li>
              <li><Link to="/form" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-5">
                <ClockIcon className="h-5 w-5" /> Add your business
              </Link></li>
               <li><Link to="/recents" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-5">
                <ClockIcon className="h-5 w-5" /> Recents
              </Link></li>
               <li><Link to="/aboutus" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-5">
                <DocumentTextIcon className="h-5 w-5" /> About us
              </Link></li>



            </ul>
          </div>
           <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"></h3>
            <ul className="space-y-5 text-sm text-gray-600">
             
              



            </ul>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                 className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

     {/* Profile Popup Modal */}
{openProfile && (
  <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-96 relative">
      <button
        onClick={() => setOpenProfile(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>

      {/* Profile Info */}
      {user && (
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
            <img
              src={user.profileImageUrl || 'https://via.placeholder.com/80'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-600">
            {user.primaryEmailAddress?.emailAddress || 'No email provided'}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Link
          to="/myposts"
          onClick={() => setOpenProfile(false)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg text-center hover:bg-blue-700 transition"
        >
          My Posts
        </Link>

        <Link
          to="/form"
          onClick={() => setOpenProfile(false)}
          className="px-4 py-2 text-white bg-green-600 rounded-lg text-center hover:bg-green-700 transition"
        >
          Add Post
        </Link>
      </div>
    </div>
  </div>
)}

      

    </>
  );
};

export default Search;
