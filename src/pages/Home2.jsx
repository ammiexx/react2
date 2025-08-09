import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null); // 🔍 NEW STATE

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const toggleExpand = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  // 🔎 Filter products by company or product name
  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <section className="featured-section">

        {/* 🔍 Search Input */}
        <div className="search-bar">
          <label htmlFor="search">
            🎯 <strong>Well come to Piyasa 🛍️  We are here to offer our products:</strong> 👀 💡
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search what you want to buy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="featured-grid">
          {filteredProducts.map(item => {
            const allImages = [item.product_photo, ...(item.images || []).map(img => img.image)];
            const firstFourImages = allImages.slice(0, 4);
            const remainingImages = allImages.slice(4);
            return (
              <div className="featured-item-row" key={item.id}>
                {/* Poster Info */}
                <div className="poster-info-top">
                  <div className="poster-meta">
                    <img
                      src={item.profile_photo || 'https://via.placeholder.com/60'}
                      alt={`${item.first_name} ${item.last_name}`}
                      className="profile-photo"
                    />
                    <p className="poster-name">{item.first_name} {item.last_name}</p>
                  </div>
                  <p className="poster-location">📍location: {item.location}</p>
                  <p className="posted-date">🗓️ date: {new Date(item.date_posted).toLocaleDateString()}</p>
                </div>

                {/* Product Images Grid (Main + 3 Extra) */}
                <div className="extra-images">
                  {firstFourImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Image ${idx}`}
                      className="extra-image"
                      onClick={() => setZoomedImage(src)} // 👈 Click to zoom
                    />
                  ))}
                </div>

                {/* View More Button */}
                {remainingImages.length > 0 && (
                  <button
                    className="view-more-btn"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expandedProductId === item.id ? 'hide' : 'see more items'}
                  </button>
                )}

                {/* Expanded Extra Images */}
                {expandedProductId === item.id && (
                  <div className="extra-images">
                    {remainingImages.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`More ${idx}`}
                        className="extra-image"
                        onClick={() => setZoomedImage(src)} // 👈 Click to zoom
                      />
                    ))}
                  </div>
                )}

                {/* Product Details */}
                <div className="product-details">
                  <h3>{item.product_name}</h3>
                  <p>🏢 <strong>Company Name:</strong> {item.company_name}</p>
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
            );
          })}
        </div>
      </section>

      {/* 🖼️ Zoomed Image Modal */}
      {zoomedImage && (
        <div className="image-modal" onClick={() => setZoomedImage(null)}>
          <img src={zoomedImage} alt="Zoomed" />
        </div>
      )}
    </div>
  );
};

export default Home;
