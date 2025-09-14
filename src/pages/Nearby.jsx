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
              `https://djanagobackend-5.onrender.com/api/products/nearby/?lat=${lat}&lng=${lng}&radius=2`
            );
            if (!response.ok) throw new Error('No internet connection nearby shops');
            const data = await response.json();
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
          <p className="text-center text-gray-500">No nearby shops found.</p>
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
                  className="w-9 h-9 rounded-full object-cover border border-gray-300"
                />

                {/* Info Row: stretch across screen */}
  <div className="flex-1 flex justify-between items-center px-4">
  <div className="flex items-center gap-6">
    <p className="text-sm font-semibold text-blue-500">{item.product_name}</p>
    <p className="text-sm font-semibold truncate max-w-[120px]">{item.company_name}</p>
    <p className="text-sm text-gray-600 truncate max-w-[150px]">📍 {item.location}</p>
    {item.contact_phone && (
      <p className="text-sm text-gray-600 truncate max-w-[120px]">📞 {item.contact_phone}</p>
    )}
    <span className="truncate max-w-[100px]">
      <p className="text-sm font-semibold">
        {item.discount === "ended" ? "Discount Ended" : `${item.discount}% off`}
      </p>
    </span>
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
