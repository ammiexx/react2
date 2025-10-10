import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
const Searching = ({ products, onFilter, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    if (onFilter) {
      const filtered = products.filter((product) =>
        [product.product_name, product.company_name, product.location]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      onFilter(filtered);
    }
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    if (onSubmit) onSubmit();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <div className="relative w-90 sm:w-90 flex items-center">

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search (e.g Item, location, building, company)"
       className="flex-1 h-11 sm:h-11 text-sm text-gray-900 placeholder-gray-500 bg-white rounded-full pl-4 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md transition-all"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500    h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-r-full text-white shadow-md transition-colors"
      >
        <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
};
export default Searching;
