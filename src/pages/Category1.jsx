import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const categories = [
  { name: "Men Shoes", image_url: "https://plus.unsplash.com/premium_photo-1723575625757-0fe66372fd0a?w=600&auto=format&fit=crop&q=60", path: "/men_shoes" },
  { name: "Men Fashions", image_url: "https://images.unsplash.com/photo-1549037173-e3b717902c57?w=600&auto=format&fit=crop&q=60", path: "/men_fashions" },
  { name: "Wathes & Jewelries", image_url: "https://images.unsplash.com/photo-1755621123433-688f13a2471f?q=80&w=870&auto=format&fit=crop", path: "/Jewelries" },
  { name: "Baby & Kids essentials", image_url: "https://images.unsplash.com/photo-1601925240970-98447486fcdb?w=600&auto=format&fit=crop&q=60", path: "/Babies_And_Kids_Products" },
  { name: "Furniture & Interior Design materials", image_url: "https://plus.unsplash.com/premium_photo-1670950413316-f501402ef0a7?w=600&auto=format&fit=crop&q=60", path: "/Furniture_And_Interior_design" },
  { name: "Women Fashions", image_url: "https://images.unsplash.com/photo-1627577279497-4b24bf1021b6?w=600&auto=format&fit=crop&q=60", path: "/women_fashions" },
  { name: "Fitness essentials", image_url: "https://images.unsplash.com/photo-1563387061879-ba036b025216?w=600&auto=format&fit=crop&q=60", path: "/fitness_And_Sports_servies" },
  { name: "Homes", image_url: "https://plus.unsplash.com/premium_photo-1680300960892-bd11b59b469b?w=600&auto=format&fit=crop&q=60", path: "/homes" },
  { name: "Car Brands", image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", path: "/car-brands" },
  { name: "Home Appliances", image_url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop&q=60", path: "/home-appliances" },
  { name: "Health & Beauty", image_url: "https://images.unsplash.com/photo-1625154253125-5d89afab6c7c?w=600&auto=format&fit=crop&q=60", path: "/health-and-beauties" },
  { name: "Farm products", image_url: "https://plus.unsplash.com/premium_photo-1700695638084-5f46e469e223?w=600&auto=format&fit=crop&q=60", path: "/Agriculture_And_Livestock" },
  { name: "Art & Handicrafts", image_url: "https://images.unsplash.com/photo-1695747001769-15ac88863f90?w=600&auto=format&fit=crop&q=60", path: "/Art_And_Handicrafts" },
  { name: "Video & Photography essentials", image_url: "https://plus.unsplash.com/premium_photo-1684783848153-970ef340c10b?w=600&auto=format&fit=crop&q=60", path: "/Video_And_Photography" },
  { name: "Printing & Publishing essentials", image_url: "https://plus.unsplash.com/premium_photo-1682145489846-081721a9b272?w=600&auto=format&fit=crop&q=60", path: "/Printing_And_Publishing" },
];

const Category1 = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Generate slider images only once
  const sliderImages = useMemo(() => {
    const shuffled = [...categories].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const prevSlide = () =>
    setCurrentSlide((currentSlide - 1 + sliderImages.length) % sliderImages.length);
  const nextSlide = () =>
    setCurrentSlide((currentSlide + 1) % sliderImages.length);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Slider */}
        <div className="relative w-full h-60 -mt-6 mb-6 overflow-hidden rounded-lg shadow-lg">
          {sliderImages.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(cat.path)}
              className={`absolute inset-0 w-full h-full cursor-pointer transition-all duration-1000 ease-in-out transform
                ${idx === currentSlide ? "opacity-100 z-10 scale-105" : "opacity-0 z-0 scale-95"}`}
            >
              <img
                src={`${cat.image_url}?w=1200&h=400&auto=format`}
                alt={cat.name}
                className="w-full h-full object-cover shadow-2xl rounded-lg"
              />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-3xl sm:text-4xl font-bold tracking-wider drop-shadow-2xl">
                {cat.name}
              </div>
            </div>
          ))}

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white text-4xl p-4 rounded-full hover:bg-black/70 shadow-lg z-20"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white text-4xl p-4 rounded-full hover:bg-black/70 shadow-lg z-20"
          >
            ›
          </button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-2xl cursor-pointer overflow-hidden transform transition-transform duration-300 hover:scale-105 z-10"
                onClick={() => navigate(cat.path)}
              >
                <img
                  src={`${cat.image_url}?w=400&h=300&auto=format`}
                  alt={cat.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="px-2 py-1">
                  <h6 className="text-md font-semibold text-gray-800 m-0">
                    {cat.name}
                  </h6>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No categories found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category1;
