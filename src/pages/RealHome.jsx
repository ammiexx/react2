import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RealHome.css';

const RealHome = () => {
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    fetch('https://djanagobackend-5.onrender.com/api/RealEstates/')
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
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Find Your Dream Home Today</h1>
          <p>🏡 Browse our latest real estate listings, from cozy apartments to luxurious villas.</p>
        </div>
      </section>

      <section className="featured-section">
        <div className="search-bar">
          <label htmlFor="search">
            🔍 <strong>Explore our property listings:</strong>
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="featured-grid">
          {[0, 1, 2].map(col => (
            <div className="featured-column" key={col}>
              {filteredProducts
                .filter((_, idx) => idx % 3 === col)
                .map(item => {
                  const allImages = [item.product_photo, ...(item.images || []).map(img => img.image)];
                  const firstFourImages = allImages.slice(0, 4);
                  const remainingImages = allImages.slice(4);

                  return (
                    <div className="featured-item-row" key={item.id}>
                      <div className="poster-info-top">
                        <div className="poster-meta">
                          <img
                            src={item.profile_photo || 'https://via.placeholder.com/60'}
                            alt={`${item.first_name} ${item.last_name}`}
                            className="profile-photo"
                          />
                          <p><strong>{item.company_name}</strong></p>
                        </div>
                        {item.contact_phone && (
                          <span>📞 {item.contact_phone}</span>
                        )}
                        <p className="poster-location">
                          📍 <strong>{item.location}</strong>
                        </p>
                      </div>

                      {/* Badges */}
                      <div className="badge-container">
                        <span className="badge-for-sale">🏷️ For Sale</span>
                        {item.featured && <span className="badge-featured">✨ Featured</span>}
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

                      <h6 className="product-title">{item.product_name}</h6>

                      {item.price && (
                        <p className="price-tag">💲 {item.price.toLocaleString()} ETB</p>
                      )}

                      {remainingImages.length > 0 && (
                        <button
                          className="view-more-btn"
                          onClick={() => toggleExpand(item.id)}
                        >
                          {expandedProductId === item.id ? 'Hide' : 'More...'}
                        </button>
                      )}

                      {expandedProductId === item.id && (
                        <>
                          <div className="extra-images">
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
                          <div className="product-details">
                            <p><strong>📝 Description:</strong> {item.description}</p>
                            <p className="posted-date"><strong>📅 Posted:</strong> {new Date(item.date_posted).toLocaleDateString()}</p>
                            <p className="contact">
                              {item.contact_telegram && (
                                <a href={item.contact_telegram} target="_blank" rel="noopener noreferrer">
                                  📲 Telegram
                                </a>
                              )}
                            </p>
                            <Link to={`/schedule/${item.id}`} className="cta-button">
                              📆 Schedule Visit
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
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

export default RealHome;
