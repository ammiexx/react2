import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categorypiyasa.css';

const Categorypiyasa= () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      name: 'fashions',
      image_url: 'https://www.bing.com/th/id/OIP.E-vHzjnOSMbAxQYQrKleOwHaLG?w=160&h=211&c=8&rs=1&qlt=90&o=6&cb=thwsc4&dpr=1.8&pid=3.1&rm=2',
      path: '/fashions',
    },
    {
      name: 'Computers & Electronics',
      image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      path: '/electronics',
    },
    {
      name: 'Real Estates',
      image_url: 'https://tse4.mm.bing.net/th/id/OIP.Fun3wrXk25N4JxXl5Kl2LgHaFD?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      path: '/real-estates',
    },
    {
      name: 'Car Brands',
      image_url: 'https://tse1.mm.bing.net/th/id/OIP.B89JFviebUWHqx55l28wEQHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      path: '/car-brands',
    },
    {
      name: 'Food & Drinks',
      image_url: 'https://www.myenglishlanguage.com/wp-content/uploads/2018/06/cheese-wine.jpg',
      path: '/food-drinks',
    },
    {
      name: 'Home and appliances',
      image_url: 'https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      path: '/home-appliances',
    },
    {
      name: 'Health & Beauty',
      image_url: 'https://images.unsplash.com/photo-1620905969379-74c206d60543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoJTIwYW5kJTIwYmVhdXR5fGVufDB8fDB8fHww',
      path: '/health-beauty',
    },
    {
      name: 'Event & Weddings',
      image_url: 'https://images.unsplash.com/photo-1754149155224-24d7042ec22e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3Mnx8fGVufDB8fHx8fA%3D%3D',
      path: '/event-weddings',
    },
    {
      name: 'Entertainment',
      image_url: 'https://plus.unsplash.com/premium_photo-1702249257777-927e3857a56b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW50ZXJ0YWltZW50c3xlbnwwfHwwfHx8MA%3D%3D',
      path: '/entertainments',
    },
    // Add more categories as needed
  ];

  // Filter categories based on the search term
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="category-container">
      
      <form className="search-form" onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search your category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="category-search-input"
        />
      </form>

      <div className="category-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, idx) => (
            <div
              key={idx}
              className="category-card"
              onClick={() => navigate(cat.path)}
              style={{ cursor: 'pointer' }}
            >
              <img src={`${cat.image_url}?w=400&h=300&auto=format`} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default Categorypiyasa;
