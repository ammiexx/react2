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

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow p-4 flex items-center animate-pulse gap-4 w-full">
      <div className="w-16 h-16 rounded-full bg-gray-300" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-4 bg-gray-300 rounded w-1/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
      <div className="w-6 h-6 bg-gray-300 rounded" />
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 text-[#2c3e50] font-sans w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        🎯 Unlock next-gen experiences — shop the ultimate gaming essentials 🎧💥
      </h1>

      <section className="mb-12 w-full">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">
            No gaming essentials found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-transform hover:scale-[1.02] cursor-pointer flex flex-col"
                onClick={() =>
                  navigate('/nearby-detail', { state: { product: item } })
                }
              >
                <img
                  src={item.profile_photo || 'https://via.placeholder.com/150'}
                  alt={`${item.first_name} ${item.last_name}`}
                  className="w-full h-48 object-cover rounded-lg mb-3 border border-gray-200"
                />
                <h2 className="text-lg font-semibold text-blue-600 mb-1">
                  {item.product_name}
                </h2>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {item.company_name}
                </p>
                <p className="text-sm text-gray-500 mb-1">📍 {item.location}</p>
                {item.contact_phone && (
                  <p className="text-sm text-gray-500 mb-1">📞 {item.contact_phone}</p>
                )}
                <div className="text-right text-blue-500 font-bold mt-auto">&gt;</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Nearby;
