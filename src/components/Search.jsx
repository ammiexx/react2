import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Hamburger from './Hamburger';

const categories = [
  "new advantages",
  "daily discounts",
  "weekly discounts",
  "new offers",
  "upcomming services",
  "what u want?",
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

  // Lock scroll when menu is open
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
      <nav className="w-full bg-gray-600 border-y border-gray-300 flex items-center px-5 py-3 gap-5 font-sans whitespace-nowrap overflow-x-hidden">
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

      {/* Backdrop overlay */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/5 z-40 backdrop-blur-[1px] transition-opacity duration-300"
        />
      )}

      {/* Side Drawer */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-screen w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end items-center h-12 border-b border-gray-200 relative z-10 px-3">
          <button
            onClick={closeMenu}
            className="text-gray-600 hover:text-gray-900 transition focus:outline-none"
            aria-label="Close menu"
            style={{ width: '32px', height: '32px' }}
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

        {/* Scrollable menu content */}
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          <div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><Link to="/aboutus" onClick={closeMenu}>About Us</Link></li>
              <li><Link to="/new advantages" onClick={closeMenu}>Announcements</Link></li>
              <li><Link to="/" onClick={closeMenu}>What U Want?</Link></li>
              <li><Link to="/weekly discounts" onClick={closeMenu}>Want Discounts?</Link></li>
              <li><Link to="/logout" onClick={closeMenu}>Sign Out</Link></li>
              <li><Link to="/orders" onClick={closeMenu}>Orders</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Categories</h3>
            <ul className="pl-4 list-disc text-sm space-y-1 text-gray-600">
              <li><Link to="/technologymethods" onClick={closeMenu}>Technology Methods</Link></li>
              <li><Link to="/blog" onClick={closeMenu}>Did You Know</Link></li>
              <li><Link to="/new offers" onClick={closeMenu}>New Products</Link></li>
              <li><Link to="/brands" onClick={closeMenu}>Brands</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Support</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link to="/helpcenter" onClick={closeMenu}>Help Center</Link></li>
              <li><Link to="/terms" onClick={closeMenu}>Terms & Conditions</Link></li>
              <li><Link to="/privacy" onClick={closeMenu}>Privacy Policy</Link></li>
              <li><Link to="/language" onClick={closeMenu}>Language</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
