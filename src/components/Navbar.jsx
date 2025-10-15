import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NavLink, Link } from "react-router-dom";
import { useScrollDirection } from "./UseScrollDirection";
import Searching from "./Searching";
import knash from "../assets/lgo.png";
import { useClerk, useUser } from "@clerk/clerk-react";
const navigation = [
  { name: "Shops", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Nearby Shops", href: "/nearby-shops" },
  { name: "Add Post", href: "/form" },
];

export default function Navigation({ products, onFilter }) {
  const scrollDirection = useScrollDirection();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);
  const isHidden = scrollDirection === "down" && !drawerOpen && !mobileSearchOpen;

  const { signOut, isSignedIn } = useClerk();
  const { user } = useUser();


  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        closeDrawer();
      }
    };
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`sticky top-0 z-50 bg-gray-800 will-change-transform transition-transform
        ${isHidden ? "-translate-y-full pointer-events-none duration-300" : "translate-y-0 pointer-events-auto duration-150"}`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-13 items-center justify-between gap-2">
            
          <div className="hidden sm:flex items-center flex-shrink-0">
  <Link to="/">
   <img src={knash} alt="Knash Logo" className="h-[50px] w-[100px]" />


  </Link>
</div>
            <div className="flex-1 flex items-center justify-between sm:hidden px-2">
              {!mobileSearchOpen && (
                <>
                  
                  <NavLink
                    to="/services"
                    className="text-gray-200 hover:text-white px-2 py-1 text-sm font-medium rounded-md"
                  >
                    Services
                  </NavLink>

                  <NavLink
                    to="/nearby-shops"
                    className="text-gray-200 hover:text-white px-2 py-1 text-sm font-medium rounded-md"
                  >
                    Nearby
                  </NavLink>

                 

                  {/* Search icon */}
                  <button
                    onClick={() => setMobileSearchOpen(true)}
                    className="p-2 text-gray-200 hover:text-white"
                  >
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  </button>
                   {/* Hamburger */}
                  <button
                    onClick={toggleDrawer}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    {drawerOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                  </button>
                </>
              )}

             {mobileSearchOpen && (
  <div className="flex-1 flex items-center gap-2">
    <Searching
      products={products}
      onFilter={onFilter}
      onSubmit={() => setMobileSearchOpen(false)}
    />
    {/* Close button */}
    <button
      onClick={() => setMobileSearchOpen(false)}
      className="p-2 text-gray-200 hover:text-white"
    >
      <XMarkIcon className="h-6 w-6" />
    </button>
  </div>
)}

            </div>
            <div className="hidden sm:flex items-center gap-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Desktop search */}
            <div className="hidden sm:block flex-1">
              <Searching products={products} onFilter={onFilter} />
            </div>
  {!mobileSearchOpen && (
  <>
    {!isSignedIn ? (
      <Link
        to="/login"
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700 transition"
      >
        Sign Up
      </Link>
    ) : (
      <div className="flex items-center gap-2">
        <span className="text-sm">Hi, {user.firstName}</span>
      </div>
    )}
  </>
)}


          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER MENU */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={closeDrawer}
        />
      )}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-screen w-72 bg-gray-900 text-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Links */}
        <div className="p-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={closeDrawer}
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-800 hover:text-white"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
