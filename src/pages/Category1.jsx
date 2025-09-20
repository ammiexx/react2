import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import Nearby from './Nearby';

const categories = [
  {
    name: 'Fashions',
    image_url: 'https://images.unsplash.com/photo-1605581494291-317cf1f77ddf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/fashions',
  },
  {
    name: 'Computers & Electronics',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    path: '/electronic-materials',
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
    name: 'Home and Appliances',
    image_url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGFwcGxpYW5jZXN8ZW58MHx8MHx8fDA%3D',
    path: '/home-appliances',
  },
  {
    name: 'Health & Beauty',
    image_url: 'https://images.unsplash.com/photo-1742201949674-a5084b01418c',
    path: '/health-and-beauties',
  },
 
 
  
  {
    name: 'Agriculture And Livestock products',
    image_url: 'https://plus.unsplash.com/premium_photo-1667860234741-0e500d0e5ba5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWdyaWN1bHR1cmUlMjBhbmQlMjBsaXZlc3RvY2slMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
    path: '/Agriculture_And_Livestock',
  },
  {
    name: 'Books & Stationaries materials',
    image_url: 'https://plus.unsplash.com/premium_photo-1733864775808-c7c1ccbe5422?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3MlMjBhbmQlMjBzdGF0aW9uYXJpZXN8ZW58MHx8MHx8fDA%3D',
    path: '/Books_And_Stationaries',
  },
 
  {
    name: 'Jewelry products',
    image_url: 'https://images.unsplash.com/photo-1631698532383-97ffe7c223c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amV3ZWxlcmllc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/Jewelries',
  },
  
  {
    name: 'Baby & Kids Products',
    image_url: 'https://images.unsplash.com/photo-1744424751775-63a0bae32a21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhYnklMjBhbmQlMjBraWRzJTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    path: '/Babies_And_Kids_Products',
  },
 
  {
    name: 'Cleaning And Sanitation materials',
    image_url: 'https://images.unsplash.com/photo-1579141132886-e86d831034ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xlYW5pbmclMjBhbmQlMjBzYW5pdGF0aW9uJTIwc2VydmljZXN8ZW58MHx8MHx8fDA%3D',
    path: '/Cleaning_And_Sanitation_Services',
  },
 
  {
    name: 'Art & Handicrafts',
    image_url: 'https://images.unsplash.com/photo-1695747001769-15ac88863f90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFydCUyMGFuZCUyMGhhbmRpY3JhZnRzfGVufDB8fDB8fHww',
    path: '/Art_And_Handicrafts',
  },
  {
    name: 'Video & Photography materials',
    image_url: 'https://plus.unsplash.com/premium_photo-1684783848153-970ef340c10b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmlkZW8lMjBhbmQlMjBwaG90b2dyYXBoaWVzfGVufDB8fDB8fHww',
    path: '/Video_And_Photography',
  },
  {
    name: 'Furniture & Interior Design materials',
    image_url: 'https://plus.unsplash.com/premium_photo-1670950413316-f501402ef0a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnVybml0dXJlJTIwYW5kJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D',
    path: '/Furniture_And_Interior_design',
  },
 
 
  
  {
    name: 'Printing & Publishing materials',
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
        <div className="text-center mt-4 mb-4">
          <h2 className="text-base font-medium text-gray-700">Explore More Products</h2>
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
                <div className="px-2">
                  <h3 className="text-md font-semibold text-gray-800">{cat.name}</h3>
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
