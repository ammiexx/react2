import React, { useState } from 'react';
import './AgricultureLivestock.css';

const agriItems = [
  {
    id: 1,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'John Deere Farms',
    companyLocation: 'Moline, USA',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
    category: 'Farming Equipment',
    description: 'Durable tractors, plows, and harvesters designed to optimize your farming operations.',
    providers: 'John Deere, Kubota, Case IH',
    availability: 'In Stock',
    price: 'Starting at $15,000',
    phone: '+1 309-765-8000',
    tiktok: 'https://www.tiktok.com/@johndeere',
    telegram: 'https://t.me/johndeere',
    website: 'https://www.deere.com/',
  },
  {
    id: 2,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Bayer Crop Science',
    companyLocation: 'Leverkusen, Germany',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    category: 'Seeds & Fertilizers',
    description: 'High-quality seeds and organic fertilizers to maximize crop yield and soil health.',
    providers: 'Bayer Crop Science, Syngenta, Scotts',
    availability: 'Available Now',
    price: 'Varies by product',
    phone: '+49 214 30 1',
    tiktok: 'https://www.tiktok.com/@bayer',
    telegram: 'https://t.me/bayer',
    website: 'https://www.bayer.com/en/',
  },
  {
    id: 3,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Cargill Feeds',
    companyLocation: 'Minnesota, USA',
    image: 'https://images.unsplash.com/photo-1542444459-abe08a98d2b2',
    category: 'Animal Feed',
    description: 'Nutritious and balanced feed options for cattle, poultry, and other livestock.',
    providers: 'Cargill, Purina, Nutreco',
    availability: 'In Stock',
    price: '$20 - $300',
    phone: '+1 800-227-4455',
    tiktok: 'https://www.tiktok.com/@cargill',
    telegram: 'https://t.me/cargill',
    website: 'https://www.cargill.com/',
  },
  {
    id: 4,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Local Breeders',
    companyLocation: 'Various Locations',
    image: 'https://images.unsplash.com/photo-1564518098551-7e5bc2b9f8a6',
    category: 'Live Animals (Cattle, Poultry)',
    description: 'Healthy livestock including cattle and poultry available for sale and breeding purposes.',
    providers: 'Local Farms & Breeders',
    availability: 'Limited Stock',
    price: 'Varies',
    phone: '+1 555-123-4567',
    tiktok: '#',
    telegram: '#',
    website: '#',
  },
  {
    id: 5,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Zoetis Veterinary',
    companyLocation: 'Parsippany, USA',
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4',
    category: 'Veterinary Supplies',
    description: 'Essential medical supplies and equipment to care for your livestock’s health and wellbeing.',
    providers: 'Zoetis, Merck Animal Health, Boehringer Ingelheim',
    availability: 'In Stock',
    price: 'Starting at $50',
    phone: '+1 973-822-7200',
    tiktok: 'https://www.tiktok.com/@zoetis',
    telegram: 'https://t.me/zoetis',
    website: 'https://www.zoetis.com/',
  },
  // New items:
  {
    id: 6,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Syngenta Seeds',
    companyLocation: 'Basel, Switzerland',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    category: 'Seed Technology',
    description: 'Innovative seed technology solutions for improved crop resilience and yields.',
    providers: 'Syngenta, Monsanto',
    availability: 'In Stock',
    price: 'Custom pricing',
    phone: '+41 61 323 1111',
    tiktok: 'https://www.tiktok.com/@syngenta',
    telegram: 'https://t.me/syngenta',
    website: 'https://www.syngenta.com/',
  },
  {
    id: 7,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Purina Animal Nutrition',
    companyLocation: 'Missouri, USA',
    image: 'https://images.unsplash.com/photo-1488900128956-5ce4f23e16b9',
    category: 'Animal Nutrition',
    description: 'High-quality animal nutrition products supporting health and growth.',
    providers: 'Purina, Cargill',
    availability: 'Available Now',
    price: '$30 - $250',
    phone: '+1 800-227-8941',
    tiktok: 'https://www.tiktok.com/@purina',
    telegram: 'https://t.me/purina',
    website: 'https://www.purina.com/',
  },
];

const AgricultureLivestock = () => {
  const [openContactIds, setOpenContactIds] = useState({});

  const toggleContact = (id) => {
    setOpenContactIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="agri-page">
      <h2 className="agri-title">🐮 Agriculture & Livestock</h2>
      <div className="agri-grid">
        {agriItems.map((item) => (
          <div className="agri-card" key={item.id}>
            <div className="company-header">
              <img src={item.profilePhoto} alt={item.companyName} className="company-logo" />
              <div>
                <h4 className="company-name">{item.companyName}</h4>
                <p className="company-location">{item.companyLocation}</p>
              </div>
            </div>

            <img
              src={item.image + '?auto=format&fit=crop&w=400&q=80'}
              alt={item.category}
              className="agri-image"
            />

            <h3>{item.category}</h3>
            <p className="description">{item.description}</p>
            <p><strong>Providers:</strong> {item.providers}</p>
            <p><strong>Availability:</strong> {item.availability}</p>
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
                {item.phone && item.phone !== '#' && (
                  <a href={`tel:${item.phone}`} className="btn contact-btn">📞 Call</a>
                )}
                {item.tiktok && item.tiktok !== '#' && (
                  <a href={item.tiktok} target="_blank" rel="noreferrer" className="btn contact-btn">🎵 TikTok</a>
                )}
                {item.telegram && item.telegram !== '#' && (
                  <a href={item.telegram} target="_blank" rel="noreferrer" className="btn contact-btn">💬 Telegram</a>
                )}
                {item.website && item.website !== '#' && (
                  <a href={item.website} target="_blank" rel="noreferrer" className="btn contact-btn">🌐 Website</a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgricultureLivestock;
