const Hamburger = ({ toggle, color = "#374151" }) => { // default dark gray
  return (
    <button 
      onClick={toggle} 
      className="relative w-6 h-4 flex flex-col justify-between items-center group"
    >
      <span 
        className={`block h-0.5 w-full transition-transform duration-300 group-hover:scale-x-110`} 
        style={{ backgroundColor: color }}
      />
      <span 
        className={`block h-0.5 w-full transition-transform duration-300 group-hover:scale-x-110`} 
        style={{ backgroundColor: color }}
      />
      <span 
        className={`block h-0.5 w-full transition-transform duration-300 group-hover:scale-x-110`} 
        style={{ backgroundColor: color }}
      />
    </button>
  );
};

export default Hamburger;
