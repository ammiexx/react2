import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {NavLink } from 'react-router-dom';
import './Search.css';
import Hamburger from './Hamburger';
const categories = [
  "Daily Discounts",
  "Weekly Discounts",
  "Entertainments",
  "Car Brands",
  "Fashions",
  "Real Estates",
  "Computer & Electronics",
  "Food & Drinks",
  "Home & Appliances",
  "Health & Beauty",
  "Construction & Building Materials",
  "Education and Services",
  "Industrial Equipment",
  "Agricultural & LiveStock",
  "Repair & Maintainance",
  "Event & Wedding",
  "Services and Freelance"
];

const Search = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleCategoryClick = (category) => {
    navigate(`/${category.toLowerCase()}`);
  };

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
        <div className="detailed-menu">
          <div className="menu-section">
            <div className="section-title">— Account —</div>
            <ul>
              <li><Link to="/profile">My Profile</Link></li>
               <li><Link to="/profile">favorites</Link></li>
              <li><Link to="/aboutus">About Us </Link></li>
              <li><Link to="/announcements">Announcements </Link></li>
              <li><Link to="/chat">want new buyers/sellers? </Link></li>
              <li><Link to="/weekly discounts">Want discounts? </Link></li>
              <li><Link to="/purchasehistory">history </Link></li>
              <li><Link to="/logout">Log out</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/whishlist">Wishlist</Link></li>
              <li><Link to="/addresses">Addresses</Link></li>
              <li><Link to="/paymentmethods">Payment Methods</Link></li>

            </ul>
          </div>
          <div className="menu-section">
            <div className="section-title">— Shop —</div>
            <ul>
              <li>
                Categories
                <ul className="nested">
                  
                  <li><Link to="/technologymethods">technology methods</Link></li>
                  <li><Link to="/blog">Did you know</Link></li>
                </ul>
              </li>
              <li><Link to="/newarrivals">New Arrivals</Link></li>
              <li><Link to="/best-sellers">Best Sellers</Link></li>
              <li><Link to="/dealsandoffers">Deals & Offers</Link></li>
              <li><Link to="/brands">Brands</Link></li>
            </ul>
          </div>
          
          <div className="menu-section">
            <div className="section-title">— Support —</div>
            <ul>
              <li><Link to="/helpcenter">Help Center</Link></li>
              <li><Link to="/contactus">Contact Us</Link></li>
              <li><Link to="/returns-refunds">Returns & Refunds</Link></li>
              <li><Link to="/shippinginfo">Shipping Info</Link></li>
              <li><Link to="/trackorder">Track Order</Link></li>
            </ul>
          </div>
          <div className="menu-section">
            <div className="section-title">— Info —</div>
            <ul>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              
            </ul>
          </div>
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
