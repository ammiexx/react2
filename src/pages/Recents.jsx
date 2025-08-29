import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Recents= () => {
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null);
  const navigate = useNavigate();

  // Fetch all products from API
  useEffect(() => {
    fetch('https://djanagobackend-5.onrender.com/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Toggle expanded image group
  const toggleExpand = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };
 const filteredProducts = products.filter(product => {
  const postedDate = new Date(product.date_posted);
  const now = new Date();
  const hoursDifference = (now - postedDate) / (1000 * 60 * 60); 
  const isRecent = hoursDifference <= 48;
  const matchesSearch =
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.company_name.toLowerCase().includes(searchTerm.toLowerCase());

  return isRecent && matchesSearch;
});


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <BackButton className="md:hidden" />

      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Explore recent posts</h1>

      </header>

      <section>
        {filteredProducts.length === 0 && (
  <p className="text-center text-gray-500">No recent posts.</p>
)}

        {/* Product Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {filteredProducts.map(item => {
            const allImages = [item.product_photo, ...(item.images || []).map(img => img.image)];
            const firstFourImages = allImages.slice(0, 4);
            const remainingImages = allImages.slice(4);

            return (
              <div key={item.id} className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white hover:shadow-md transition duration-200">
                {/* Poster Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.profile_photo || 'https://via.placeholder.com/60'}
                      alt={`${item.first_name} ${item.last_name}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.company_name}</p>
                      <p className="text-sm text-gray-500">📍 {item.location}</p>
                    </div>
                  </div>
                  {item.contact_phone && (
                    <span className="text-sm text-blue-600 font-medium whitespace-nowrap">📞 {item.contact_phone}</span>
                  )}
                </div>

                {/* Product Images */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {firstFourImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Image ${idx}`}
                      className="w-full h-28 object-cover rounded cursor-pointer hover:scale-105 transition"
                      onClick={() => setZoomedImage(src)}
                    />
                  ))}
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-bold text-gray-700 mb-2">{item.product_name}</h3>

                {/* View More Button */}
                {remainingImages.length > 0 && (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="mt-3 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full text-sm font-semibold shadow hover:from-blue-700 hover:to-blue-800 transition"
                  >
                    {expandedProductId === item.id ? 'Less...' : 'More...'}
                  </button>
                )}

                {/* Expanded Images */}
                {expandedProductId === item.id && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {remainingImages.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`More ${idx}`}
                        className="w-full h-28 object-cover rounded cursor-pointer hover:scale-105 transition"
                        onClick={() => setZoomedImage(src)}
                      />
                    ))}
                  </div>
                )}

                {/* Product Details */}
                {expandedProductId === item.id && (
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>📝 Description:</strong> {item.description}</p>
                    <p><strong>📅 Posted:</strong> {new Date(item.date_posted).toLocaleDateString()}</p>
                    <div className="flex gap-4 mt-2">
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
                          className="text-pink-500 hover:underline"
                        >
                          📲 TikTok
                        </a>
                      )}
                      {item.web_site && (
                        <a
                          href={item.web_site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:underline"
                        >
                          🌐 Website
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
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setZoomedImage(null)}
        >
          <img src={zoomedImage} alt="Zoomed" className="max-h-[90vh] max-w-[90vw] rounded shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default Recents;
