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

        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours

        // Filter: verified, numeric discount, posted in last 24h
        data = data.filter(
          (item) =>
            item.verified === true &&
            !['waiting', 'ended'].includes(item.discount) &&
            new Date(item.date_posted) >= oneDayAgo
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
        Only for{" "}
        <span className="text-red-500">Today</span> and{" "}
        <span className="text-yellow-500">Tomorrow</span>!
      </h2>

      <section className="mb-12 w-full">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading ? (
          // 🔹 Skeleton loader
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array(6).fill().map((_, idx) => (
              <div
                key={idx}
                className="bg-white px-2 py-3 rounded-lg shadow animate-pulse flex items-center w-full"
              >
                {/* Skeleton avatar */}
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>

                {/* Skeleton text blocks */}
                <div className="flex-1 flex justify-between items-center px-4">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-5 w-5 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No daily discounts found.</p>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white px-2 py-3 rounded-lg shadow transition-transform hover:scale-[1.01] flex items-center cursor-pointer w-full"
                onClick={() =>
                  navigate('/nearby-detail', { state: { product: item } })
                }
              >
                {/* Profile photo */}
                <img
                  src={item.profile_photo || 'https://via.placeholder.com/60'}
                  alt={`${item.first_name} ${item.last_name}`}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />

                {/* Info Row */}
                <div className="flex-1 flex justify-between items-center px-4">
                  <div className="flex flex-wrap items-center gap-6">
                    <p className="text-sm font-semibold text-blue-500">
                      {item.product_name}
                    </p>
                    <p className="text-sm font-semibold">{item.company_name}</p>
                    <p className="text-sm text-gray-600">📍 {item.location}</p>
                    {item.contact_phone && (
                      <p className="text-sm text-gray-600">
                        📞 {item.contact_phone}
                      </p>
                    )}
                    <p className="text-sm text-green-600">
                      💰 {item.discount}%
                    </p>
                  </div>
                  <div className="text-blue-600 font-bold">&gt;</div>
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
