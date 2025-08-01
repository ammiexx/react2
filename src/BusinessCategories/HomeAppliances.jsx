import React, { useState } from 'react';
import './HomeAppliances.css';

const homeItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90',
    category: 'Kitchen Appliances',
    description: 'Refrigerators, ovens, blenders, and cookware from trusted brands.',
    brands: 'KitchenAid, Bosch, Samsung, Tefal',
    delivery: 'Home delivery + installation',
    rating: '4.7/5',
    link: 'https://www.kitchenaid.com',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1586023492122-0b9f31a134e9',
    category: 'Furniture',
    description: 'Sofas, beds, tables, and storage units in modern and classic styles.',
    brands: 'Ikea, West Elm, Ashley, Herman Miller',
    delivery: 'Assembly & delivery service',
    rating: '4.6/5',
    link: 'https://www.ikea.com',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1505692794400-9a0b2b2933a4',
    category: 'Home Decor',
    description: 'Artworks, rugs, cushions, vases, wall décor to accentuate your style.',
    brands: 'Pottery Barn, Crate & Barrel, Anthropologie',
    delivery: 'Same-day pickup & shipping',
    rating: '4.8/5',
    link: 'https://www.potterybarn.com',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1581579187053-ace89adb171f',
    category: 'Cleaning Supplies',
    description: 'Eco‑friendly detergents, vacuum cleaners, microfiber cloths, and more.',
    brands: 'Method, Dyson, Clorox, Seventh Generation',
    delivery: 'Scheduled delivery available',
    rating: '4.7/5',
    link: 'https://www.dyson.com',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1582719478187-0e6d7c8a0e90',
    category: 'Lighting & Electricals',
    description: 'LED bulbs, smart switches, fans, and ambient lighting fixtures.',
    brands: 'Philips Hue, GE, Lutron, Xiaomi',
    delivery: 'Free installation option in select areas',
    rating: '4.9/5',
    link: 'https://www.philips-hue.com',
  },
];

const HomeAppliances = () => {
  const [showDetail, setShowDetail] = useState({});

  const toggleDetail = (id) => {
    setShowDetail((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="homeappliances-page">
      <h2 className="homeappliances-title">🧰 Home & Appliances Essentials</h2>
      <div className="homeappliances-list">
        {homeItems.map((item) => (
          <div className="homeappliances-card" key={item.id}>
            <img
              src={item.image}
              alt={item.category}
              className="homeappliances-image"
            />
            <h3>{item.category}</h3>
            <p><strong>Brands:</strong> {item.brands}</p>
            <p><strong>Delivery:</strong> {item.delivery}</p>
            <p><strong>Rating:</strong> {item.rating}</p>

            {showDetail[item.id] && (
              <p className="description">📝 {item.description}</p>
            )}

            <div className="buttons">
              <button onClick={() => toggleDetail(item.id)}>
                {showDetail[item.id] ? 'Hide Details' : 'View Details'}
              </button>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Explore Products
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAppliances;
