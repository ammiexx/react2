import React, { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Searching = ({ products, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    onFilter(filtered);
  };

  const handleSearchClick = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilter(filtered);
  };

  return (
    <div className="w-full max-w-full sm:max-w-md mx-auto px-2">
      <div className="relative flex w-full">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          className="flex-1 text-black placeholder-gray-500 bg-white rounded-full px-4 py-1.5 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm w-full transition"
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-r-full bg-gray-200 hover:bg-gray-300 p-2 transition"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Searching;
