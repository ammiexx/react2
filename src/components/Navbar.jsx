import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Profile from '../pages/Profile';
import './Navbar.css';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo Section with image */}
        <div className="logo">
          <Link to="/">
   <div className="logo">
  <Link to="/" className="logo-link">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
      alt="CBN Logo"
      className="logo-img"
    />
    <span className="logo-text">seller-buyer-network</span>
  </Link>
</div>


          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
             <NavLink to="/Daily Discounts" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
            daily discounts
          </NavLink>
          <NavLink to="/Weekly discounts" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
            weekly discounts
          </NavLink>
          <NavLink to="/announcements" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
            Announcements
          </NavLink>
          <NavLink to="/chat" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
            S&B
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
            sign in
          </NavLink>
          <NavLink to="/signup" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
            sign up
          </NavLink>
        </div>
         <div className="nav-profile">
        <Profile />
      </div>

        {/* Hamburger Menu */}
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
      </div>
    </nav>
  );
};

export default Navbar;
