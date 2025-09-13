import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Nearby = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          try {
            const response = await fetch(
              `https://djanagobackend-5.onrender.com/api/products/`
            );
            if (!response.ok) throw new Error('No internet connection');
            let data = await response.json();

            // Filter for category "fashions" and verified = true
            data = data.filter(
              (item) => item.category === 'decor' && item.verified === true
            );

            setProducts(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('❌ Location access denied. Showing no products.');
          setLoading(false);
        }
      );
    } else {
      setError('❌ Geolocation not supported by this browser.');
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 text-[#2c3e50] font-sans w-full">
 <label htmlFor="search" className="text-xl font-bold mb-3 text-center">
            🎯 <strong>Style every corner of your life — shop the finest decor pieces today 🖼️🏠</strong> 👀 💡
          </label>
      <section className="mb-12 w-full">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex space-x-2">
              <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>
              <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></span>
              <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No decore materials found.</p>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white px-2 py-3 rounded-lg shadow transition-transform hover:scale-[1.01] flex items-center cursor-pointer w-full"
                onClick={() => navigate('/nearby-detail', { state: { product: item } })}
              >
                {/* Profile photo */}
                <img
                  src={item.profile_photo || 'https://via.placeholder.com/60'}
                  alt={`${item.first_name} ${item.last_name}`}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />

                {/* Info Row: stretch across screen */}
                <div className="flex-1 flex justify-between items-center px-4">
                  <div className="flex flex-wrap items-center gap-6">
                    <p className="text-sm font-semibold">{item.product_name}</p>
                    <p className="text-sm font-semibold">{item.company_name}</p>
                    <p className="text-sm text-gray-600">📍 {item.location}</p>
                    {item.contact_phone && (
                      <p className="text-sm text-gray-600">📞 {item.contact_phone}</p>
                    )}
                                     <span>
  <p className="text-sm font-semibold">
    {item.discount === "ended" ? " Discount Ended" : `${item.discount}% off`}
  </p>
</span>
                  </div>
                  {/* Arrow aligned to far right */}
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
