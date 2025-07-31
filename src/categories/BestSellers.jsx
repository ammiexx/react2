import React, { useState, useEffect } from 'react';
import './BestSellers.css';

const bestSellingProducts = [
  {
    id: 'BS1001',
    name: 'Noise Cancelling Headphones',
    price: 199.99,
    image: 'https://via.placeholder.com/180x180?text=Headphones',
  },
  {
    id: 'BS1002',
    name: 'Smartphone with OLED Display',
    price: 899.99,
    image: 'https://via.placeholder.com/180x180?text=Smartphone',
  },
  {
    id: 'BS1003',
    name: 'Ergonomic Office Chair',
    price: 149.99,
    image: 'https://via.placeholder.com/180x180?text=Chair',
  },
  {
    id: 'BS1004',
    name: 'Wireless Mouse',
    price: 29.99,
    image: 'https://via.placeholder.com/180x180?text=Mouse',
  },
  {
    id: 'BS1005',
    name: '4K UHD Monitor',
    price: 399.99,
    image: 'https://via.placeholder.com/180x180?text=Monitor',
  },
];

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate fetching best sellers data
    setTimeout(() => {
      setProducts(bestSellingProducts);
    }, 500);
  }, []);

  return (
    <div className="best-sellers-container">
      <h1>Best Sellers</h1>
      {products.length === 0 ? (
        <p>Loading best sellers...</p>
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

export default BestSellers;
