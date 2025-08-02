import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForSale.css';

const forSalePosts = [
  {
    id: 1,
    companyLogo: 'https://randomuser.me/api/portraits/men/45.jpg',
    companyName: 'Acme Tools Inc.',
    location: 'New York, NY',
    postDate: '2025-07-25',
    productPhoto: 'https://images.unsplash.com/photo-1745488039955-e6e55fbcd419?q=80&w=385&auto=format&fit=crop',
    productName: 'Cordless Power Drill X200',
    description: 'Powerful 20V cordless drill with 2-speed settings, LED light, and ergonomic grip.',
    price: '$120.00',
    availability: 'In Stock',
    shipping: 'Free delivery on orders over $50',
    rating: '4.8/5',
    reviewsCount: 150,
    warranty: '1-year warranty included',
    discount: {
      value: '10% off',
      deadline: 'August 5, 2025',
    },
    phone: '+1 234-567-8900',
    telegram: 'https://t.me/acmetools',
    tiktok: 'https://www.tiktok.com/@acmetools',
  },
  {
    id: 2,
    companyLogo: 'https://randomuser.me/api/portraits/women/68.jpg',
    companyName: 'Garden Pro Supplies',
    location: 'San Francisco, CA',
    postDate: '2025-06-25',
    productPhoto: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=400&q=80',
    productName: 'Electric Lawn Mower 3000',
    description: 'Eco-friendly electric lawn mower with adjustable height and rechargeable battery.',
    price: '$250.00',
    availability: 'Limited Stock',
    shipping: 'Shipping fee: $15',
    rating: '4.5/5',
    reviewsCount: 90,
    warranty: '2-year warranty included',
    discount: {
      value: 'None',
      deadline: '',
    },
    phone: '+1 555-123-4567',
    telegram: 'https://t.me/gardenpro',
    tiktok: 'https://www.tiktok.com/@gardenpro',
  },
  {
    id: 3,
    companyLogo: 'https://randomuser.me/api/portraits/men/33.jpg',
    companyName: 'TechGears Ltd.',
    location: 'Chicago, IL',
    postDate: '2025-09-25',
    productPhoto: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    productName: 'Bluetooth Headphones Pro',
    description: 'Noise-cancelling wireless headphones with 30 hours battery life and fast charging.',
    price: '$180.00',
    availability: 'In Stock',
    shipping: 'Free delivery nationwide',
    rating: '4.7/5',
    reviewsCount: 210,
    warranty: '6-month warranty included',
    discount: {
      value: '15% off',
      deadline: 'August 10, 2025',
    },
    phone: '+1 999-888-7777',
    telegram: 'https://t.me/techgears',
    tiktok: 'https://www.tiktok.com/@techgears',
  },
  {
    id: 4,
    companyLogo: 'https://randomuser.me/api/portraits/women/12.jpg',
    companyName: 'Kitchen Essentials Co.',
    location: 'Houston, TX',
    postDate: '2025-05-25',
    productPhoto: 'https://images.unsplash.com/photo-1560185127-6d0e836e11bf?auto=format&fit=crop&w=400&q=80',
    productName: 'Multi-Speed Blender',
    description: 'Powerful kitchen blender with 5-speed control and BPA-free jar.',
    price: '$89.99',
    availability: 'In Stock',
    shipping: 'Free shipping',
    rating: '4.3/5',
    reviewsCount: 80,
    warranty: '1-year limited warranty',
    discount: {
      value: '5% off',
      deadline: 'August 8, 2025',
    },
    phone: '+1 888-222-3333',
    telegram: 'https://t.me/kitchenessentials',
    tiktok: 'https://www.tiktok.com/@kitchenessentials',
  },
  {
    id: 5,
    companyLogo: 'https://randomuser.me/api/portraits/men/77.jpg',
    companyName: 'EcoHome Gear',
    location: 'Seattle, WA',
    postDate: '2025-08-25',
    productPhoto: 'https://images.unsplash.com/photo-1606788075764-9b4aa8a8703c?auto=format&fit=crop&w=400&q=80',
    productName: 'Solar LED Garden Lights',
    description: 'Waterproof LED lights powered by solar, pack of 8.',
    price: '$45.00',
    availability: 'In Stock',
    shipping: 'Free delivery on orders over $40',
    rating: '4.6/5',
    reviewsCount: 120,
    warranty: '2-year warranty',
    discount: {
      value: '10% off',
      deadline: 'August 7, 2025',
    },
    phone: '+1 321-654-9870',
    telegram: 'https://t.me/ecohomegear',
    tiktok: 'https://www.tiktok.com/@ecohomegear',
  },
  {
    id: 6,
    companyLogo: 'https://randomuser.me/api/portraits/men/22.jpg',
    companyName: 'Office Essentials Ltd.',
    location: 'Boston, MA',
    postDate: '2025-04-15',
    productPhoto: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    productName: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support and adjustable height.',
    price: '$150.00',
    availability: 'In Stock',
    shipping: 'Free shipping',
    rating: '4.4/5',
    reviewsCount: 95,
    warranty: '1-year warranty',
    discount: {
      value: 'None',
      deadline: '',
    },
    phone: '+1 222-333-4444',
    telegram: 'https://t.me/officeessentials',
    tiktok: 'https://www.tiktok.com/@officeessentials',
  },
  {
    id: 7,
    companyLogo: 'https://randomuser.me/api/portraits/women/22.jpg',
    companyName: 'Outdoor Adventures',
    location: 'Portland, OR',
    postDate: '2025-06-15',
    productPhoto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    productName: 'Camping Tent Deluxe',
    description: '4-person waterproof tent with easy setup.',
    price: '$199.99',
    availability: 'Limited Stock',
    shipping: 'Shipping fee: $20',
    rating: '4.4/5',
    reviewsCount: 110,
    warranty: '1-year warranty included',
    discount: {
      value: 'None',
      deadline: '',
    },
    phone: '+1 444-555-6666',
    telegram: 'https://t.me/outdooradventures',
    tiktok: 'https://www.tiktok.com/@outdooradventures',
  },
];

const ForSale = () => {
  const [visibleContacts, setVisibleContacts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleContact = (id) => {
    setVisibleContacts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Sort posts by newest date first
  const sortedPosts = [...forSalePosts].sort(
    (a, b) => new Date(b.postDate) - new Date(a.postDate)
  );

  // Filter by search term (productName or location)
  const filteredPosts = sortedPosts.filter((post) => {
    if (!searchTerm.trim()) return true;
    const lowerSearch = searchTerm.toLowerCase();
    return (
      post.productName.toLowerCase().includes(lowerSearch) ||
      post.location.toLowerCase().includes(lowerSearch)
    );
  });

  // Take max 7 posts
  const latestSeven = filteredPosts.slice(0, 7);

  // Split into 3 columns: 3 in first, 2 in second, 2 in third
  const columns = [
    latestSeven.slice(0, 3),
    latestSeven.slice(3, 5),
    latestSeven.slice(5, 7),
  ];

  return (
    <div className="forsale-page">
      <h2 className="forsale-title">
        Browse our offers — delivered at the right time and place!
      </h2>
      <div className="top-action-row">
        <input
          type="text"
          className="search-input"
          placeholder="Search a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search items or location"
        />
      </div>

      <div className="forsale-grid">
        {columns.map((columnPosts, colIdx) => (
          <div className="forsale-column" key={colIdx}>
            {columnPosts.map((post) => (
              <div className="forsale-item" key={post.id}>
                <div className="forsale-header">
                  <img
                    src={post.companyLogo}
                    alt={`${post.companyName} Logo`}
                    className="company-logo"
                  />
                  <div className="company-info">
                    <h3>{post.companyName}</h3>
                    <p>📍 {post.location}</p>
                    <p>📅 Posted on: {post.postDate}</p>
                  </div>
                </div>

                <div className="forsale-product">
                  <img
                    src={post.productPhoto}
                    alt={post.productName}
                    className="product-photo"
                  />
                  <div className="product-details">
                    <h4>🛠️ Product: {post.productName}</h4>
                    <p>💬 Description: {post.description}</p>
                    <p>💵 Price: {post.price}</p>
                    <p>📦 Availability: {post.availability}</p>
                    <p>🚚 Shipping: {post.shipping}</p>
                    <p>
                      ⭐ Rated {post.rating} by {post.reviewsCount} customers
                    </p>
                    <p>🔒 {post.warranty}</p>

                    {post.discount.value !== 'None' && (
                      <p className="discount-info">
                        🔥 Discount: <strong>{post.discount.value}</strong> until{' '}
                        <strong>{post.discount.deadline}</strong>
                      </p>
                    )}

                    <div className="buttons">
                      <button
                        className="contact-btn"
                        onClick={() => toggleContact(post.id)}
                      >
                        {visibleContacts[post.id]
                          ? 'Hide Contact Info'
                          : 'Contact us'}
                      </button>
                    </div>

                    {visibleContacts[post.id] && (
                      <div className="contact-info">
                        <p>
                          <strong>📞 Phone:</strong>{' '}
                          <a href={`tel:${post.phone}`}>{post.phone}</a>
                        </p>
                        <p>
                          <strong>📨 Telegram:</strong>{' '}
                          <a
                            href={post.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Open Telegram
                          </a>
                        </p>
                        <p>
                          <strong>🎵 TikTok:</strong>{' '}
                          <a
                            href={post.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View TikTok Profile
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForSale;
