import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Week.css';

const Week= () => {
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    fetch('https://djanagobackend-5.onrender.com/discounts/weeklydiscounts/')
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
      <section className="featured-section">

        <div className="search-bar">
          <label htmlFor="search">
            🎯 <strong>We are here to offer our weekly discounts:</strong> 👀 💡
          </label>
          <input
            type="text"
            id="search"
            placeholder="Browse..."
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
                    
                    <p> <strong>{item.company_name}</strong> </p>
                  
                    
                  </div>
                  {item.contact_phone && (
                        <span> 📞 {item.contact_phone}</span>
                      )}
                      
                  <p className="poster-location">📍<strong>location: {item.location}</strong></p>
                  
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

                {/* Product Name - placed below images */}
                <h6 className="product-title">{item.product_name}</h6>

                {/* View More Button */}
                {remainingImages.length > 0 && (
                  <button
                    className="view-more-btn"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expandedProductId === item.id ? 'hide' : 'more..'}
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
                        onClick={() => setZoomedImage(src)}
                      />
                    ))}
                  </div>
                )}

                {/* Product Details shown only when expanded */}
                {expandedProductId === item.id && (
                  <div className="product-details">
                    <p>📝 <strong>Description:</strong> {item.description}</p>
                    <p className="posted-date"><strong>posted-date:</strong> {new Date(item.date_posted).toLocaleDateString()}</p>
                    <p className="contact">
                      {item.contact_telegram && (
                        <a href={item.contact_telegram} target="_blank" rel="noopener noreferrer">
                          📲 Telegram
                        </a>
                      )}
                       {item.contact_tick && (
                        <a href={item.contact_tick} target="_blank" rel="noopener noreferrer">
                          📲 Ticktalk
                        </a>
                      )}
                      
                    </p>
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

export default Week;
