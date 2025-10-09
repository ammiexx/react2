const Hamburger = ({ toggle, color = "#374151" }) => {
  return (
    <button 
      onClick={toggle} 
      className="relative w-6 h-4 flex flex-col justify-between items-center group focus:outline-none"
      aria-label="Menu"
    >
      <span 
        className={`block h-0.5 w-full transition-all duration-300 transform group-hover:scale-x-110 group-hover:bg-blue-600`} 
        style={{ backgroundColor: color }}
      />
      <span 
        className={`block h-0.5 w-full transition-all duration-300 transform group-hover:scale-x-110 group-hover:bg-blue-600`} 
        style={{ backgroundColor: color }}
      />
      <span 
        className={`block h-0.5 w-full transition-all duration-300 transform group-hover:scale-x-110 group-hover:bg-blue-600`} 
        style={{ backgroundColor: color }}
      />
    </button>
  );
};

export default Hamburger;
