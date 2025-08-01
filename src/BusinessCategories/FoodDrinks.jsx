import React, { useState } from 'react';
import './FoodDrinks.css';

const foodItems = [
  {
    id: 1,
    company: 'Green Harvest Market',
    location: 'Portland, OR',
    profile: 'https://randomuser.me/api/portraits/women/55.jpg',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc',
    category: 'Fresh Produce',
    description: 'Locally sourced fruits, vegetables, and herbs—picked at peak ripeness.',
    brands: 'Local Farms, Organic Valley, FreshDirect',
    delivery: 'Same-day delivery available',
    price: '$4 - $25',
    contacts: {
      phone: '+1 (503) 555-1422',
      telegram: 'https://t.me/greenharvest',
      website: 'https://greenharvest.com',
      tiktok: 'https://tiktok.com/@greenharvest',
    }
  },
  {
    id: 2,
    company: 'Pantry Essentials Co.',
    location: 'Chicago, IL',
    profile: 'https://randomuser.me/api/portraits/men/60.jpg',
    image: 'https://images.unsplash.com/photo-1566843970291-4d4fb1c0303d',
    category: 'Packaged Foods',
    description: 'Pasta, rice, canned goods, grains, and ready-to-eat meals from top brands.',
    brands: 'Kraft, Barilla, Nestlé, Heinz',
    delivery: 'Nationwide delivery',
    price: '$3 - $40',
    contacts: {
      phone: '+1 (312) 555-8771',
      telegram: 'https://t.me/pantryessentials',
      website: 'https://pantryessentials.com',
      tiktok: 'https://tiktok.com/@pantryessentials',
    }
  },
  {
    id: 3,
    company: 'Sip & Brew Co.',
    location: 'Seattle, WA',
    profile: 'https://randomuser.me/api/portraits/men/15.jpg',
    image: 'https://images.unsplash.com/photo-1589881133602-91198362e7d4',
    category: 'Beverages (Juices, Coffee, Tea)',
    description: 'Fresh juices, premium teas, and artisan coffee blends to energize your day.',
    brands: 'Starbucks, Tropicana, Lipton, Nescafé',
    delivery: 'Subscription & bulk discounts available',
    price: '$5 - $60',
    contacts: {
      phone: '+1 (206) 555-0077',
      telegram: 'https://t.me/sipandbrew',
      website: 'https://sipandbrew.com',
      tiktok: 'https://tiktok.com/@sipandbrew',
    }
  }
];

const FoodDrinks = () => {
  const [showContact, setShowContact] = useState({});

  const toggleContact = (id) => {
    setShowContact((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="fooddrinks-page">
      <h2 className="fooddrinks-title">🛒 Shop Delicious Food & Beverages</h2>
      <div className="fooddrinks-grid">
        {foodItems.map((item) => (
          <div className="fooddrinks-card" key={item.id}>
            <div className="seller-info">
              <img src={item.profile} alt={item.company} className="profile-img" />
              <div>
                <h3>{item.company}</h3>
                <p className="location">📍 {item.location}</p>
              </div>
            </div>
            <img src={item.image} alt={item.category} className="food-image" />
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Brands:</strong> {item.brands}</p>
            <p><strong>Delivery:</strong> {item.delivery}</p>
            <p><strong>Price:</strong> {item.price}</p>
            <p className="description">📝 {item.description}</p>

            <button className="contact-btn" onClick={() => toggleContact(item.id)}>
              {showContact[item.id] ? 'Hide Contact' : 'Contact Us'}
            </button>

            {showContact[item.id] && (
              <div className="contact-info">
                <p>📞 <strong>Phone:</strong> {item.contacts.phone}</p>
                <p>📬 <strong>Telegram:</strong> <a href={item.contacts.telegram} target="_blank">Chat</a></p>
                <p>🌐 <strong>Website:</strong> <a href={item.contacts.website} target="_blank">{item.contacts.website}</a></p>
                <p>🎵 <strong>TikTok:</strong> <a href={item.contacts.tiktok} target="_blank">@{item.company}</a></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDrinks;
