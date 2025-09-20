import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Searching = ({ products, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    // if onFilter is passed (like Nearby page), update that too
    if (onFilter) {
      const filtered = products.filter((product) =>
        [product.product_name, product.company_name, product.location]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      onFilter(filtered);
    }

    // navigate to search results page
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();   // ✅ stop form submit
      handleSearch();
    }
  };

  return (
  <div className="w-full max-w-[12rem] sm:max-w-md md:max-w-lg lg:max-w-xl">
  <div className="relative flex w-full">
    <input
      type="text"
      placeholder="Search items..."
      className="flex-1 h-8 text-sm text-black placeholder-gray-500 bg-white rounded-full px-3 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
    />
    <button
      type="button"
      className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-gray-200 hover:bg-gray-300 p-1.5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.2-5.2M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
      </svg>
    </button>
  </div>
</div>


  );
};

export default Searching;
