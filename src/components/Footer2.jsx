import React from "react";
import { Link } from "react-router-dom";
import knash from "../assets/lgo.png";

export default function Footer2() {
  const normalTextClass = "text-gray-300 text-sm";
  const linkClass = "hover:text-white transition-colors";

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
     
       
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
          {/* Column 1: Explore */}
          <div>
            <h4 className="text-white font-semibold mb-2">Explore</h4>
            <ul className={`${normalTextClass} space-y-1`}>
              <li><Link to="/" className={linkClass}>All</Link></li>
              <li><Link to="/new-products" className={linkClass}>New Products</Link></li>
              <li><Link to="/upcoming-offers" className={linkClass}>Upcoming Offers</Link></li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
            <ul className={`${normalTextClass} space-y-1`}>
              <li><Link to="/new-advantages" className={linkClass}>New Offers</Link></li>
              <li><Link to="/weekly-discounts" className={linkClass}>Weekly Discounts</Link></li>
              <li><Link to="/daily-discounts" className={linkClass}>Daily Discounts</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold mb-2">Company</h4>
            <ul className={`${normalTextClass} space-y-1`}>
              <li><Link to="/newoffers" className={linkClass}>New Offers</Link></li>
              <li><Link to="/holiday-discounts" className={linkClass}>Holiday Discounts</Link></li>
              <li><Link to="/helpcenter" className={linkClass}>Help Center</Link></li>
            </ul>
          </div>

          {/* Column 4: Sign Up */}
          <div>
            <h4 className="text-white font-semibold mb-2">Sign Up</h4>
            <ul className={`${normalTextClass} space-y-1`}>
              <li><Link to="/signup" className={linkClass}>Sign In</Link></li>
              <li><Link to="/login" className={linkClass}>Sign Up</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
