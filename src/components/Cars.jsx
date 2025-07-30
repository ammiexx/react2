import React, { useState } from 'react';
import './Cars.css';

const carPosts = [
  {
    id: 1,
    companyLogo: 'https://randomuser.me/api/portraits/men/38.jpg',
    companyName: 'DriveNow Motors',
    location: 'Los Angeles, CA',
    postDate: 'July 24, 2025',
    productPhoto: 'https://media.istockphoto.com/id/1493574434/photo/car-rushes-along-the-highway-at-sunset-low-angle-side-view.jpg?s=612x612&w=is&k=20&c=6L6pblGO7E9-E4EtsVgwikQtvYu97FPivW2Z8FkCGM0=',
    productName: '2022 Tesla Model 3',
    description: 'Electric car with autopilot, long-range battery, and fast charging support.',
    price: '$42,500',
    availability: 'In Stock',
    shipping: 'Free delivery within California',
    rating: '4.9/5',
    reviewsCount: 120,
    warranty: '4-year warranty included',
    discount: {
      value: '5% off for first-time buyers',
      deadline: 'August 10, 2025',
    },
    phone: '+1 213-555-0198',
    telegram: 'https://t.me/drivenowmotors',
    tiktok: 'https://www.tiktok.com/@drivenow',
  },
  {
    id: 2,
    companyLogo: 'https://randomuser.me/api/portraits/women/55.jpg',
    companyName: 'AutoGalaxy',
    location: 'Dallas, TX',
    postDate: 'July 22, 2025',
    productPhoto: 'https://media.istockphoto.com/id/1326215408/photo/car-is-on-the-side-of-the-road.jpg?s=612x612&w=0&k=20&c=xE8mHgQzoauaKIL_Qf3wldPv_CfyLupWDR7FTPf8L20=',
    productName: '2021 BMW 3 Series',
    description: 'Luxury sedan with leather interior, digital dashboard, and turbocharged engine.',
    price: '$36,800',
    availability: 'Limited Stock',
    shipping: 'Pickup only',
    rating: '4.7/5',
    reviewsCount: 95,
    warranty: '3-year warranty included',
    discount: {
      value: 'None',
      deadline: '',
    },
    phone: '+1 972-555-2234',
    telegram: 'https://t.me/autogalaxy',
    tiktok: 'https://www.tiktok.com/@autogalaxy',
  },
  {
    id: 3,
    companyLogo: 'https://randomuser.me/api/portraits/men/19.jpg',
    companyName: 'GreenWheel Auto',
    location: 'Portland, OR',
    postDate: 'July 20, 2025',
    productPhoto: 'https://media.istockphoto.com/id/472185655/photo/car-in-motion-on-sunset.jpg?s=612x612&w=0&k=20&c=5KLOUufBTEw_jdcMPO4XYS5PcF3Qpcwb_-NIT42PXcI=',
    productName: '2020 Toyota Prius Hybrid',
    description: 'Fuel-efficient hybrid car perfect for city driving and commuting.',
    price: '$24,000',
    availability: 'Available Now',
    shipping: 'Free test drive available',
    rating: '4.6/5',
    reviewsCount: 70,
    warranty: '2-year warranty included',
    discount: {
      value: '8% summer discount',
      deadline: 'August 15, 2025',
    },
    phone: '+1 503-444-1100',
    telegram: 'https://t.me/greenwheel',
    tiktok: 'https://www.tiktok.com/@greenwheelauto',
  },
];

const Cars = () => {
  const [visibleContacts, setVisibleContacts] = useState({});

  const toggleContact = (id) => {
    setVisibleContacts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="cars-page">
      <h2 className="cars-title">Latest Deals on Cars & Electric Vehicles</h2>
      <div className="cars-list">
        {carPosts.map((post) => (
          <div className="cars-item" key={post.id}>
            <div className="cars-header">
              <img src={post.companyLogo} alt={`${post.companyName} Logo`} className="company-logo" />
              <div className="company-info">
                <h3>{post.companyName}</h3>
                <p>📍 {post.location}</p>
                <p>📅 Posted on: {post.postDate}</p>
              </div>
            </div>

            <div className="cars-product">
              <img src={post.productPhoto} alt={post.productName} className="product-photo" />
              <div className="product-details">
                <h4>🚗 Model: {post.productName}</h4>
                <p>💬 Description: {post.description}</p>
                <p>💵 Price: {post.price}</p>
                <p>📦 Availability: {post.availability}</p>
                <p>🚚 Shipping: {post.shipping}</p>
                <p>⭐ Rated {post.rating} by {post.reviewsCount} buyers</p>
                <p>🔒 {post.warranty}</p>

                {post.discount.value !== 'None' && (
                  <p className="discount-info">🔥 Discount: <strong>{post.discount.value}</strong> until <strong>{post.discount.deadline}</strong></p>
                )}

                <div className="buttons">
                  <button className="contact-btn" onClick={() => toggleContact(post.id)}>
                    {visibleContacts[post.id] ? 'Hide Contact Info' : 'Contact Dealer'}
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

export default Cars;
