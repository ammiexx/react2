import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import Nearby from './Nearby';
// fashion was replaced by Men Shoes
// electronic-materials was replaced by Men Clothes
//tatue and piercing changed to womens clothes
//book and sanitation deleted
const categories = [
  {
    name: 'Men Shoes',
    image_url: 'https://plus.unsplash.com/premium_photo-1723575625757-0fe66372fd0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVuJTIwc2hvZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/men_shoes',
  },
  {
    name: ' Men Fashions',
    image_url: 'https://images.unsplash.com/photo-1549037173-e3b717902c57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVuJTIwY2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/men_fashions',
  },
   {
    name: 'Wathes & Jewelries',
    image_url: 'https://images.unsplash.com/photo-1755621123433-688f13a2471f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    path: '/Jewelries',
  },
  
   {
    name: 'Baby & Kids essentials',
    image_url: 'https://images.unsplash.com/photo-1744424751775-63a0bae32a21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhYnklMjBhbmQlMjBraWRzJTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    path: '/Babies_And_Kids_Products',
  },
  {
    name: 'Furniture & Interior Design materials',
    image_url: 'https://plus.unsplash.com/premium_photo-1670950413316-f501402ef0a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnVybml0dXJlJTIwYW5kJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D',
    path: '/Furniture_And_Interior_design',
  },
  {
    name: 'Women Fashions',
    image_url: 'https://plus.unsplash.com/premium_photo-1665454931497-1355f79c5f4d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGF0dWVzfGVufDB8fDB8fHww',
    path: '/women_fashions',
  },
  {
    name: 'Fitness essentials',
    image_url: 'https://images.unsplash.com/photo-1563387061879-ba036b025216?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3ltJTIwbWF0ZXJpYWxzfGVufDB8fDB8fHww',
    path: '/fitness_And_Sports_servies',
  },
  
  {
    name: 'Homes',
    image_url: 'https://plus.unsplash.com/premium_photo-1680300960892-bd11b59b469b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/homes',
  },
  {
    name: 'Car Brands',
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    path: '/car-brands',
  },
  
  {
    name: 'Home Appliances',
    image_url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGFwcGxpYW5jZXN8ZW58MHx8MHx8fDA%3D',
    path: '/home-appliances',
  },
  {
    name: 'Health & Beauty',
    image_url: 'https://images.unsplash.com/photo-1742201949674-a5084b01418c',
    path: '/health-and-beauties',
  },
 
 
  
  {
    name: 'Farm products',
    image_url: 'https://plus.unsplash.com/premium_photo-1700695638084-5f46e469e223?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFybSUyMHByb2R1Y3RzfGVufDB8fDB8fHww',
    path: '/Agriculture_And_Livestock',
  },
 
 
  {
    name: 'Art & Handicrafts',
    image_url: 'https://images.unsplash.com/photo-1695747001769-15ac88863f90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFydCUyMGFuZCUyMGhhbmRpY3JhZnRzfGVufDB8fDB8fHww',
    path: '/Art_And_Handicrafts',
  },
  {
    name: 'Video & Photography essentials',
    image_url: 'https://plus.unsplash.com/premium_photo-1684783848153-970ef340c10b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmlkZW8lMjBhbmQlMjBwaG90b2dyYXBoaWVzfGVufDB8fDB8fHww',
    path: '/Video_And_Photography',
  },
  
  {
    name: 'Printing & Publishing essentials',
    image_url: 'https://plus.unsplash.com/premium_photo-1682145489846-081721a9b272?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJpbnRpbmclMjBhbmQlMjBwdWJsaXNoaW5nfGVufDB8fDB8fHww',
    path: '/Printing_And_Publishing',
  },
];

const Category1 = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [displayText, setDisplayText] = useState('');
  const message = "Welcome to our shopping marketplace";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < message.length) {
        setDisplayText((prev) => prev + message.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mt-2 mb-1">
          <h6 className="text-base font-medium text-gray-700">Explore More Products</h6>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow hover:shadow-md cursor-pointer overflow-hidden transition"
                onClick={() => navigate(cat.path)}
              >
                <img
                  src={`${cat.image_url}?w=400&h=300&auto=format`}
                  alt={cat.name}
                  className="w-full h-40 object-cover rounded-md transform transition-transform duration-300 hover:scale-105"
                />
                <div className="px-2 py-0">
  <h6 className="text-md font-semibold text-gray-800 m-0">{cat.name}</h6>
</div>

              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category1;
