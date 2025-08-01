import React, { useState } from 'react';
import './RealEstate.css';

const realEstatePosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    category: 'Residential Properties',
    description: 'Modern family homes, villas, and townhouses in prime neighborhoods.',
    location: 'San Diego, CA',
    company: 'Pacific Realty Group',
    profile: 'https://randomuser.me/api/portraits/men/45.jpg',
    price: '$350,000 - $1.2M',
    contact: {
      phone: '123-456-7890',
      website: 'https://pacificrealty.com',
      telegram: 'https://t.me/pacificrealty',
    },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1558002038-7e498c53654b',
    category: 'Commercial Properties',
    description: 'Office buildings, retail spaces, and warehouses for growing businesses.',
    location: 'Dallas, TX',
    company: 'Texas Commercial Estates',
    profile: 'https://randomuser.me/api/portraits/women/52.jpg',
    price: '$500,000 - $5M',
    contact: {
      phone: '321-654-9870',
      website: 'https://txcommercial.com',
      telegram: 'https://t.me/txcommercial',
    },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1507738978512-35798112892c',
    category: 'Land for Sale',
    description: 'Development-ready plots and farmland for investment.',
    location: 'Montana & Idaho',
    company: 'Green Lands Group',
    profile: 'https://randomuser.me/api/portraits/men/33.jpg',
    price: '$30,000 - $750,000',
    contact: {
      phone: '987-654-3210',
      website: 'https://greenlands.com',
      telegram: 'https://t.me/greenlands',
    },
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
    category: 'Rentals (House/Apartment)',
    description: 'Studio apartments to luxury rentals in top locations.',
    location: 'New York City, NY',
    company: 'Metro Rentals Co.',
    profile: 'https://randomuser.me/api/portraits/women/27.jpg',
    price: '$1,200/mo - $6,000/mo',
    contact: {
      phone: '555-123-4567',
      website: 'https://metrorentals.com',
      telegram: 'https://t.me/metrorentals',
    },
  },
];

const RealEstate = () => {
  const [visibleContact, setVisibleContact] = useState(null);

  return (
    <div className="realestate-page">
      <h2 className="realestate-title">🏠 Explore Real Estate Opportunities</h2>
      <div className="realestate-grid">
        {realEstatePosts.map((item) => (
          <div className="realestate-card" key={item.id}>
            <img src={item.image} alt={item.category} className="realestate-image" />
            <div className="company-profile">
              <img src={item.profile} alt={item.company} className="profile-img" />
              <div>
                <h4>{item.company}</h4>
                <p className="location">{item.location}</p>
              </div>
            </div>
            <h3 className="category">{item.category}</h3>
            <p className="description">{item.description}</p>
            <p className="price">💰 {item.price}</p>
            <button
              className="contact-btn"
              onClick={() => setVisibleContact(visibleContact === item.id ? null : item.id)}
            >
              Contact Us
            </button>
            {visibleContact === item.id && (
              <div className="contact-info">
                <p>📞 Phone: {item.contact.phone}</p>
                <p>🌐 Website: <a href={item.contact.website} target="_blank" rel="noopener noreferrer">{item.contact.website}</a></p>
                <p>💬 Telegram: <a href={item.contact.telegram} target="_blank" rel="noopener noreferrer">{item.contact.telegram}</a></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealEstate;
