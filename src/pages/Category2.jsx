import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import food from "../assets/images/food.png";
import wedding from "../assets/images/wedding.png";
import entertainment from "../assets/images/entertainment.png";
import travel from "../assets/images/travel.png";
import repair from "../assets/images/repair.png";
import video from "../assets/images/video games.png";
import finance from "../assets/images/finance.png";
import pet from "../assets/images/pet.png";
import medical from "../assets/images/medical.png";
import supply from "../assets/images/supply.png";
import consultancy from "../assets/images/consultancy.png";
import sanitation from "../assets/images/sanitation.png";
import telecom from "../assets/images/telecom.png";
import software from "../assets/images/software.png";
import security from "../assets/images/security.png";
import automotive from "../assets/images/automotive.png";
import nursing from "../assets/images/nursing.png";

const categories = [
  { name: 'Food & Beverages', image_url: food, path: '/food-and-beverages' },
  { name: 'Events & Weddings services', image_url: wedding, path: '/events-and-weddings' },
  { name: 'Entertainments', image_url: entertainment, path: '/entertainments' },
  { name: 'Travel services', image_url: travel, path: '/travels' },
  { name: 'Repair And Maintenance products', image_url: repair, path: '/Repair_and_maintenance' },
  { name: 'Videos & Games products', image_url: video, path: '/Toys_And_Games' },
  { name: 'Finance & Insurances services', image_url: finance, path: '/Finance_And_Insurances' },
  { name: 'Pet Supplies And Services', image_url: pet, path: '/Pet_Supplies_And_Services' },
  { name: 'Medical And Pharmaceutical services', image_url: medical, path: '/Medical_And_Pharmaceuticals' },
  { name: 'Logistics And Delivery Services', image_url: supply, path: '/Logistics_And_Delivery_Services' },
  { name: 'Consultancy Services', image_url: consultancy, path: '/legal_And_Consultancy_Services' },
  { name: 'Cleaning And Sanitation materials', image_url: sanitation, path: '/Cleaning_And_Sanitation_Services' },
  { name: 'Telecom Services', image_url: telecom, path: '/Telecome_Services' },
  { name: 'Software & IT Services', image_url: software, path: '/SoftWare_And_IT_Services' },
  { name: 'Digital Security services', image_url: security, path: '/Security_Services' },
  { name: 'Automotive Services', image_url: automotive, path: '/Automotive_Services' },
  { name: 'Elderly & Nursing Services', image_url: nursing, path: '/Elderly_And_Nursing_Services' },
];
const Category2 = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderImages] = useState(categories.sort(() => 0.5 - Math.random()).slice(0, 5));
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliderImages.length);
    }, 4000); // change slide every 5s
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
              className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-1000 ease-in-out
                ${idx === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
            >
              <img
                src={`${cat.image_url}?w=1200&h=400&auto=format`}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-3xl sm:text-4xl font-bold tracking-wider drop-shadow-lg">
                {cat.name}
              </div>
            </div>
          ))}

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white text-4xl p-4 rounded-full hover:bg-black/70 shadow-lg z-30"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white text-4xl p-4 rounded-full hover:bg-black/70 shadow-lg z-30"
          >
            ›
          </button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden transition transform duration-300 hover:scale-105"
                onClick={() => navigate(cat.path)}
              >
                <img
                  src={`${cat.image_url}?w=400&h=300&auto=format`}
                  alt={cat.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="px-2 py-1">
                  <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                    {cat.name}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No services found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category2;
