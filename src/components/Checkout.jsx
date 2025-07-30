// src/pages/Checkout.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Checkout.css';

import ForSale from '../pages/ForSale';
const Checkout = () => {
  const { id } = useParams();
  const product = forSalePosts.find((p) => p.id === parseInt(id));
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Purchase submitted successfully!');
    navigate('/forsale');
  };

  if (!product) {
    return <div className="checkout-container"><p>Product not found.</p></div>;
  }

  return (
    <div className="checkout-container">
      <h2>🛒 Checkout</h2>
      <div className="checkout-product">
        <img src={product.productPhoto} alt={product.productName} />
        <div>
          <h3>{product.productName}</h3>
          <p>Sold by: {product.companyName}</p>
          <p className="price">{product.price}</p>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" required placeholder="Your name" />
        </label>
        <label>
          Phone Number:
          <input type="tel" required placeholder="+1 234-567-8900" />
        </label>
        <label>
          Delivery Address:
          <textarea required placeholder="Enter full address..." />
        </label>
        <button type="submit" className="submit-order">Submit Order</button>
      </form>
    </div>
  );
};

export default Checkout;
