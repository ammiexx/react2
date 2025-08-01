import React, { useState } from 'react';
import './HealthBeauty.css';

const healthBeautyItems = [
  {
    id: 1,
    company: 'Glow Skincare Studio',
    location: 'Los Angeles, CA',
    profile: 'https://randomuser.me/api/portraits/women/45.jpg',
    image: 'https://images.unsplash.com/photo-1600180758890-b0d93ec9d43e',
    category: 'Skincare',
    description: 'Cleansers, moisturizers, serums, and sunblocks for all skin types.',
    price: '$15 - $200',
    contacts: {
      phone: '+1 (213) 555‑1400',
      telegram: 'https://t.me/glowskincare',
      website: 'https://glowskinstudio.com',
      tiktok: 'https://tiktok.com/@glowskin'
    }
  },
  {
    id: 2,
    company: 'HairBloom Essentials',
    location: 'Atlanta, GA',
    profile: 'https://randomuser.me/api/portraits/men/18.jpg',
    image: 'https://images.unsplash.com/photo-1616827982255-d1d4ec21aa1e',
    category: 'Haircare',
    description: 'Shampoos, conditioners, treatments, and styling products.',
    price: '$10 - $120',
    contacts: {
      phone: '+1 (404) 555‑7700',
      telegram: 'https://t.me/hairbloom',
      website: 'https://hairbloom.com',
      tiktok: 'https://tiktok.com/@hairbloom'
    }
  },
  {
    id: 3,
    company: 'BeautyBox Co.',
    location: 'New York, NY',
    profile: 'https://randomuser.me/api/portraits/women/67.jpg',
    image: 'https://images.unsplash.com/photo-1587582423112-e4fdf62b6dde',
    category: 'Cosmetics & Makeup',
    description: 'Foundations, lipsticks, palettes, and beauty tools for all looks.',
    price: '$5 - $150',
    contacts: {
      phone: '+1 (212) 555‑9955',
      telegram: 'https://t.me/beautyboxco',
      website: 'https://beautyboxco.com',
      tiktok: 'https://tiktok.com/@beautyboxco'
    }
  }
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
      <div className="healthbeauty-grid">
        {healthBeautyItems.map((item) => (
          <div className="healthbeauty-card" key={item.id}>
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

            <button className="contact-btn" onClick={() => toggleDetail(item.id)}>
              {openDetail[item.id] ? 'Hide Contacts' : 'Contact Us'}
            </button>

            {openDetail[item.id] && (
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

export default HealthBeauty;
