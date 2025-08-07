import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categoryhawassa.css';

const Categoryhawassa = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      name: 'fashions',
      image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      path: '/fashions',
    },
    {
      name: 'Computers & Electronics',
      image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      path: '/electronics',
    },
    {
      name: 'Real Estates',
      image_url: 'https://images.unsplash.com/photo-1752407828488-1c6fafa47c50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D',
      path: '/real-estates',
    },
    {
      name: 'Car Brands',
      image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      path: '/car-brands',
    },
    {
      name: 'Food & Drinks',
      image_url: 'https://images.unsplash.com/photo-1498579809087-ef1e558fd1da',
      path: '/food-drinks',
    },
    {
      name: 'Home and appliances',
      image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      path: '/home-appliances',
    },
    {
      name: 'Health & Beauty',
      image_url: 'https://images.unsplash.com/photo-1742201949674-a5084b01418c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
      path: '/health-beauty',
    },
    {
      name: 'Event & Weddings',
      image_url: 'https://images.unsplash.com/photo-1754149155224-24d7042ec22e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3Mnx8fGVufDB8fHx8fA%3D%3D',
      path: '/event-weddings',
    },
    {
      name: 'Entertainment',
      image_url: 'https://images.unsplash.com/photo-1754244774117-a27304d47959?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3NXx8fGVufDB8fHx8fA%3D%3D',
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

export default Categoryhawassa;
