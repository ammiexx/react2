import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
const categories = [
  { name: 'Food & Beverages', image_url: 'https://images.unsplash.com/photo-1614207279966-a46c93c0fbc2?w=600&auto=format&fit=crop&q=60', path: '/food-and-beverages' },
  { name: 'Events & Weddings services', image_url: 'https://images.unsplash.com/photo-1754149155224-24d7042ec22e', path: '/events-and-weddings' },
  { name: 'Entertainments', image_url: 'https://plus.unsplash.com/premium_photo-1683129679874-15966b2c1fdc?w=600&auto=format&fit=crop&q=60', path: '/entertainments' },
  { name: 'Travel services', image_url: 'https://images.unsplash.com/photo-1754244774117-a27304d47959', path: '/travels' },
  { name: 'Repair And Maintenance products', image_url: 'https://plus.unsplash.com/premium_photo-1750449864279-341157c41bc8?q=80&w=870&auto=format', path: '/Repair_and_maintenace' },
  { name: 'Vidoes & Games products', image_url: 'https://plus.unsplash.com/premium_photo-1664910795422-527440cfce2d?w=600&auto=format&fit=crop&q=60', path: '/Toys_And_Games' },
  { name: 'Finance & Insurances services', image_url: 'https://plus.unsplash.com/premium_photo-1661436432458-f7ca1a171410?w=600&auto=format&fit=crop&q=60', path: '/Finance_And_Insurances' },
  { name: 'Pet Supplies And Services', image_url: 'https://plus.unsplash.com/premium_photo-1663133568320-97c8c0d0c4ba?w=600&auto=format&fit=crop&q=60', path: '/Pet_Supplies_And_Services' },
  { name: 'Medical And Pharmaceutical services', image_url: 'https://plus.unsplash.com/premium_photo-1666299175827-59ca81fb2666?w=600&auto=format&fit=crop&q=60', path: '/Medical_And_Pharmaceuticals' },
  { name: 'Logistics And Delivery Services', image_url: 'https://images.unsplash.com/photo-1754765542024-c1320f23b75a?w=600&auto=format&fit=crop&q=60', path: '/Logistics_And_Delivery_Services' },
  { name: 'Consultancy Services', image_url: 'https://images.unsplash.com/photo-1565688527174-775059ac429c?w=600&auto=format&fit=crop&q=60', path: '/legal_And_Consultancy_Services' },
  { name: 'Cleaning And Sanitation materials', image_url: 'https://images.unsplash.com/photo-1579141132886-e86d831034ac?w=600&auto=format&fit=crop&q=60', path: '/Cleaning_And_Sanitation_Services' },
  { name: 'Telecom Services', image_url: 'https://images.unsplash.com/photo-1697097156924-de4efa72afc8?w=600&auto=format&fit=crop&q=60', path: '/Telecome_Services' },
  { name: 'Software & IT Services', image_url: 'https://images.unsplash.com/photo-1598316560453-0246d4611979?w=600&auto=format&fit=crop&q=60', path: '/SoftWare_And_IT_Services' },
  { name: 'Digital Security services', image_url: 'https://images.unsplash.com/photo-1639503547276-90230c4a4198?w=600&auto=format&fit=crop&q=60', path: '/Security_Services' },
  { name: 'Automotive Services', image_url: 'https://plus.unsplash.com/premium_photo-1661299233465-ad4268ddb448?w=600&auto=format&fit=crop&q=60', path: '/Automotive_Services' },
  { name: 'Elderly & Nursing Services', image_url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&auto=format&fit=crop&q=60', path: '/Elderly_And_Nursing_Services' },
  { name: 'Rental Services', image_url: 'https://plus.unsplash.com/premium_photo-1661761197559-58493b11151b?w=600&auto=format&fit=crop&q=60', path: '/Rental_Services' },
];
const Category2 = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Pick 5 random slider images once
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
