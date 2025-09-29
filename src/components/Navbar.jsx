import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NavLink, Link } from "react-router-dom";
import { useScrollDirection } from "./UseScrollDirection";
import Searching from "./Searching";
import knash from "../assets/lgo.png";

const navigation = [
  { name: "Order Now", href: "/forsale" },
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
      {/* TOP NAV */}
      <nav
        className={`sticky top-0 z-50 transition-transform duration-300 bg-gray-800 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-15 items-center justify-between gap-2">
            
            {/* LEFT: Logo */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center">
                <img
                  src={knash}
                  alt="Kenash Logo"
                  className="h-11 w-25 rounded-full object-cover"
                />
              </Link>
            </div>

            {/* CENTER: Mobile search + services */}
            <div className="flex-1 flex items-center justify-end gap-2 sm:hidden">
              {/* Services and Nearby Shops for mobile */}
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

              {/* Search button or inline input */}
              {!mobileSearchOpen ? (
                <button
                  onClick={() => setMobileSearchOpen(true)}
                  className="p-2 text-gray-200 hover:text-white"
                >
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
              ) : (
                <div className="flex-1">
                  <Searching
                    products={products}
                    onFilter={onFilter}
                    onSubmit={() => setMobileSearchOpen(false)}
                  />
                </div>
              )}

              {/* Hamburger */}
              <button
                onClick={toggleDrawer}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white"
              >
                {drawerOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* RIGHT: Desktop links */}
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
        {/* Drawer Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={closeDrawer}>
            <XMarkIcon className="h-6 w-6 text-gray-300" />
          </button>
        </div>

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
