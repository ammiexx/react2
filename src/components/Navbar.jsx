import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Profile from '../pages/Profile';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="CBN Logo"
                className="h-8 w-8"
              />
              <span className="hidden sm:block font-bold text-lg">customer-business-network</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-4 items-center">
            <NavLink to="/your-discounts" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
              Discounts
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
              Sign In
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
              Sign Up
            </NavLink>
            <Profile />
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-700 px-4 pt-4 pb-6 space-y-2">
          <NavLink to="/your-discounts" onClick={() => setMenuOpen(false)} className="block text-white hover:underline">
            Discounts
          </NavLink>
          <NavLink to="/login" onClick={() => setMenuOpen(false)} className="block text-white hover:underline">
            Sign In
          </NavLink>
          <NavLink to="/signup" onClick={() => setMenuOpen(false)} className="block text-white hover:underline">
            Sign Up
          </NavLink>
          <div className="pt-2 border-t border-gray-600">
            <Profile />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
