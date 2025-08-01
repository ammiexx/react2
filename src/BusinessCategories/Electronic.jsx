import React, { useState } from 'react';
import './Electronic.css';

const electronicsItems = [
  {
    id: 1,
    company: 'NextGen Tech',
    location: 'San Jose, CA',
    profile: 'https://randomuser.me/api/portraits/men/21.jpg',
    image: 'https://images.unsplash.com/photo-1587202372775-9897a1a0b1fb',
    category: 'Laptops & Desktops',
    description: 'From high-end gaming laptops to budget-friendly desktops for work and school.',
    featuredBrands: 'Apple, Dell, HP, ASUS',
    warranty: '1-3 Years Manufacturer Warranty',
    price: '$499 - $2,500',
    contacts: {
      phone: '+1 (408) 555-0182',
      telegram: 'https://t.me/nextgentech',
      website: 'https://nextgentech.com',
      tiktok: 'https://tiktok.com/@nextgentech',
    }
  },
  {
    id: 2,
    company: 'MobilePro',
    location: 'Austin, TX',
    profile: 'https://randomuser.me/api/portraits/women/34.jpg',
    image: 'https://images.unsplash.com/photo-1611186871348-b2f81c92a3a7',
    category: 'Mobile Phones & Accessories',
    description: 'Latest smartphones, cases, chargers, power banks, and screen protectors.',
    featuredBrands: 'Samsung, Apple, OnePlus, Xiaomi',
    warranty: '12 Months Warranty on Devices',
    price: '$199 - $1,200',
    contacts: {
      phone: '+1 (512) 555-0123',
      telegram: 'https://t.me/mobileprostore',
      website: 'https://mobilepro.com',
      tiktok: 'https://tiktok.com/@mobilepro',
    }
  },
  {
    id: 3,
    company: 'VisionTech',
    location: 'Denver, CO',
    profile: 'https://randomuser.me/api/portraits/men/45.jpg',
    image: 'https://images.unsplash.com/photo-1585386959984-a41552263f2f',
    category: 'Cameras & Audio',
    description: 'DSLRs, mirrorless cameras, action cams, mics, and surround sound systems.',
    featuredBrands: 'Canon, Sony, Nikon, Bose',
    warranty: 'Authorized Dealer Warranty',
    price: '$150 - $2,800',
    contacts: {
      phone: '+1 (303) 555-0938',
      telegram: 'https://t.me/visiontechstore',
      website: 'https://visiontech.com',
      tiktok: 'https://tiktok.com/@visiontech',
    }
  }
];

const Electronic = () => {
  const [visibleContact, setVisibleContact] = useState({});

  const toggleContact = (id) => {
    setVisibleContact((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="electronics-page">
      <h2 className="electronics-title">💻 Explore Top Electronics & Smart Devices</h2>
      <div className="electronics-grid">
        {electronicsItems.map((item) => (
          <div className="electronics-card" key={item.id}>
            <div className="company-header">
              <img src={item.profile} alt={item.company} className="profile-img" />
              <div>
                <h3>{item.company}</h3>
                <p className="location">📍 {item.location}</p>
              </div>
            </div>
            <img src={item.image} alt={item.category} className="category-img" />
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Brands:</strong> {item.featuredBrands}</p>
            <p><strong>Warranty:</strong> {item.warranty}</p>
            <p><strong>Price:</strong> {item.price}</p>
            <p className="description">📝 {item.description}</p>

            <button className="contact-btn" onClick={() => toggleContact(item.id)}>
              {visibleContact[item.id] ? 'Hide Contacts' : 'Contact Us'}
            </button>

            {visibleContact[item.id] && (
              <div className="contact-info">
                <p>📞 <strong>Phone:</strong> {item.contacts.phone}</p>
                <p>📬 <strong>Telegram:</strong> <a href={item.contacts.telegram} target="_blank" rel="noopener noreferrer">Chat</a></p>
                <p>🌐 <strong>Website:</strong> <a href={item.contacts.website} target="_blank" rel="noopener noreferrer">{item.contacts.website}</a></p>
                <p>🎵 <strong>TikTok:</strong> <a href={item.contacts.tiktok} target="_blank" rel="noopener noreferrer">@{item.company}</a></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronic;
