
import React from 'react';
const Hamburger = ({ isOpen, toggle }) => {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle menu"
      type="button"
      className="flex flex-col justify-between w-8 h-6 z-[1100] transition-transform duration-200 hover:scale-110 border border-transparent hover:border-white"
    >
      <span
        className={`h-1 w-full bg-white rounded transition-transform duration-300 ease-in-out ${
          isOpen ? 'rotate-45 translate-y-2' : ''
        }`}
      />
      <span
        className={`h-1 w-full bg-white rounded transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`h-1 w-full bg-white rounded transition-transform duration-300 ease-in-out ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      />
    </button>
  );
};

export default Hamburger;
