import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <div className="w-full bg-gray-900 text-gray-300 py-4 border-t border-gray-700">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        {/* Left side */}
        <p className="mb-2 sm:mb-0">
          © 2025 <span className="font-semibold">CBN Solutions</span>. All Rights Reserved.
        </p>

        {/* Right side */}
        <div className="flex space-x-6">
          <Link to="/aboutus" className="hover:text-white transition">
            About Us
          </Link>
          <Link to="/privacy" className="hover:text-white transition">
          
            Privacy
          </Link>
          <Link to="/services" className="hover:text-white transition">
            Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
