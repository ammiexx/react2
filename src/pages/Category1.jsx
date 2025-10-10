import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

import appliance from "../assets/images/appliances.png";
import men from "../assets/images/men.png";
import women from "../assets/images/women.png";
import kids from "../assets/images/kids.png";
import furniture from "../assets/images/furniture.png";
import fitness from "../assets/images/fitness.png";
import home from "../assets/images/home.png";
import car from "../assets/images/car.png";
import beauty from "../assets/images/beauty.png";
import farm from "../assets/images/farm.png";
import art from "../assets/images/art.png";
import photo from "../assets/images/photo.png";
import print from "../assets/images/printing.png";
import jewelries from "../assets/images/watches.png";

const categories = [
  { name: "Men Fashions", image_url: men, path: "/men_shoes" },
  { name: "Watches & Jewelries", image_url: jewelries, path: "/jewelries" },
  { name: "Baby & Kids essentials", image_url: kids, path: "/Babies_And_Kids_Products" },
  { name: "Furniture & Interior Design materials", image_url: furniture, path: "/Furniture_And_Interior_design" },
  { name: "Women Fashions", image_url: women, path: "/women_fashions" },
  { name: "Fitness essentials", image_url: fitness, path: "/fitness_And_Sports_servies" },
  { name: "Homes", image_url: home, path: "/homes" },
  { name: "Car Brands", image_url: car, path: "/car-brands" },
  { name: "Home Appliances", image_url: appliance, path: "/home-appliances" },
  { name: "Health & Beauty", image_url: beauty, path: "/health-and-beauties" },
  { name: "Farm products", image_url: farm, path: "/Agriculture_And_Livestock" },
  { name: "Art & Handicrafts", image_url: art, path: "/Art_And_Handicrafts" },
  { name: "Video & Photography essentials", image_url: photo, path: "/Video_And_Photography" },
  { name: "Printing & Publishing essentials", image_url: print, path: "/Printing_And_Publishing" },
];

const Category1 = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Generate slider images once
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
                src={cat.image_url}
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
                  src={cat.image_url}
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
