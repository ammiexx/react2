// src/components/Search.jsx
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="w-full bg-gray-600 border-y border-gray-300 flex items-center px-5 py-3 gap-5 font-sans whitespace-nowrap overflow-x-hidden">
        {/* Hamburger */}
        <div className="flex items-center flex-shrink-0 mr-4">
          <Hamburger isOpen={menuOpen} toggle={toggleMenu} />
        </div>

        {/* Categories */}
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

      {/* Side Drawer */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-3 border-b border-gray-200">
      <button
  onClick={closeMenu}
  className="h-10 w-10 flex items-center justify-center text-gray-500 hover:text-gray-700 text-3xl font-bold"
  aria-label="Close menu"
>
  &times;
</button>


        </div>

        {/* Menu Content */}
        <div className="p-4 space-y-6 h-full overflow-y-auto">
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


