import React, { useState } from 'react';
import './ConstructionBuilding.css';

const materials = [
  {
    id: 1,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'BuildStrong Supplies',
    companyLocation: 'Delhi, India',
    image: 'https://images.unsplash.com/photo-1600880291648-5d59f7d8f668',
    category: 'Cement, Sand, Bricks',
    description: 'High quality cement, natural sand, and durable bricks for all your building needs.',
    price: '₹250 - ₹450 per unit',
    suppliers: 'UltraTech, ACC, Birla, Local Quarries',
    delivery: 'Bulk orders delivery available',
    phone: '+91 98765 43210',
    tiktok: 'https://www.tiktok.com/@buildstrong',
    telegram: 'https://t.me/buildstrongsupplies',
    website: 'https://www.ultratechcement.com/',
  },
  {
    id: 2,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'RoofPro Solutions',
    companyLocation: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1560185127-6d2fc5ee92e9',
    category: 'Roofing & Flooring',
    description: 'Tiles, shingles, hardwood, and laminate flooring options with installation support.',
    price: '₹100 - ₹700 per sq.ft',
    suppliers: 'Mohawk, Armstrong, GAF, Local Suppliers',
    delivery: 'Installation services available',
    phone: '+91 98700 12345',
    tiktok: 'https://www.tiktok.com/@roofpro',
    telegram: 'https://t.me/roofproservices',
    website: 'https://www.armstrongflooring.com/',
  },
  {
    id: 3,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'ElectroFlow Traders',
    companyLocation: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    category: 'Electrical & Plumbing Materials',
    description: 'Wiring, pipes, fixtures, and fittings sourced from trusted brands.',
    price: '₹50 - ₹1200 per item',
    suppliers: 'Schneider Electric, Kohler, Grohe, Local Dealers',
    delivery: 'Express delivery on small orders',
    phone: '+91 98123 45678',
    tiktok: 'https://www.tiktok.com/@electroflow',
    telegram: 'https://t.me/electroflow',
    website: 'https://www.schneider-electric.com/',
  },
];

const ConstructionBuilding = () => {
  const [openContactIds, setOpenContactIds] = useState({});

  const toggleContact = (id) => {
    setOpenContactIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="construction-page">
      <h2 className="construction-title">🏗 Construction & Building Materials</h2>
      <div className="construction-grid">
        {materials.map((item) => (
          <div className="construction-card" key={item.id}>
            <div className="company-header">
              <img src={item.profilePhoto} alt={item.companyName} className="company-logo" />
              <div>
                <h4 className="company-name">{item.companyName}</h4>
                <p className="company-location">{item.companyLocation}</p>
              </div>
            </div>

            <img src={item.image + '?auto=format&fit=crop&w=400&q=80'} alt={item.category} className="construction-image" />

            <h3>{item.category}</h3>
            <p className="description">{item.description}</p>
            <p><strong>Suppliers:</strong> {item.suppliers}</p>
            <p><strong>Delivery:</strong> {item.delivery}</p>
            <p><strong>Price:</strong> {item.price}</p>

            <button 
              className="btn contact-toggle-btn" 
              onClick={() => toggleContact(item.id)}
              aria-expanded={!!openContactIds[item.id]}
              aria-controls={`contact-info-${item.id}`}
            >
              {openContactIds[item.id] ? 'Hide Contact Info' : 'Contact Us'}
            </button>

            {openContactIds[item.id] && (
              <div className="contact-buttons" id={`contact-info-${item.id}`}>
                <a href={`tel:${item.phone}`} className="btn contact-btn">📞 Call</a>
                <a href={item.tiktok} target="_blank" rel="noreferrer" className="btn contact-btn">🎵 TikTok</a>
                <a href={item.telegram} target="_blank" rel="noreferrer" className="btn contact-btn">💬 Telegram</a>
                <a href={item.website} target="_blank" rel="noreferrer" className="btn contact-btn">🌐 Website</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstructionBuilding;
