import React, { useState } from 'react';
import './Fashion.css';

const fashionItems = [
  {
    company: 'Chic Avenue',
    location: 'New York, NY',
    ownerProfile: 'https://randomuser.me/api/portraits/women/48.jpg',
    itemImg: 'https://images.unsplash.com/photo-1520970014086-2208d33bdc97?auto=format&fit=crop&w=400&q=60',
    description: 'Elegant silk evening dress with a modern twist.',
    price: '$120',
    contact: {
      phone: '+1 212-555-9088',
      telegram: 'https://t.me/chicavenue',
      website: 'https://chicavenue.com',
      tiktok: 'https://www.tiktok.com/@chicavenue'
    }
  },
  {
    company: 'Urban Threads',
    location: 'Los Angeles, CA',
    ownerProfile: 'https://randomuser.me/api/portraits/men/43.jpg',
    itemImg: 'https://images.unsplash.com/photo-1612423284934-b3f9f407e2ea?auto=format&fit=crop&w=400&q=60',
    description: 'Casual streetwear hoodie with minimalist design.',
    price: '$65',
    contact: {
      phone: '+1 310-555-4221',
      telegram: 'https://t.me/urbanthreads',
      website: 'https://urbanthreads.com',
      tiktok: 'https://www.tiktok.com/@urbanthreads'
    }
  },
  {
    company: 'Vogue Lane',
    location: 'Chicago, IL',
    ownerProfile: 'https://randomuser.me/api/portraits/women/65.jpg',
    itemImg: 'https://images.unsplash.com/photo-1520975922077-897d0c877f36?auto=format&fit=crop&w=400&q=60',
    description: 'Designer blazer tailored for professional settings.',
    price: '$150',
    contact: {
      phone: '+1 773-555-6677',
      telegram: 'https://t.me/voguelane',
      website: 'https://voguelane.com',
      tiktok: 'https://www.tiktok.com/@voguelane'
    }
  },
  {
    company: 'Cozy Couture',
    location: 'Austin, TX',
    ownerProfile: 'https://randomuser.me/api/portraits/men/52.jpg',
    itemImg: 'https://images.unsplash.com/photo-1602810317994-d20ca9c04c27?auto=format&fit=crop&w=400&q=60',
    description: 'Warm knit sweater with eco-friendly materials.',
    price: '$80',
    contact: {
      phone: '+1 512-555-1234',
      telegram: 'https://t.me/cozycouture',
      website: 'https://cozycouture.com',
      tiktok: 'https://www.tiktok.com/@cozycouture'
    }
  }
];

const Fashions = () => {
  const [openContactIndex, setOpenContactIndex] = useState(null);

  const toggleContact = (index) => {
    setOpenContactIndex(openContactIndex === index ? null : index);
  };

  return (
    <section className="fashion-section">
      <h2>👗 Featured Fashion Deals</h2>
      <div className="fashion-grid">
        {fashionItems.map((item, index) => (
          <div className="fashion-card" key={index}>
            <div className="owner-info">
              <img src={item.ownerProfile} alt="Owner" className="owner-avatar" />
              <div>
                <h3>{item.company}</h3>
                <p className="location">{item.location}</p>
              </div>
            </div>
            <img src={item.itemImg} alt="Fashion Item" className="fashion-img" />
            <p className="description">{item.description}</p>
            <div className="meta">
              <span className="price">{item.price}</span>
            </div>
            <button onClick={() => toggleContact(index)} className="contact-btn">
              {openContactIndex === index ? 'Hide Contact' : 'Contact Us'}
            </button>
            {openContactIndex === index && (
              <div className="contact-info">
                <p><strong>Phone:</strong> {item.contact.phone}</p>
                <p><strong>Telegram:</strong> <a href={item.contact.telegram} target="_blank" rel="noopener noreferrer">Chat</a></p>
                <p><strong>Website:</strong> <a href={item.contact.website} target="_blank" rel="noopener noreferrer">{item.contact.website}</a></p>
                <p><strong>TikTok:</strong> <a href={item.contact.tiktok} target="_blank" rel="noopener noreferrer">@{item.company.replace(/\s+/g, '').toLowerCase()}</a></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Fashions;
