import React, { useState } from 'react';
import './Houses.css';

const housePosts = [
  {
    id: 1,
    companyLogo: 'https://randomuser.me/api/portraits/men/61.jpg',
    companyName: 'HomeFinders Realty',
    location: 'Denver, CO',
    postDate: 'July 26, 2025',
    productPhoto: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    productName: '3-Bedroom Family Home',
    description: 'Spacious and modern house with garage, backyard, and energy-efficient features.',
    price: '$320,000',
    availability: 'Available Now',
    shipping: 'On-site visits only',
    rating: '4.9/5',
    reviewsCount: 45,
    warranty: 'No structural damage warranty',
    discount: {
      value: '5% closing discount',
      deadline: 'August 10, 2025',
    },
    phone: '+1 720-555-7890',
    telegram: 'https://t.me/homefinders',
    tiktok: 'https://www.tiktok.com/@homefinders',
  },
  {
    id: 2,
    companyLogo: 'https://randomuser.me/api/portraits/women/73.jpg',
    companyName: 'UrbanNest Properties',
    location: 'Austin, TX',
    postDate: 'July 24, 2025',
    productPhoto: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    productName: 'Modern City Apartment',
    description: '2-bedroom condo in downtown with gym access, rooftop garden, and parking.',
    price: '$450,000',
    availability: 'Move-in Ready',
    shipping: 'Virtual tour available',
    rating: '4.7/5',
    reviewsCount: 87,
    warranty: '1-year maintenance coverage',
    discount: {
      value: 'None',
      deadline: '',
    },
    phone: '+1 512-444-2345',
    telegram: 'https://t.me/urbannest',
    tiktok: 'https://www.tiktok.com/@urbannest',
  },
  {
    id: 3,
    companyLogo: 'https://randomuser.me/api/portraits/men/42.jpg',
    companyName: 'CountrySide Deals',
    location: 'Nashville, TN',
    postDate: 'July 23, 2025',
    productPhoto: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    productName: 'Rustic Country Cottage',
    description: 'Cozy 2-bedroom cottage with large garden, wooden finishes, and peaceful view.',
    price: '$210,000',
    availability: 'Available Immediately',
    shipping: 'In-person viewings only',
    rating: '4.6/5',
    reviewsCount: 62,
    warranty: 'None',
    discount: {
      value: '10% off for early payment',
      deadline: 'August 12, 2025',
    },
    phone: '+1 615-876-5432',
    telegram: 'https://t.me/countrysidehomes',
    tiktok: 'https://www.tiktok.com/@countrysidehomes',
  },
];

const Houses = () => {
  const [visibleContacts, setVisibleContacts] = useState({});

  const toggleContact = (id) => {
    setVisibleContacts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="houses-page">
      <h2 className="houses-title">Explore Beautiful Homes and Properties</h2>
      <div className="houses-list">
        {housePosts.map((post) => (
          <div className="houses-item" key={post.id}>
            <div className="houses-header">
              <img src={post.companyLogo} alt={`${post.companyName} Logo`} className="company-logo" />
              <div className="company-info">
                <h3>{post.companyName}</h3>
                <p>📍 {post.location}</p>
                <p>📅 Posted on: {post.postDate}</p>
              </div>
            </div>

            <div className="houses-product">
              <img src={post.productPhoto} alt={post.productName} className="product-photo" />
              <div className="product-details">
                <h4>🏡 Property: {post.productName}</h4>
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
                    {visibleContacts[post.id] ? 'Hide Contact Info' : 'Contact Agent'}
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

export default Houses;
