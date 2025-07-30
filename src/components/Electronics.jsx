import React, { useState } from 'react';
import './Electronics.css';

const electronicsPosts = [
  {
    id: 1,
    companyLogo: 'https://randomuser.me/api/portraits/men/12.jpg',
    companyName: 'Gadget World',
    location: 'Austin, TX',
    postDate: 'July 25, 2025',
    productPhoto: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52b1?auto=format&fit=crop&w=400&q=80',
    productName: '4K Ultra HD Smart TV',
    description: 'Stunning 55-inch UHD TV with HDR10+, built-in apps, and Alexa voice control.',
    price: '$599.00',
    availability: 'In Stock',
    shipping: 'Free nationwide delivery',
    rating: '4.9/5',
    reviewsCount: 289,
    warranty: '2-year warranty included',
    discount: {
      value: '20% off',
      deadline: 'August 15, 2025',
    },
    phone: '+1 800-123-4567',
    telegram: 'https://t.me/gadgetworld',
    tiktok: 'https://www.tiktok.com/@gadgetworld',
  },
  {
    id: 2,
    companyLogo: 'https://randomuser.me/api/portraits/women/29.jpg',
    companyName: 'Tech Bros',
    location: 'Seattle, WA',
    postDate: 'July 24, 2025',
    productPhoto: 'https://images.unsplash.com/photo-1587202372775-a9aab5a0f14b?auto=format&fit=crop&w=400&q=80',
    productName: 'Gaming Laptop GTX 4080',
    description: 'High-performance laptop with Intel i9, 32GB RAM, RTX 4080, and 1TB SSD.',
    price: '$1,899.00',
    availability: 'In Stock',
    shipping: 'Free express delivery',
    rating: '4.8/5',
    reviewsCount: 175,
    warranty: '3-year warranty included',
    discount: {
      value: '10% off',
      deadline: 'August 5, 2025',
    },
    phone: '+1 555-234-5678',
    telegram: 'https://t.me/techbros',
    tiktok: 'https://www.tiktok.com/@techbros',
  },
  {
    id: 3,
    companyLogo: 'https://randomuser.me/api/portraits/men/55.jpg',
    companyName: 'Sound Masters',
    location: 'Boston, MA',
    postDate: 'July 23, 2025',
    productPhoto: 'https://images.unsplash.com/photo-1616948981659-5e7fc7e3d0b7?auto=format&fit=crop&w=400&q=80',
    productName: 'Wireless Home Speaker',
    description: 'Premium Bluetooth speaker with 360° sound, 24-hour battery, and water resistance.',
    price: '$129.00',
    availability: 'Limited Stock',
    shipping: 'Shipping: $5',
    rating: '4.6/5',
    reviewsCount: 98,
    warranty: '1-year warranty included',
    discount: {
      value: 'None',
      deadline: '',
    },
    phone: '+1 321-987-6543',
    telegram: 'https://t.me/soundmasters',
    tiktok: 'https://www.tiktok.com/@soundmasters',
  },
];

const Electronics = () => {
  const [visibleContacts, setVisibleContacts] = useState({});

  const toggleContact = (id) => {
    setVisibleContacts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="electronics-page">
      <h2 className="electronics-title">Best Deals on Electronics — Updated Daily!</h2>
      <div className="electronics-list">
        {electronicsPosts.map((post) => (
          <div className="electronics-item" key={post.id}>
            <div className="electronics-header">
              <img src={post.companyLogo} alt={`${post.companyName} Logo`} className="company-logo" />
              <div className="company-info">
                <h3>{post.companyName}</h3>
                <p>📍 {post.location}</p>
                <p>📅 Posted on: {post.postDate}</p>
              </div>
            </div>

            <div className="electronics-product">
              <img src={post.productPhoto} alt={post.productName} className="product-photo" />
              <div className="product-details">
                <h4>🔌 Product: {post.productName}</h4>
                <p>💬 Description: {post.description}</p>
                <p>💵 Price: {post.price}</p>
                <p>📦 Availability: {post.availability}</p>
                <p>🚚 Shipping: {post.shipping}</p>
                <p>⭐ Rated {post.rating} by {post.reviewsCount} customers</p>
                <p>🔒 {post.warranty}</p>

                {post.discount.value !== 'None' && (
                  <p className="discount-info">🔥 Discount: <strong>{post.discount.value}</strong> until <strong>{post.discount.deadline}</strong></p>
                )}

                <div className="buttons">
                  <button className="contact-btn" onClick={() => toggleContact(post.id)}>
                    {visibleContacts[post.id] ? 'Hide Contact Info' : 'Contact Seller'}
                  </button>
                </div>

                {visibleContacts[post.id] && (
                  <div className="contact-info">
                    <p><strong>📞 Phone:</strong> <a href={`tel:${post.phone}`}>{post.phone}</a></p>
                    <p><strong>📨 Telegram:</strong> <a href={post.telegram} target="_blank" rel="noopener noreferrer">Open Telegram</a></p>
                    <p><strong>🎵 TikTok:</strong> <a href={post.tiktok} target="_blank" rel="noopener noreferrer">View TikTok Profile</a></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
