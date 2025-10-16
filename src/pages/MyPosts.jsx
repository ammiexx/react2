import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { FaTelegramPlane, FaTiktok } from 'react-icons/fa';

const MyPosts = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://djanagobackend-5.onrender.com/api/products/');
        const data = await response.json();

        if (user?.emailAddresses[0]?.emailAddress) {
          const userEmail = user.emailAddresses[0].emailAddress.toLowerCase();
          const filtered = data.filter(
            product => product.email?.toLowerCase() === userEmail
          );
          setProducts(filtered);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Posts</h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-gray-200 rounded-lg h-40 flex flex-col p-4 gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(item => {
            const allImages = [item.product_photo, ...(item.images || []).map(img => img.image)];
            const firstFourImages = allImages.slice(0, 4);
            const remainingImages = allImages.slice(4);

            return (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-transform hover:scale-[1.02] p-4 flex flex-col cursor-pointer"
              >
                {/* Product Header */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={item.profile_photo || 'https://via.placeholder.com/60'}
                    alt={item.company_name}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-blue-600">{item.product_name}</p>
                    <p className="text-sm font-medium text-gray-700">{item.company_name}</p>
                    <p className="text-sm text-gray-500">📍 {item.location}</p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {item.contact_telegram && (
                    <a
                      href={item.contact_telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      <FaTelegramPlane /> Telegram
                    </a>
                  )}
                  {item.contact_tick && (
                    <a
                      href={item.contact_tick}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-white bg-black px-2 py-1 rounded hover:bg-gray-800 text-sm"
                    >
                      <FaTiktok /> TikTok
                    </a>
                  )}
                  {item.discount && (
                    <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                      {item.discount}% OFF
                    </span>
                  )}
                </div>

                {/* More Images Button */}
                {remainingImages.length > 0 && (
                  <button
                    className="mt-1 px-4 py-1 w-[100px] bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full text-xs font-medium shadow hover:from-blue-700 hover:to-blue-800 transition self-start"
                    onClick={() => setExpandedProductId(expandedProductId === item.id ? null : item.id)}
                  >
                    {expandedProductId === item.id ? 'Less..' : 'More...'}
                  </button>
                )}

                {/* Expanded Images */}
                {expandedProductId === item.id && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {remainingImages.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`Extra ${idx}`}
                        className="w-full h-28 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
