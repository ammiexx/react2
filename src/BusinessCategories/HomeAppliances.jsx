import React, { useState } from 'react';
import './HomeAppliances.css';

const homeItems = [
  {
    id: 1,
    company: 'Kitchen Pro Supply',
    location: 'Houston, TX',
    profile: 'https://randomuser.me/api/portraits/women/20.jpg',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90',
    category: 'Kitchen Appliances',
    description: 'Refrigerators, ovens, blenders and cookware from top brands.',
    price: '$150 - $3,000',
    contacts: {
      phone: '+1 (713) 555‑2100',
      telegram: 'https://t.me/kitchenpro',
      website: 'https://kitchenpro.com',
      tiktok: 'https://tiktok.com/@kitchenpro'
    }
  },
  {
    id: 2,
    company: 'HomeStyle Furnishings',
    location: 'San Francisco, CA',
    profile: 'https://randomuser.me/api/portraits/men/32.jpg',
    image: 'https://images.unsplash.com/photo-1586023492122-0b9f31a134e9',
    category: 'Furniture',
    description: 'Sofas, beds, tables, and storage units in modern & classic styles.',
    price: '$250 - $5,500',
    contacts: {
      phone: '+1 (415) 555‑5600',
      telegram: 'https://t.me/homestylefs',
      website: 'https://homestylefs.com',
      tiktok: 'https://tiktok.com/@homestylefs'
    }
  },
  {
    id: 3,
    company: 'Decor & Beyond',
    location: 'Miami, FL',
    profile: 'https://randomuser.me/api/portraits/women/44.jpg',
    image: 'https://images.unsplash.com/photo-1505692794400-9a0b2b2933a4',
    category: 'Home Decor',
    description: 'Artworks, rugs, cushions, and vases to accentuate your style.',
    price: '$35 - $800',
    contacts: {
      phone: '+1 (305) 555‑7788',
      telegram: 'https://t.me/decorandbeyond',
      website: 'https://decorandbeyond.com',
      tiktok: 'https://tiktok.com/@decorandbeyond'
    }
  }
];

const HomeAppliances = () => {
  const [visible, setVisible] = useState({});

  const toggleContact = (id) => {
    setVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="homeappliances-page">
      <h2 className="homeappliances-title">🧰 Home & Appliance Highlights</h2>
      <div className="homeappliances-grid">
        {homeItems.map((item) => (
          <div className="homeappliances-card" key={item.id}>
            <img src={item.image} alt={item.category} className="card-image" />

            <div className="company-header">
              <img src={item.profile} alt={item.company} className="profile-img" />
              <div>
                <h3>{item.company}</h3>
                <p className="location">📍 {item.location}</p>
              </div>
            </div>

            <p className="category"><strong>Category:</strong> {item.category}</p>
            <p className="price"><strong>Price:</strong> {item.price}</p>
            <p className="description">{item.description}</p>

            <button className="contact-btn" onClick={() => toggleContact(item.id)}>
              {visible[item.id] ? 'Hide Contacts' : 'Contact Us'}
            </button>

            {visible[item.id] && (
              <div className="contact-info">
                <p>📞 {item.contacts.phone}</p>
                <p>🌐 <a href={item.contacts.website} target="_blank" rel="noopener noreferrer">{item.contacts.website}</a></p>
                <p>💬 <a href={item.contacts.telegram} target="_blank" rel="noopener noreferrer">Telegram</a></p>
                <p>🎵 <a href={item.contacts.tiktok} target="_blank" rel="noopener noreferrer">@{item.company.replace(/\s+/g, '').toLowerCase()}</a></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAppliances;
