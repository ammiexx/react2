import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Hamburger from './Hamburger';
import Profile from '../pages/Profile';   // ✅ Clerk-based profile

const categories = [
  "Daily Discounts",
  "Weekly Discounts",
  "Holyday Discounts",
  "Upcomming Offers",
];

const Search = () => {
  const [openProfile, setOpenProfile] = useState(false); // ✅ Profile popup toggle
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleCategoryClick = (category) => {
    closeMenu();
    navigate(`/${encodeURIComponent(category.toLowerCase())}`);
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
   {/* Top Navigation */}
<nav className="w-full bg-gray-800 border-b border-gray-200 text-gray-800 shadow-sm flex items-center px-1 py-1 gap-5 font-sans whitespace-nowrap overflow-x-hidden">
  {/* Hamburger Icon */}
  <div className="flex items-center flex-shrink-0 mr-4">
    <Hamburger isOpen={menuOpen} toggle={toggleMenu} color="white" /> 
    {/* Pass dark color (Tailwind gray-700) so it's visible */}
  </div>

  {/* Category Buttons */}
  <div className="flex gap-3 flex-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-transparent">
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
        className={`fixed top-0 left-0 h-screen w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
       {/* Header */}
<div className="flex items-center justify-between h-16 px-5 border-b border-gray-200 bg-gray-100">
  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>

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
          {/* ✅ Account Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Account</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <button
                  onClick={() => setOpenProfile(true)}
                  className="w-full text-left hover:text-blue-600"
                >
                  My Profile
                </button>
              </li>
              <li>
                <Link
                  to="/myposts"
                  onClick={closeMenu}
                  className="block w-full text-left hover:text-blue-600"
                >
                  My Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/recents"
                  onClick={closeMenu}
                  className="block w-full text-left hover:text-blue-600"
                >
                  Recents
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Payments</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><Link to="/payment-updates" onClick={closeMenu} className="hover:text-blue-600">Payment updates</Link></li>
              <li><Link to="/pending-orders" onClick={closeMenu} className="hover:text-blue-600">Pending Orders</Link></li>
              <li><Link to="/completed-orders" onClick={closeMenu} className="hover:text-blue-600">Completed Orders</Link></li>
              <li><Link to="/payment-methods" onClick={closeMenu} className="hover:text-blue-600">Payment Methods</Link></li>
              <li><Link to="/wallet" onClick={closeMenu} className="hover:text-blue-600">Wallet Balance</Link></li>
              <li><Link to="/subscriptions" onClick={closeMenu} className="hover:text-blue-600">My Subscriptions</Link></li>
              <li><Link to="/refunds" onClick={closeMenu} className="hover:text-blue-600">Refund Requests</Link></li>
            </ul>
          </div>

          {/* Categories */}
        
          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Support</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link to="/helpcenter" onClick={closeMenu} className="hover:text-blue-600">Help Center</Link></li>
             
            </ul>
          </div>
        </div>
      </div>

      {/* ✅ Profile Popup Modal */}
      {openProfile && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-96 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenProfile(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            {/* ✅ Clerk Profile Component inside Modal */}
            <Profile />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
