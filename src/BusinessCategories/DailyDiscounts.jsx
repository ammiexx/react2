import React from 'react';
import './DailyDiscounts.css';

const discountItems = [
  {
    companyName: 'Urban Electronics',
    location: 'New York, NY',
    profile: 'https://randomuser.me/api/portraits/men/32.jpg',
    itemImage: 'https://images.unsplash.com/photo-1580910051070-c3531ef9b1f9?auto=format&fit=crop&w=400&q=60',
    description: 'Wireless noise-canceling headphones with 40-hour battery life.',
    datePosted: '2025-07-30',
    price: '$99',
  },
  {
    companyName: 'Green Market Grocers',
    location: 'Austin, TX',
    profile: 'https://randomuser.me/api/portraits/women/45.jpg',
    itemImage: 'https://images.unsplash.com/photo-1604908177526-cb4b7e2e7a42?auto=format&fit=crop&w=400&q=60',
    description: 'Organic fruit basket - apples, bananas, and seasonal fruits.',
    datePosted: '2025-07-29',
    price: '$25',
  },
  {
    companyName: 'City Style Apparel',
    location: 'Los Angeles, CA',
    profile: 'https://randomuser.me/api/portraits/men/75.jpg',
    itemImage: 'https://images.unsplash.com/photo-1618354691373-b46dc2e4c1d4?auto=format&fit=crop&w=400&q=60',
    description: 'Premium denim jacket for men, slim fit with durable stitching.',
    datePosted: '2025-07-30',
    price: '$59',
  },
  {
    companyName: 'The Furniture Spot',
    location: 'Chicago, IL',
    profile: 'https://randomuser.me/api/portraits/women/52.jpg',
    itemImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=60',
    description: 'Modern oak coffee table with scratch-resistant finish.',
    datePosted: '2025-07-31',
    price: '$120',
  },
  {
    companyName: 'Mountain Gear Co.',
    location: 'Denver, CO',
    profile: 'https://randomuser.me/api/portraits/men/88.jpg',
    itemImage: 'https://images.unsplash.com/photo-1589998059171-183e36f7e4a4?auto=format&fit=crop&w=400&q=60',
    description: 'Hiking backpack with hydration system and 65L capacity.',
    datePosted: '2025-07-28',
    price: '$75',
  },
  {
    companyName: 'Ocean View Optics',
    location: 'Miami, FL',
    profile: 'https://randomuser.me/api/portraits/women/60.jpg',
    itemImage: 'https://images.unsplash.com/photo-1598454449604-960e53f26e2e?auto=format&fit=crop&w=400&q=60',
    description: 'Polarized sunglasses for UV protection with stylish frames.',
    datePosted: '2025-07-31',
    price: '$39',
  },
  {
    companyName: 'TechPro Solutions',
    location: 'San Francisco, CA',
    profile: 'https://randomuser.me/api/portraits/men/90.jpg',
    itemImage: 'https://images.unsplash.com/photo-1555617117-08fda4d3be0d?auto=format&fit=crop&w=400&q=60',
    description: 'Smart home assistant with voice recognition and app control.',
    datePosted: '2025-07-30',
    price: '$79',
  },
  {
    companyName: 'Crafty Corner',
    location: 'Portland, OR',
    profile: 'https://randomuser.me/api/portraits/women/29.jpg',
    itemImage: 'https://images.unsplash.com/photo-1501870190086-69f4e8986c8a?auto=format&fit=crop&w=400&q=60',
    description: 'Handmade ceramic vase with earthy tones and natural textures.',
    datePosted: '2025-07-31',
    price: '$45',
  },
  {
    companyName: 'Auto Parts Plus',
    location: 'Dallas, TX',
    profile: 'https://randomuser.me/api/portraits/men/59.jpg',
    itemImage: 'https://images.unsplash.com/photo-1602872021752-3f9b8eb26263?auto=format&fit=crop&w=400&q=60',
    description: 'High-performance brake pad set for mid-size sedans.',
    datePosted: '2025-07-30',
    price: '$89',
  },
  {
    companyName: 'Fresh & Clean Supplies',
    location: 'Atlanta, GA',
    profile: 'https://randomuser.me/api/portraits/women/40.jpg',
    itemImage: 'https://images.unsplash.com/photo-1584467735871-b052d40a7606?auto=format&fit=crop&w=400&q=60',
    description: 'Eco-friendly cleaning product bundle for home use.',
    datePosted: '2025-07-29',
    price: '$30',
  }
];

const DailyDiscounts = () => {
  return (
    <div className="discounts-container">
      <h2>🛍️ Today's Discounts</h2>
      <div className="discounts-grid">
        {discountItems.slice(0, 6).map((item, index) => (
          <div className="discount-card" key={index}>
            <div className="company-info">
              <img src={item.profile} alt={item.companyName} className="profile-img" />
              <div>
                <h3>{item.companyName}</h3>
                <p className="location">{item.location}</p>
              </div>
            </div>
            <img src={item.itemImage} alt="Item" className="item-img" />
            <p className="description">{item.description}</p>
            <div className="bottom-info">
              <span className="date">Posted: {item.datePosted}</span>
              <span className="price">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyDiscounts;
