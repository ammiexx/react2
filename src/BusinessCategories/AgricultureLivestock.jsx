import React, { useState } from 'react';
import './AgricultureLivestock.css';

const agriItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6', // farming equipment
    category: 'Farming Equipment',
    description: 'Durable tractors, plows, and harvesters designed to optimize your farming operations.',
    providers: 'John Deere, Kubota, Case IH',
    availability: 'In Stock',
    rating: '4.7/5',
    link: 'https://www.deere.com/',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // seeds & fertilizers
    category: 'Seeds & Fertilizers',
    description: 'High-quality seeds and organic fertilizers to maximize crop yield and soil health.',
    providers: 'Bayer Crop Science, Syngenta, Scotts',
    availability: 'Available Now',
    rating: '4.6/5',
    link: 'https://www.bayer.com/en/',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1542444459-abe08a98d2b2', // animal feed
    category: 'Animal Feed',
    description: 'Nutritious and balanced feed options for cattle, poultry, and other livestock.',
    providers: 'Cargill, Purina, Nutreco',
    availability: 'In Stock',
    rating: '4.8/5',
    link: 'https://www.cargill.com/',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1564518098551-7e5bc2b9f8a6', // live animals
    category: 'Live Animals (Cattle, Poultry)',
    description: 'Healthy livestock including cattle and poultry available for sale and breeding purposes.',
    providers: 'Local Farms & Breeders',
    availability: 'Limited Stock',
    rating: '4.5/5',
    link: '#',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4', // veterinary supplies
    category: 'Veterinary Supplies',
    description: 'Essential medical supplies and equipment to care for your livestock’s health and wellbeing.',
    providers: 'Zoetis, Merck Animal Health, Boehringer Ingelheim',
    availability: 'In Stock',
    rating: '4.9/5',
    link: 'https://www.zoetis.com/',
  },
];

const AgricultureLivestock = () => {
  const [openDetail, setOpenDetail] = useState({});

  const toggleDetail = (id) => {
    setOpenDetail((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="agri-page">
      <h2 className="agri-title">🐮 Agriculture & Livestock</h2>
      <div className="agri-list">
        {agriItems.map((item) => (
          <div className="agri-card" key={item.id}>
            <img
              src={item.image + '?auto=format&fit=crop&w=400&q=80'}
              alt={item.category}
              className="agri-image"
            />
            <h3>{item.category}</h3>
            <p><strong>Providers:</strong> {item.providers}</p>
            <p><strong>Availability:</strong> {item.availability}</p>
            <p><strong>Rating:</strong> {item.rating}</p>

            {openDetail[item.id] && (
              <p className="description">📝 {item.description}</p>
            )}

            <div className="buttons">
              <button onClick={() => toggleDetail(item.id)}>
                {openDetail[item.id] ? 'Hide Info' : 'More Info'}
              </button>
              {item.link !== '#' && (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgricultureLivestock;
