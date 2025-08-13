import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Search.css';
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
    navigate(`/${category.toLowerCase()}`);
    closeMenu(); 
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
          <div className="menu-section">
            <ul>
              
              <li><Link to="/aboutus" onClick={closeMenu}>About Us</Link></li>
              <li><Link to="/new advantages" onClick={closeMenu}>Announcements</Link></li>
              <li><Link to="/what u want?" onClick={closeMenu}>what u want?</Link></li>
              <li><Link to="/weekly discounts" onClick={closeMenu}>Want discounts?</Link></li>
              <li><Link to="/logout" onClick={closeMenu}>sign out</Link></li>
              <li><Link to="/orders" onClick={closeMenu}>Orders</Link></li>
            </ul>
          </div>
          <div className="menu-section">
            <ul>
              <li>
                Categories
                <ul className="nested">
                  <li><Link to="/technologymethods" onClick={closeMenu}>Technology Methods</Link></li>
                  <li><Link to="/blog" onClick={closeMenu}>Did you know</Link></li>
                </ul>
              </li>
              <li><Link to="/new offers" onClick={closeMenu}>New products</Link></li>
              <li><Link to="/brands" onClick={closeMenu}>Brands</Link></li>
            </ul>
          </div>

          <div className="menu-section">
            <ul>
              <li><Link to="/helpcenter" onClick={closeMenu}>Help Center</Link></li>
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
