import React, { useState } from 'react';
import './HealthBeauty.css';

const healthBeautyItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600180758890-b0d93ec9d43e',
    category: 'Skincare',
    description: 'Cleansers, moisturizers, serums, and sunblocks for all skin types.',
    brands: 'The Ordinary, Cetaphil, La Roche-Posay, Neutrogena',
    delivery: 'Free skincare consultations available',
    rating: '4.9/5',
    link: 'https://www.sephora.com',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1616827982255-d1d4ec21aa1e',
    category: 'Haircare',
    description: 'Shampoos, conditioners, treatments, and styling products.',
    brands: 'Olaplex, Pantene, Redken, L’Oréal',
    delivery: 'Same-day delivery in select cities',
    rating: '4.7/5',
    link: 'https://www.ulta.com',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1587582423112-e4fdf62b6dde',
    category: 'Cosmetics & Makeup',
    description: 'Foundations, lipsticks, palettes, and beauty tools for all looks.',
    brands: 'MAC, Fenty, Maybelline, NYX',
    delivery: 'Gift packaging available',
    rating: '4.8/5',
    link: 'https://www.beautybay.com',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1597932818301-ea13c38f15c1',
    category: 'Health Supplements',
    description: 'Vitamins, minerals, protein powders, and herbal supplements.',
    brands: 'GNC, Centrum, Nature Made, Optimum Nutrition',
    delivery: 'Monthly subscriptions & discounts',
    rating: '4.6/5',
    link: 'https://www.vitacost.com',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1615996001375-3ce6c750f27c',
    category: 'Personal Care Devices',
    description: 'Massagers, facial rollers, hair dryers, and electric toothbrushes.',
    brands: 'Foreo, Philips, Oral-B, Revlon',
    delivery: '1-year warranty on all devices',
    rating: '4.8/5',
    link: 'https://www.amazon.com/personal-care',
  },
];

const HealthBeauty = () => {
  const [openDetail, setOpenDetail] = useState({});

  const toggleDetail = (id) => {
    setOpenDetail((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="healthbeauty-page">
      <h2 className="healthbeauty-title">💆‍♀️ Health & Beauty Essentials</h2>
      <div className="healthbeauty-list">
        {healthBeautyItems.map((item) => (
          <div className="healthbeauty-card" key={item.id}>
            <img src={item.image} alt={item.category} className="healthbeauty-image" />
            <h3>{item.category}</h3>
            <p><strong>Brands:</strong> {item.brands}</p>
            <p><strong>Delivery:</strong> {item.delivery}</p>
            <p><strong>Rating:</strong> {item.rating}</p>

            {openDetail[item.id] && (
              <p className="description">📝 {item.description}</p>
            )}

            <div className="buttons">
              <button onClick={() => toggleDetail(item.id)}>
                {openDetail[item.id] ? 'Hide Info' : 'More Info'}
              </button>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthBeauty;
