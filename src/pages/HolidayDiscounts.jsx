import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTelegramPlane, FaTiktok } from 'react-icons/fa';

const Nearby = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://djanagobackend-5.onrender.com/api/products/`
        );
        if (!response.ok) throw new Error('Failed to fetch products');
        let data = await response.json();

        
        data = data.filter(
          (item) => item.category === 'holyday' && item.verified === true
        );

        setProducts(data);
      } catch (err) {
        setError("No internet connection!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        New offers for every holiday!
      </h2>

      <section className="mb-12 w-full">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white px-4 py-3 rounded-lg shadow animate-pulse flex flex-col gap-2"
              >
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-semibold">
            No holiday discounts found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-transform hover:scale-[1.02] p-4 flex flex-col cursor-pointer"
                onClick={() =>
                  navigate('/nearby-detail', { state: { product: item } })
                }
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={item.profile_photo || 'https://via.placeholder.com/60'}
                    alt={item.company_name}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-blue-600">{item.product_name}</p>
                    <p className="text-sm font-medium text-gray-700">{item.company_name}</p>
                    {item.contact_phone && (
                      <p className="text-sm text-gray-500">📞 {item.contact_phone}</p>
                    )}
                    <p className="text-sm text-gray-500">📍 {item.location}</p>
                    {item.discount && (
                      <p className="text-sm text-green-600 mt-1">💰 {item.discount}% OFF</p>
                    )}
                  </div>
                </div>

                {/* Contact Links */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {item.contact_telegram && (
                    <a
                      href={item.contact_telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600 transition text-sm"
                    >
                      <FaTelegramPlane /> Telegram
                    </a>
                  )}
                 
                </div>

                {/* Call to action */}
                <p className="text-sm text-gray-600 mt-auto">💬 Visit our Telegram to see the price</p>

                <div className="mt-2 text-blue-600 font-bold text-right">&gt;</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Nearby;
