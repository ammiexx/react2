import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: 'Fashions',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
    path: '/fashions',
  },
  {
    name: 'Computers & Electronics',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    path: '/electronic-materials',
  },
  {
    name: 'Homes',
    image_url: 'https://images.unsplash.com/photo-1752407828488-1c6fafa47c50',
    path: '/homes',
  },
  {
    name: 'Car Brands',
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    path: '/car-brands',
  },
  {
    name: 'Food & Beverages',
    image_url: 'https://images.unsplash.com/photo-1498579809087-ef1e558fd1da',
    path: '/food-and-beverages',
  },
  {
    name: 'Home and Appliances',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
    path: '/home-appliances',
  },
  {
    name: 'Health & Beauty',
    image_url: 'https://images.unsplash.com/photo-1742201949674-a5084b01418c',
    path: '/health-and-beauties',
  },
  {
    name: 'Events & Weddings',
    image_url: 'https://images.unsplash.com/photo-1754149155224-24d7042ec22e',
    path: '/events-and-weddings',
  },
  {
    name: 'Entertainments',
    image_url: 'https://images.unsplash.com/photo-1754244774117-a27304d47959',
    path: '/entertainments',
  },
  {
    name: 'Travels',
    image_url: 'https://images.unsplash.com/photo-1754244774117-a27304d47959',
    path: '/travels',
  },
];

// 10 brands
const allBrands = [
  // { id: 'b1', name: 'Ovid real estate (10% off)', logo: 'https://th.bing.com/th/id/ODLS.A2450BEC-5595-40BA-9F13-D9EC6AB74B9F?w=32&h=32&qlt=90&pcl=fffffa&o=6&cb=thwsc4&pid=1.2', website: 'https://ovid-realestates.com/' },
  // { id: 'b2', name: 'Skyshine (20% off)', logo: 'https://assets.perfectdomain.com/_domainphoto/c/3/2/9/c3292bd0db3ac907585f47a0054182d5_l.jpg', website: 'https://www.samsung.com' },
  // { id: 'b3', name: 'Nike (20% off)', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', website: 'https://www.nike.com' },
  // { id: 'b4', name: 'Sony(10% off)', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Sony_Logo.svg', website: 'https://www.sony.com' },
  // { id: 'b5', name: 'Adidas(10% off)', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', website: 'https://www.adidas.com' },

];

const Category1 = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const firstRowBrands = allBrands.slice(firstRowIndex, firstRowIndex + 5);
  const [secondRowIndex, setSecondRowIndex] = useState(5);
  const secondRowBrands = allBrands.slice(secondRowIndex, secondRowIndex + 5);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
       
       
        {/* Explore More Products Heading */}
<div className="text-center mt-4 mb-2">
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
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
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
