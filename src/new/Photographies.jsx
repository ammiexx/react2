import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

        // Filter for category "fashions" and verified = true
        data = data.filter(
          (item) => item.category === 'fashions' && item.verified === true
        );

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 text-[#2c3e50] font-sans w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        🎯 Frame every story in stunning detail — explore premium photography tools 🎞️📷
      </h2>

      <section className="mb-12 w-full">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-white rounded-lg shadow flex items-center p-4 h-32"
              >
                {/* Skeleton for profile photo */}
                <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>

                {/* Skeleton for text info */}
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No photography services or products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white px-4 py-3 rounded-lg shadow hover:scale-[1.01] transition-transform cursor-pointer flex items-center h-32"
                onClick={() =>
                  navigate('/nearby-detail', { state: { product: item } })
                }
              >
                {/* Profile photo */}
                <img
                  src={item.profile_photo || 'https://via.placeholder.com/60'}
                  alt={`${item.first_name} ${item.last_name}`}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300 mr-4"
                />

                {/* Info Row */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-blue-500">{item.product_name}</p>
                    <p className="text-sm font-semibold">{item.company_name}</p>
                  </div>
                  <p className="text-sm text-gray-600">📍 {item.location}</p>
                  {item.contact_phone && (
                    <p className="text-sm text-gray-600">📞 {item.contact_phone}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Nearby;
