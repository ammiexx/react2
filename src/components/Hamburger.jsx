const Hamburger = ({ toggle }) => {
  return (
    <button onClick={toggle} className="relative w-6 h-6 flex flex-col justify-between items-center">
      <span className="block h-0.5 w-full bg-white" />
      <span className="block h-0.5 w-full bg-white" />
      <span className="block h-0.5 w-full bg-white" />
    </button>
  );
};

export default Hamburger;
