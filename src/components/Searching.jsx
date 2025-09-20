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
  <div className="w-80">

  <div className="relative flex w-full">
    <input
      type="text"
      placeholder="Search items to buy"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleKeyDown}
      className="flex-1 h-8 text-sm text-black placeholder-gray-500 bg-white rounded-full px-3 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
    />
    <button
      type="button"
      onClick={handleSearch}
      className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-gray-200 hover:bg-gray-300 p-1.5"
    >
      <MagnifyingGlassIcon className="h-4 w-4 text-gray-700" />
    </button>
  </div>
</div>

  );
};

export default Searching;
