import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import BackButton from '../components/BackButton';

// Load Stripe
const stripePromise = loadStripe('pk_test_51RxBXuC2J5esJHJB3deOeOQ3ZhxYhyM9TT4yjZvE7cSgCQGD3BW2CY0rFFTUmgvLZDgoLRA0QYUNPoWpVqweBgUh00jhNFUdVm');

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

  const handleItemClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } }); // navigate to detail page
  };

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 text-[#2c3e50] font-sans">
      <BackButton className="md:hidden" />
      <section className="mb-12">
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
          <div className="flex flex-col gap-4">
            {products.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition"
              >
                {/* Profile photo */}
                <img
                  src={item.profile_photo || 'https://via.placeholder.com/60'}
                  alt={`${item.first_name} ${item.last_name}`}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />

                {/* Info */}
                <div className="flex-1 mx-4 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                  <p className="text-sm font-semibold">{item.company_name}</p>
                  <p className="text-sm text-gray-600">📍 {item.location}</p>
                  {item.contact_phone && (
                    <p className="text-sm text-gray-600">📞 {item.contact_phone}</p>
                  )}
                  <p className="text-sm text-gray-600">
                    🗓 {new Date(item.date_posted).toLocaleDateString()}
                  </p>
                </div>

                {/* Optional arrow icon */}
                <div className="text-blue-600 font-bold">&gt;</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Nearby;
