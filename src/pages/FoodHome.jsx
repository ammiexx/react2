import React, { useEffect, useState } from 'react';
import './FoodHome.css';

const FoodHome = () => {
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    fetch('https://djanagobackend-5.onrender.com/backend/foods/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const toggleExpand = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container food-home">
      <header className="home-header">
        <h1>🍽️ Explore Our Food & Beverage Selections</h1>
        <p>Delicious deals from trusted suppliers across various categories.</p>
      </header>

      <section className="search-bar">
        <label htmlFor="search">
          🔍 <strong>Browse food or drink products you love:</strong>
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search snacks, beverages, etc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      <section className="featured-section">
        <h2 className="subcategory-title">🍕 Food & Beverage Listings</h2>

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
                    <div>
                      <p className="poster-name"><strong>{item.company_name}</strong></p>
                      <p className="poster-location">📍 {item.location}</p>
                    </div>
                  </div>
                  {item.contact_phone && <span className="poster-phone">📞 {item.contact_phone}</span>}
                </div>

                {/* Product Images */}
                <div className="extra-images">
                  {firstFourImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Image ${idx}`}
                      className="extra-image"
                      onClick={() => setZoomedImage(src)}
                    />
                  ))}
                </div>

                {/* Product Name */}
                <h3 className="product-title">{item.product_name}</h3>

                {/* View More Button */}
                {remainingImages.length > 0 && (
                  <button
                    className="view-more-btn"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expandedProductId === item.id ? 'Hide Images' : 'View More'}
                  </button>
                )}

                {/* Expanded Extra Images */}
                {expandedProductId === item.id && (
                  <div className="extra-images expanded">
                    {remainingImages.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`More ${idx}`}
                        className="extra-image"
                        onClick={() => setZoomedImage(src)}
                      />
                    ))}
                  </div>
                )}

                {/* Product Details */}
                {expandedProductId === item.id && (
                  <div className="product-details">
                    <p><strong>📝 Description:</strong> {item.description}</p>
                    <p><strong>📅 Posted:</strong> {new Date(item.date_posted).toLocaleDateString()}</p>
                    <div className="contact-links">
                      {item.contact_telegram && (
                        <a href={item.contact_telegram} target="_blank" rel="noopener noreferrer">
                          📲 Telegram
                        </a>
                      )}
                      {item.contact_tick && (
                        <a href={item.contact_tick} target="_blank" rel="noopener noreferrer">
                          📲 TikTok
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <div className="image-modal" onClick={() => setZoomedImage(null)}>
          <img src={zoomedImage} alt="Zoomed" />
        </div>
      )}
    </div>
  );
};

export default FoodHome;
