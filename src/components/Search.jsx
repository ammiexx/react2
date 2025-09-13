import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Hamburger from './Hamburger';

const categories = [
  "Daily Discounts",
  "Weekly Discounts",
  "Holyday Discounts",
  "Upcomming Services",
];

const Search = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleCategoryClick = (category) => {
    closeMenu();
    navigate(`/${encodeURIComponent(category.toLowerCase())}`);
  };

  // Lock scroll when menu is open and close on outside click
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
      <nav className="w-full bg-gray-600 border-y border-gray-300 flex items-center px-5 py-1 gap-5 font-sans whitespace-nowrap overflow-x-hidden">
        {/* Hamburger Icon */}
        <div className="flex items-center flex-shrink-0 mr-4">
          <Hamburger isOpen={menuOpen} toggle={toggleMenu} />
        </div>

        {/* Category Buttons */}
        <div className="flex gap-3 flex-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(cat)}
              className="flex-shrink-0 px-3 py-1.5 text-sm rounded-full border border-transparent bg-transparent text-white hover:bg-white hover:text-gray-700 hover:border-white transition whitespace-nowrap"
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
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={closeMenu}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Menu Content */}
        <div className="flex-grow overflow-y-auto p-5 space-y-8">
          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Navigation</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><Link to="/aboutus" onClick={closeMenu} className="hover:text-blue-600">About Us</Link></li>
              <li><Link to="/nearby-shops" onClick={closeMenu} className="hover:text-blue-600">Nearby Shops</Link></li>
              <li><Link to="/New Advantages" onClick={closeMenu} className="hover:text-blue-600">Announcements</Link></li>
              <li><Link to="/Weekly Discounts" onClick={closeMenu} className="hover:text-blue-600">Want Discounts?</Link></li>
              <li><Link to="/logout" onClick={closeMenu} className="hover:text-red-600 font-medium">Sign Out</Link></li>
            </ul>
          </div>

           <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Payments</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><Link to="/aboutus" onClick={closeMenu} className="hover:text-blue-600">Payment Notification</Link></li>
              <li><Link to="/nearby-shops" onClick={closeMenu} className="hover:text-blue-600">Pending Orders</Link></li>
              <li><Link to="/New Advantages" onClick={closeMenu} className="hover:text-blue-600">orders</Link></li>
            </ul>
          </div>


          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Categories</h3>
            <ul className="pl-4 list-disc text-sm space-y-1 text-gray-600">
              <li><Link to="/technologymethods" onClick={closeMenu} className="hover:text-blue-600">Technology Methods</Link></li>
              <li><Link to="/New Offers" onClick={closeMenu} className="hover:text-blue-600">New Products</Link></li>
              <li><Link to="/holy day discounts" onClick={closeMenu} className="hover:text-blue-600">Holiday Discounts</Link></li>
              <li><Link to="/brands" onClick={closeMenu} className="hover:text-blue-600">Brands</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Support</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link to="/helpcenter" onClick={closeMenu} className="hover:text-blue-600">Help Center</Link></li>
              <li><Link to="/terms" onClick={closeMenu} className="hover:text-blue-600">Terms & Conditions</Link></li>
              <li><Link to="/privacy" onClick={closeMenu} className="hover:text-blue-600">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
