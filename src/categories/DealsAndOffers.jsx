import React, { useState, useEffect } from 'react';
import './DealsAndOffers.css';

const deals = [
  {
    id: 'DO101',
    title: '50% Off on All Electronics',
    description: 'Upgrade your gadgets with half price on selected electronics.',
    validUntil: '2025-12-31',
    image: 'https://via.placeholder.com/300x180?text=Electronics+Deal',
  },
  {
    id: 'DO102',
    title: 'Buy 1 Get 1 Free on Clothes',
    description: 'Refresh your wardrobe with this amazing buy one get one free offer.',
    validUntil: '2025-08-15',
    image: 'https://via.placeholder.com/300x180?text=Clothes+Deal',
  },
  {
    id: 'DO103',
    title: 'Free Shipping on Orders Over $50',
    description: 'Enjoy free shipping when your order exceeds $50.',
    validUntil: '2026-01-01',
    image: 'https://via.placeholder.com/300x180?text=Free+Shipping',
  },
  {
    id: 'DO104',
    title: '20% Cashback on Payment with XYZ Card',
    description: 'Get 20% cashback on all purchases made using XYZ credit card.',
    validUntil: '2025-09-30',
    image: 'https://via.placeholder.com/300x180?text=Cashback+Offer',
  },
];

const DealsAndOffers = () => {
  const [currentDeals, setCurrentDeals] = useState([]);

  useEffect(() => {
    // Simulate fetch and filter valid deals
    const today = new Date();
    const validDeals = deals.filter(
      deal => new Date(deal.validUntil) >= today
    );
    setCurrentDeals(validDeals);
  }, []);

  return (
    <div className="deals-container">
      <h1>Deals & Offers</h1>
      {currentDeals.length === 0 ? (
        <p>No current deals available. Check back soon!</p>
      ) : (
        <div className="deals-grid">
          {currentDeals.map(deal => (
            <div key={deal.id} className="deal-card">
              <img src={deal.image} alt={deal.title} className="deal-image" />
              <div className="deal-info">
                <h3>{deal.title}</h3>
                <p>{deal.description}</p>
                <p className="valid-until">Valid Until: {deal.validUntil}</p>
                <button className="shop-now-btn">Shop Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DealsAndOffers;
