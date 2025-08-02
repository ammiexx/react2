import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Search.css';
import Hamburger from './Hamburger';

const categories = [
  "Daily Discounts", "Weekly Discounts", "Entertainments", "Car Brands",
  "Fashions", "Real Estates", "Computer & Electronics", "Food & Drinks",
  "Home & Appliances", "Health & Beauty", "Construction & Building Materials",
  "Education and Services", "Industrial Equipment", "Agricultural & LiveStock",
  "Repair & Maintainance", "Event & Wedding", "Services and Freelance"
];

const Search = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleCategoryClick = (category) => {
    navigate(`/${category.toLowerCase().replace(/\s+/g, '-')}`);
    closeMenu();
  };

  // Close menu on outside click
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

    // Cleanup on unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="navigation2">
      <Hamburger isOpen={menuOpen} toggle={toggleMenu} />

      <div className="categories">
        {categories.map((cat, index) => (
          <button
            key={index}
            className="category-btn"
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {menuOpen && (
        <div className="detailed-menu" ref={menuRef}>
          {/* You can optionally split this into components */}
          <div className="menu-section">
            <ul>
              <li><Link to="/profile" onClick={closeMenu}>My Profile</Link></li>
              <li><Link to="/profile" onClick={closeMenu}>Favorites</Link></li>
              <li><Link to="/aboutus" onClick={closeMenu}>About Us</Link></li>
              <li><Link to="/announcements" onClick={closeMenu}>Announcements</Link></li>
              <li><Link to="/chat" onClick={closeMenu}>Want new buyers/sellers?</Link></li>
              <li><Link to="/weekly-discounts" onClick={closeMenu}>Want discounts?</Link></li>
              <li><Link to="/purchasehistory" onClick={closeMenu}>Rewards</Link></li>
              <li><Link to="/logout" onClick={closeMenu}>Log out</Link></li>
            </ul>
          </div>

          <div className="menu-section">
            <ul className="nested">
              <li><Link to="/technologymethods" onClick={closeMenu}>Technology Methods</Link></li>
              <li><Link to="/blog" onClick={closeMenu}>Did you know?</Link></li>
              <li><Link to="/brands" onClick={closeMenu}>New Products</Link></li>
            </ul>
          </div>

          <div className="menu-section">
            <ul>
              <li><Link to="/helpcenter" onClick={closeMenu}>Help Center</Link></li>
              <li><Link to="/contactus" onClick={closeMenu}>Contact Us</Link></li>
            </ul>
          </div>

          <div className="menu-section">
            <ul>
              <li><Link to="/terms" onClick={closeMenu}>Terms & Conditions</Link></li>
              <li><Link to="/privacy" onClick={closeMenu}>Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="menu-section">
            <ul>
              <li><Link to="/language" onClick={closeMenu}>Language</Link></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Search;
