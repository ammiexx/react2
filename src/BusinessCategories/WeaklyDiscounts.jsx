import React from 'react';
import './WeaklyDiscounts.css';

const weeklyDeals = [
  {
    company: 'Elegant Home Co.',
    location: 'Seattle, WA',
    profileImg: 'https://randomuser.me/api/portraits/women/33.jpg',
    itemImg: 'https://images.unsplash.com/photo-1615874959474-d6a78a246efb?auto=format&fit=crop&w=400&q=60',
    description: 'Luxury velvet armchair with gold-plated legs and premium cushions.',
    postedDate: '2025-07-27',
    price: '$240',
  },
  {
    company: 'Gear Up Garage',
    location: 'Las Vegas, NV',
    profileImg: 'https://randomuser.me/api/portraits/men/38.jpg',
    itemImg: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=400&q=60',
    description: 'Complete car care kit with wax, polish, and microfiber cloths.',
    postedDate: '2025-07-26',
    price: '$45',
  },
  {
    company: 'Metro Kitchen Supplies',
    location: 'Houston, TX',
    profileImg: 'https://randomuser.me/api/portraits/men/47.jpg',
    itemImg: 'https://images.unsplash.com/photo-1624389050294-4b648d90cb35?auto=format&fit=crop&w=400&q=60',
    description: 'Professional stainless steel knife set - 6 pieces.',
    postedDate: '2025-07-25',
    price: '$85',
  },
  {
    company: 'Studio Shine',
    location: 'Boston, MA',
    profileImg: 'https://randomuser.me/api/portraits/women/62.jpg',
    itemImg: 'https://images.unsplash.com/photo-1596462502278-27bfdc198568?auto=format&fit=crop&w=400&q=60',
    description: 'Ring light with adjustable brightness for content creators.',
    postedDate: '2025-07-28',
    price: '$60',
  },
  {
    company: 'Outdoor Vibes',
    location: 'Phoenix, AZ',
    profileImg: 'https://randomuser.me/api/portraits/men/66.jpg',
    itemImg: 'https://images.unsplash.com/photo-1516475429286-2b5b6a717f4b?auto=format&fit=crop&w=400&q=60',
    description: 'Compact camping stove with fuel adapter and carrying case.',
    postedDate: '2025-07-24',
    price: '$52',
  },
  {
    company: 'SmartStyle Wearables',
    location: 'San Diego, CA',
    profileImg: 'https://randomuser.me/api/portraits/women/22.jpg',
    itemImg: 'https://images.unsplash.com/photo-1611587071327-4c28b3e29f24?auto=format&fit=crop&w=400&q=60',
    description: 'Smart fitness tracker with heart rate monitor and sleep tracking.',
    postedDate: '2025-07-29',
    price: '$75',
  }
];

const WeeklyDiscounts = () => {
  return (
    <section className="weekly-discounts-section">
      <h2>🔥 Weekly Hot Deals</h2>
      <p className="subtext">Get the best weekly discounts from top-rated sellers</p>
      <div className="weekly-grid">
        {weeklyDeals.map((deal, index) => (
          <div className="weekly-card" key={index}>
            <div className="seller-info">
              <img src={deal.profileImg} alt={deal.company} className="profile-avatar" />
              <div>
                <h3 className="company-name">{deal.company}</h3>
                <span className="location">{deal.location}</span>
              </div>
            </div>
            <img src={deal.itemImg} alt="Item" className="item-photo" />
            <p className="item-description">{deal.description}</p>
            <div className="bottom-meta">
              <span className="posted-date">Posted: {deal.postedDate}</span>
              <span className="item-price">{deal.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeeklyDiscounts;
