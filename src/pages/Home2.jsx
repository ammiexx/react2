import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="home-container">
      {/* <header className="home-header">
        <h1 className="typing-text">
          <span className="typed-sentence">
            Purchase what you want, sell what you offer — your opportunity starts here.
          </span>
        </h1>
        <p>Make your business grow and buy quality products</p>
        <div className="home-buttons">
          <Link to="/forsale" className="btn btn-primary">Sellers</Link>
          <Link to="/wanted" className="btn btn-secondary">Buyers</Link>
        </div>
      </header> */}

      <section className="featured-section">
        <h2>Browse your favorite product</h2>
        <div className="featured-grid">
          {products.map(item => (
            <div className="featured-item-row" key={item.id}>

              {/* Poster info at top */}
              <div className="poster-info-top">
                <div className="poster-meta">
                  <img
                    src={item.profile_photo || 'https://via.placeholder.com/60'}
                    alt={`${item.first_name} ${item.last_name}`}
                    className="profile-photo"
                  />
                  <p className="poster-name">{item.first_name} {item.last_name}</p>
                </div>
                <p className="poster-location">📍 {item.location}</p>
                <p className="posted-date">🗓️ {new Date(item.date_posted).toLocaleDateString()}</p>
              </div>

              {/* Product image and details in row */}
              <div className="product-row">
                <div className="product-image">
                  <img src={item.product_photo} alt={item.product_name} />
                </div>

                <div className="product-details">
                  <h3>{item.product_name}</h3>
                  <p>🏢 <strong>Company Name:</strong> {item.company_name}</p>
                  <p>💵 <strong>Price:</strong> ${item.price}</p>
                  <p>🏷️ <strong>Category:</strong> {item.category}</p>
                  <p>🆕 <strong>Condition:</strong> {item.condition}</p>
                  <p>📝 <strong>Description:</strong> {item.description}</p>
                  <p className="contact">
                    {item.contact_telegram && (
                      <a href={item.contact_telegram} target="_blank" rel="noopener noreferrer">
                        📲 Telegram
                      </a>
                    )}
                    {item.contact_phone && (
                      <span> | 📞 {item.contact_phone}</span>
                    )}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
