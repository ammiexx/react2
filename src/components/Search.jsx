import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Search.css';
import Hamburger from './Hamburger';
const categories = [
  "Entertainments",
  "Piassa",
  "Dubi",
  "Bahir Dar",
  "Bole",
  "Adama",
  "Hawassa",
  "Mexico",
  "seatle",
  "Addis gebeya",
  "Mekelie",
  "jima",
  "berlin",
  "paris",
  "canada"
];
const Search = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); // Ref for the menu container

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleCategoryClick = (category) => {
    navigate(`/${category.toLowerCase()}`);
    closeMenu(); // Close menu after navigation
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
              <li><Link to="/announcements" onClick={closeMenu}>Announcements</Link></li>
              <li><Link to="/chat" onClick={closeMenu}>Want new buyers/sellers?</Link></li>
              <li><Link to="/weekly-discounts" onClick={closeMenu}>Want discounts?</Link></li>
              <li><Link to="/purchasehistory" onClick={closeMenu}>History</Link></li>
              <li><Link to="/logout" onClick={closeMenu}>sign out</Link></li>
              <li><Link to="/orders" onClick={closeMenu}>Orders</Link></li>
              <li><Link to="/whishlist" onClick={closeMenu}>Wishlist</Link></li>
              <li><Link to="/addresses" onClick={closeMenu}>Addresses</Link></li>
              <li><Link to="/paymentmethods" onClick={closeMenu}>Payment Methods</Link></li>
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
              <li><Link to="/newarrivals" onClick={closeMenu}>New products</Link></li>
              <li><Link to="/best-sellers" onClick={closeMenu}>Best Sellers</Link></li>
              <li><Link to="/dealsandoffers" onClick={closeMenu}>Deals & Offers</Link></li>
              <li><Link to="/brands" onClick={closeMenu}>Brands</Link></li>
            </ul>
          </div>

          <div className="menu-section">
            <ul>
              <li><Link to="/helpcenter" onClick={closeMenu}>Help Center</Link></li>
              <li><Link to="/contactus" onClick={closeMenu}>Contact Us</Link></li>
              {/* <li><Link to="/returns-refunds" onClick={closeMenu}>Returns & Refunds</Link></li>
              <li><Link to="/shippinginfo" onClick={closeMenu}>Shipping Info</Link></li>
              <li><Link to="/trackorder" onClick={closeMenu}>Track Order</Link></li> */}
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
