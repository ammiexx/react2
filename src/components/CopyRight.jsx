import React from "react";
import { Link } from "react-router-dom";
const Copyright = () => {
  return (
    <div className="w-full bg-gray-900 text-gray-300 py-4 border-t border-gray-700">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm px-1">
        {/* Left side */}
        <p className="mb-2 sm:mb-0">
         &copy; {new Date().getFullYear()} supreme technology solutions. All rights reserved.
        </p>
        
        <div className="flex space-x-6">
          <Link to="/aboutus" className="hover:text-white transition">  About Us</Link>
          <Link to="/privacy" className="hover:text-white transition">  Privacy </Link>
          <Link to="/services" className="hover:text-white transition"> Services </Link>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
