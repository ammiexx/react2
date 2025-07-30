import React, { useState } from 'react';
import './Clothes.css';

const clothesPosts = [
  {
    id: 1,
    companyLogo: 'https://randomuser.me/api/portraits/women/44.jpg',
    companyName: 'UrbanWear Co.',
    location: 'New York, NY',
    postDate: 'July 26, 2025',
    productPhoto: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80',
    productName: 'Men’s Casual Denim Jacket',
    description: 'Stylish denim jacket with classic fit and durable stitching.',
    price: '$75.00',
    availability: 'In Stock',
    shipping: 'Free shipping over $50',
    rating: '4.5/5',
    reviewsCount: 230,
    warranty: '30-day return policy',
    discount: {
      value: '20% off summer sale',
      deadline: 'August 15, 2025',
    },
    phone: '+1 212-555-0199',
    telegram: 'https://t.me/urbanwearco',
    tiktok: 'https://www.tiktok.com/@urbanwearco',
  },
  {
    id: 2,
    companyLogo: 'https://randomuser.me/api/portraits/men/51.jpg',
    companyName: 'StyleSphere',
    location: 'Los Angeles, CA',
    postDate: 'July 24, 2025',
    productPhoto: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    productName: 'Women’s Summer Floral Dress',
    description: 'Lightweight floral dress perfect for summer outings.',
    price: '$55.00',
    availability: 'Limited Stock',
    shipping: 'Standard shipping $8',
    rating: '4.7/5',
    reviewsCount: 145,
    warranty: 'Free exchange within 15 days',
    discount: {
      value: '15% off',
      deadline: 'August 5, 2025',
    },
    phone: '+1 310-555-1122',
    telegram: 'https://t.me/stylesphere',
    tiktok: 'https://www.tiktok.com/@stylesphere',
  },
  {
    id: 3,
    companyLogo: 'https://randomuser.me/api/portraits/women/68.jpg',
    companyName: 'ChicTrend',
    location: 'Chicago, IL',
    postDate: 'July 23, 2025',
    productPhoto: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    productName: 'Unisex Hoodie',
    description: 'Comfortable unisex hoodie with soft fleece lining.',
    price: '$40.00',
    availability: 'In Stock',
    shipping: 'Free local pickup',
    rating: '4.6/5',
    reviewsCount: 180,
    warranty: 'Exchange within 30 days',
    discount: {
      value: 'None',
      deadline: '',
    },
    phone: '+1 773-555-6677',
    telegram: 'https://t.me/chictrend',
    tiktok: 'https://www.tiktok.com/@chictrend',
  },
];

const Clothes = () => {
  const [visibleContacts, setVisibleContacts] = useState({});

  const toggleContact = (id) => {
    setVisibleContacts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="clothes-page">
      <h2 className="clothes-title">Trendy Clothing & Apparel Deals</h2>
      <div className="clothes-list">
        {clothesPosts.map((post) => (
          <div className="clothes-item" key={post.id}>
            <div className="clothes-header">
              <img src={post.companyLogo} alt={`${post.companyName} Logo`} className="company-logo" />
              <div className="company-info">
                <h3>{post.companyName}</h3>
                <p>📍 {post.location}</p>
                <p>📅 Posted on: {post.postDate}</p>
              </div>
            </div>

            <div className="clothes-product">
              <img src={post.productPhoto} alt={post.productName} className="product-photo" />
              <div className="product-details">
                <h4>👗 Product: {post.productName}</h4>
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

export default Clothes;
