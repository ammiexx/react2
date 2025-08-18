import React from 'react';
// to move to the top of the navigation
const Back = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={scrollToTop}
        className="bg-[#6ec1e4] text-white font-semibold px-4 py-2 rounded-full shadow-md hover:bg-[#4ea9cd] transition-colors"
      >
        ↑ Back to Top
      </button>
    </div>
  );
};

export default Back;
