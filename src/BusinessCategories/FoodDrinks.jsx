import React, { useState } from 'react';
import './FoodDrinks.css';

const foodItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc',
    category: 'Fresh Produce',
    description: 'Locally sourced fruits, vegetables, and herbs—picked at peak ripeness.',
    brands: 'Local Farms, Organic Valley, FreshDirect',
    delivery: 'Same-day delivery available',
    rating: '4.9/5',
    link: 'https://www.freshdirect.com',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1566843970291-4d4fb1c0303d',
    category: 'Packaged Foods',
    description: 'Pasta, rice, canned goods, grains, and ready-to-eat meals from top brands.',
    brands: 'Kraft, Barilla, Nestlé, Heinz',
    delivery: 'Nationwide delivery',
    rating: '4.6/5',
    link: 'https://www.instacart.com',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1589881133602-91198362e7d4',
    category: 'Beverages (Juices, Coffee, Tea)',
    description: 'Fresh juices, premium teas, and artisan coffee blends to energize your day.',
    brands: 'Starbucks, Tropicana, Lipton, Nescafé',
    delivery: 'Subscription & bulk discounts available',
    rating: '4.8/5',
    link: 'https://www.amazon.com/beverages',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1542831371-d531d36971e6',
    category: 'Snacks & Sweets',
    description: 'Delicious chips, candies, protein bars, cookies, and indulgent treats.',
    brands: 'Lays, KitKat, Oreo, KIND',
    delivery: 'Free shipping on orders over $30',
    rating: '4.7/5',
    link: 'https://www.walmart.com/grocery/snacks',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1624378445140-8f3e82e83316',
    category: 'Specialty & Organic Foods',
    description: 'Non-GMO, gluten-free, vegan, keto, and international specialty items.',
    brands: 'Whole Foods, Trader Joe’s, Thrive Market',
    delivery: 'Certified organic options available',
    rating: '5.0/5',
    link: 'https://www.wholefoodsmarket.com',
  },
];

const FoodDrinks = () => {
  const [showInfo, setShowInfo] = useState({});

  const toggleInfo = (id) => {
    setShowInfo((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="fooddrinks-page">
      <h2 className="fooddrinks-title">🛒 Shop Delicious Food & Beverages</h2>
      <div className="fooddrinks-list">
        {foodItems.map((item) => (
          <div className="fooddrinks-card" key={item.id}>
            <img src={item.image} alt={item.category} className="fooddrinks-image" />
            <h3>{item.category}</h3>
            <p><strong>Brands:</strong> {item.brands}</p>
            <p><strong>Delivery:</strong> {item.delivery}</p>
            <p><strong>Rating:</strong> {item.rating}</p>

            {showInfo[item.id] && (
              <p className="description">📝 {item.description}</p>
            )}

            <div className="buttons">
              <button onClick={() => toggleInfo(item.id)}>
                {showInfo[item.id] ? 'Hide Info' : 'More Info'}
              </button>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDrinks;
