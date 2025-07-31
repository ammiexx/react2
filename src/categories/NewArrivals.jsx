import React, { useState, useEffect } from 'react';
import './NewArrivals.css';

const sampleProducts = [
  {
    id: 'P2001',
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    image: 'https://via.placeholder.com/180x180?text=Headphones',
  },
  {
    id: 'P2002',
    name: 'Smart Home Speaker',
    price: 129.99,
    image: 'https://via.placeholder.com/180x180?text=Speaker',
  },
  {
    id: 'P2003',
    name: 'Fitness Smartwatch',
    price: 149.99,
    image: 'https://via.placeholder.com/180x180?text=Smartwatch',
  },
  {
    id: 'P2004',
    name: 'Portable Charger 10000mAh',
    price: 39.99,
    image: 'https://via.placeholder.com/180x180?text=Charger',
  },
  {
    id: 'P2005',
    name: '4K Ultra HD Action Camera',
    price: 199.99,
    image: 'https://via.placeholder.com/180x180?text=Camera',
  },
];

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  // Simulate fetching new arrivals data
  useEffect(() => {
    // In real app, fetch from API
    setTimeout(() => {
      setProducts(sampleProducts);
    }, 500);
  }, []);

  return (
    <div className="new-arrivals-container">
      <h1>New Arrivals</h1>
      {products.length === 0 ? (
        <p>Loading new arrivals...</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-img" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
