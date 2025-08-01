import React, { useState } from 'react';
import './Fashion.css';

const fashionItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1521334884684-d80222895322',
    category: "Men's Clothing",
    description: 'Tailored suits, casual shirts, jackets, and premium denim wear from leading brands.',
    popularBrands: 'Zara, H&M, Levi’s, Gucci',
    rating: '4.7/5',
    availability: 'Available Nationwide',
    shopLink: 'https://www.zara.com',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542060748-10c28b62716f',
    category: "Women's Clothing",
    description: 'Elegant dresses, professional blazers, trendy tops, and everyday essentials.',
    popularBrands: 'Mango, Prada, Forever 21, Dior',
    rating: '4.9/5',
    availability: 'Limited Edition Collections Available',
    shopLink: 'https://www.mango.com',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9c',
    category: "Children's Clothing",
    description: 'Durable, cute, and comfortable outfits for infants, toddlers, and teens.',
    popularBrands: 'Carter’s, Gap Kids, OshKosh B’gosh',
    rating: '4.6/5',
    availability: 'Seasonal Sales Ongoing',
    shopLink: 'https://www.carters.com',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1562158070-57f8e2168b3e',
    category: 'Footwear',
    description: 'Sneakers, formal shoes, boots, and sandals for all ages and styles.',
    popularBrands: 'Nike, Adidas, Clarks, Puma',
    rating: '4.8/5',
    availability: 'Free Shipping on Orders Above $50',
    shopLink: 'https://www.nike.com',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3',
    category: 'Accessories',
    description: 'Luxury handbags, elegant jewelry, belts, sunglasses, and stylish watches.',
    popularBrands: 'Michael Kors, Coach, Swarovski, Fossil',
    rating: '4.9/5',
    availability: 'New Arrivals Weekly',
    shopLink: 'https://www.michaelkors.com',
  },
];

const Fashion = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="fashion-page">
      <h2 className="fashion-title">👗 Explore Trending Fashion Categories</h2>
      <div className="fashion-list">
        {fashionItems.map((item) => (
          <div className="fashion-card" key={item.id}>
            <img src={item.image} alt={item.category} className="fashion-image" />
            <h3>{item.category}</h3>
            <p><strong>Brands:</strong> {item.popularBrands}</p>
            <p><strong>Availability:</strong> {item.availability}</p>
            <p><strong>Rating:</strong> {item.rating}</p>

            {expanded[item.id] && <p className="description">📝 {item.description}</p>}

            <div className="buttons">
              <button onClick={() => toggleExpand(item.id)}>
                {expanded[item.id] ? 'Hide Info' : 'View More'}
              </button>
              <a href={item.shopLink} target="_blank" rel="noopener noreferrer">
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fashion;
