import React, { useState } from 'react';
import './Electronic.css';

const electronicsItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1587202372775-9897a1a0b1fb',
    category: 'Laptops & Desktops',
    description: 'From high-end gaming laptops to budget-friendly desktops for work and school.',
    featuredBrands: 'Apple, Dell, HP, ASUS',
    warranty: '1-3 Years Manufacturer Warranty',
    rating: '4.8/5',
    link: 'https://www.newegg.com/Laptops',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1611186871348-b2f81c92a3a7',
    category: 'Mobile Phones & Accessories',
    description: 'Latest smartphones, cases, chargers, power banks, and screen protectors.',
    featuredBrands: 'Samsung, Apple, OnePlus, Xiaomi',
    warranty: '12 Months Warranty on Devices',
    rating: '4.7/5',
    link: 'https://www.amazon.com/Mobile-Accessories',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1585386959984-a41552263f2f',
    category: 'Cameras & Audio',
    description: 'DSLRs, mirrorless cameras, action cams, mics, and surround sound systems.',
    featuredBrands: 'Canon, Sony, Nikon, Bose',
    warranty: 'Authorized Dealer Warranty',
    rating: '4.6/5',
    link: 'https://www.bhphotovideo.com',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    category: 'Gadgets & Wearables',
    description: 'Smartwatches, fitness bands, VR headsets, and compact smart devices.',
    featuredBrands: 'Fitbit, Apple, Garmin, Meta',
    warranty: '30-Day Return Policy',
    rating: '4.9/5',
    link: 'https://www.bestbuy.com',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1581090700227-1c1dbfafaa88',
    category: 'Repair & Support Services',
    description: 'Certified electronics repair, data recovery, and on-site IT support.',
    featuredBrands: 'uBreakiFix, Geek Squad, CPR Repair',
    warranty: 'Service Warranty up to 6 Months',
    rating: '5.0/5',
    link: 'https://www.ubreakifix.com',
  },
];

const Electronic = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="electronics-page">
      <h2 className="electronics-title">💻 Explore Top Electronics & Smart Devices</h2>
      <div className="electronics-list">
        {electronicsItems.map((item) => (
          <div className="electronics-card" key={item.id}>
            <img src={item.image} alt={item.category} className="electronics-image" />
            <h3>{item.category}</h3>
            <p><strong>Brands:</strong> {item.featuredBrands}</p>
            <p><strong>Warranty:</strong> {item.warranty}</p>
            <p><strong>Rating:</strong> {item.rating}</p>

            {expanded[item.id] && (
              <p className="description">📝 {item.description}</p>
            )}

            <div className="buttons">
              <button onClick={() => toggleExpand(item.id)}>
                {expanded[item.id] ? 'Hide Info' : 'More Info'}
              </button>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Shop or Service
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronic;
