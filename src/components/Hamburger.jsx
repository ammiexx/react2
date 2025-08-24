const Hamburger = ({ toggle }) => {
  return (
    <button 
      onClick={toggle} 
      className="relative w-6 h-6 flex flex-col justify-between items-center group"
    >
      <span className="block h-0.5 w-full bg-white transition-transform duration-300 group-hover:scale-x-110 group-hover:bg-gray-300" />
      <span className="block h-0.5 w-full bg-white transition-transform duration-300 group-hover:scale-x-110 group-hover:bg-gray-300" />
      <span className="block h-0.5 w-full bg-white transition-transform duration-300 group-hover:scale-x-110 group-hover:bg-gray-300" />
    </button>
  );
};
export default Hamburger;
