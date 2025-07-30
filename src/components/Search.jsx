import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Search.css';
import Hamburger from './Hamburger';
const categories = ["Electronics", "Cars", "Houses", "Clothes","todays deals","customer services"];
const Search = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleCategoryClick = (category) => {
    navigate(`/${category.toLowerCase()}`);
  };

  return (
    <nav className="navigation2">
      {/* Hamburger button */}
      <Hamburger isOpen={menuOpen} toggle={toggleMenu} />

      {/* Category buttons */}
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

      {/* Detailed menu toggled by hamburger */}
      {menuOpen && (
        <div className="detailed-menu">
          {/* ACCOUNT */}
          <div className="menu-section">
            <div className="section-title">— Account —</div>
            <ul>
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/addresses">Addresses</Link></li>
              <li><Link to="/payment-methods">Payment Methods</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </div>

          {/* SHOP */}
          <div className="menu-section">
            <div className="section-title">— Shop —</div>
            <ul>
              <li>
                Categories
                <ul className="nested">
                  <li><Link to="/categories/electronics">Electronics</Link></li>
                  <li><Link to="/categories/clothing">Clothing</Link></li>
                  <li><Link to="/categories/home-garden">Home & Garden</Link></li>
                </ul>
              </li>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/best-sellers">Best Sellers</Link></li>
              <li><Link to="/deals-offers">Deals & Offers</Link></li>
              <li><Link to="/brands">Brands</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="menu-section">
            <div className="section-title">— Support —</div>
            <ul>
              <li><Link to="/help-center">Help Center</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li><Link to="/returns-refunds">Returns & Refunds</Link></li>
              <li><Link to="/shipping-info">Shipping Info</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
            </ul>
          </div>

          {/* INFO */}
          <div className="menu-section">
            <div className="section-title">— Info —</div>
            <ul>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* SETTINGS */}
          <div className="menu-section">
            <div className="section-title">— Settings —</div>
            <ul>
              <li><Link to="/language">Language</Link></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Search;
