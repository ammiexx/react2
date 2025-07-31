import React, { useState } from 'react';
import './Whishlist.css';

const sampleWishlist = [
  {
    id: 'P1001',
    name: 'Smartphone XYZ',
    price: 699.99,
    image: 'https://via.placeholder.com/100x100.png?text=Smartphone',
    description: 'Latest 5G smartphone with OLED display.',
  },
  {
    id: 'P1002',
    name: 'Wireless Earbuds',
    price: 149.99,
    image: 'https://via.placeholder.com/100x100.png?text=Earbuds',
    description: 'Noise-cancelling true wireless earbuds.',
  },
  {
    id: 'P1003',
    name: 'Fitness Tracker',
    price: 89.99,
    image: 'https://via.placeholder.com/100x100.png?text=Fitness+Tracker',
    description: 'Track your daily activity and heart rate.',
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(sampleWishlist);

  const handleRemove = (id) => {
    const filtered = wishlist.filter(item => item.id !== id);
    setWishlist(filtered);
  };

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="wishlist-items">
          {wishlist.map(item => (
            <li key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} className="wishlist-image" />
              <div className="wishlist-info">
                <h2>{item.name}</h2>
                <p className="wishlist-description">{item.description}</p>
                <p className="wishlist-price">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="remove-btn"
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
