import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
const BeautyHome = () => {
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    fetch('https://djanagobackend-5.onrender.com/beauty/beauties/')
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
    <div className="max-w-[1200px] mx-auto my-10 px-4 text-[#2c3e50] font-sans">
       <BackButton className="md:hidden" />
      {/* Search Section */}
      <section className="mb-12">
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="search" className="text-xl font-bold mb-3 text-center">
            🎯 <strong>Regain your health and beauty by utilizing our products:</strong> 👀 💡
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search what you want to buy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[60%] max-w-[500px] px-4 py-3 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {filteredProducts.length === 0 ? (
            <div className="text-center col-span-full text-lg font-semibold text-pink-700 py-10">
              😢 Loading...
            </div>
          ) : (
            filteredProducts.map(item => {
              const allImages = [item.product_photo, ...(item.images || []).map(img => img.image)];
              const firstFourImages = allImages.slice(0, 4);
              const remainingImages = allImages.slice(4);

              return (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 flex flex-col">
                  {/* Poster Info */}
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.profile_photo || 'https://via.placeholder.com/60'}
                        alt={`${item.first_name} ${item.last_name}`}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <p className="text-sm font-semibold">{item.company_name}</p>
                    </div>
                    {item.contact_phone && (
                      <span className="text-xs text-gray-600">📞 {item.contact_phone}</span>
                    )}
                    <p className="text-xs text-gray-500">📍 <strong>Location:</strong> {item.location}</p>
                  </div>

                  {/* Product Images */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {firstFourImages.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`Image ${idx}`}
                        className="aspect-video object-cover border rounded cursor-pointer hover:scale-105 transition"
                        onClick={() => setZoomedImage(src)}
                      />
                    ))}
                  </div>

                  {/* Product Name */}
                  <h6 className="text-center text-lg font-bold text-[#2c3e50] mt-2 mb-1">{item.product_name}</h6>

                  {/* View More Button */}
                  {remainingImages.length > 0 && (
                    <button
                      className="mt-2 px-4 py-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full text-sm font-semibold shadow hover:from-pink-600 hover:to-pink-700 transition"
                      onClick={() => toggleExpand(item.id)}
                    >
                      {expandedProductId === item.id ? 'Hide' : 'More...'}
                    </button>
                  )}

                  {/* Expanded Images */}
                  {expandedProductId === item.id && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {remainingImages.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`Extra ${idx}`}
                          className="aspect-video object-cover border rounded cursor-pointer hover:scale-105 transition"
                          onClick={() => setZoomedImage(src)}
                        />
                      ))}
                    </div>
                  )}

                  {/* Expanded Details */}
                  {expandedProductId === item.id && (
                    <div className="mt-3 text-sm text-gray-700 space-y-2">
                      <p>📝 <strong>Description:</strong> {item.description}</p>
                      <p><strong>Posted:</strong> {new Date(item.date_posted).toLocaleDateString()}</p>
                      <div className="flex gap-4 text-sm mt-1">
                        {item.contact_telegram && (
                          <a
                            href={item.contact_telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            📲 Telegram
                          </a>
                        )}
                        {item.contact_tick && (
                          <a
                            href={item.contact_tick}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:underline"
                          >
                            📲 Ticktalk
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <img
            src={zoomedImage}
            alt="Zoomed"
            className="max-w-[90%] max-h-[90%] rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default BeautyHome;
