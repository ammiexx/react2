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
    <div className="w-full max-w-full sm:max-w-md mx-auto px-2">
      <div className="relative flex w-full">
        <input
          type="text"
          placeholder="Search items to buy "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-black placeholder-gray-500 bg-white rounded-full px-4 py-1.5 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm w-full transition"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-r-full bg-gray-200 hover:bg-gray-300 p-2 transition"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Searching;
