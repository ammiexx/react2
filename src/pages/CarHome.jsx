import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import BackButton from '../components/BackButton';
// Load Stripe
const stripePromise = loadStripe('pk_test_51RxBXuC2J5esJHJB3deOeOQ3ZhxYhyM9TT4yjZvE7cSgCQGD3BW2CY0rFFTUmgvLZDgoLRA0QYUNPoWpVqweBgUh00jhNFUdVm');

const CarHome = () => {
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null);

  // Fetch car products
  useEffect(() => {
    fetch('https://djanagobackend-5.onrender.com/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Handle Stripe checkout
  const handleCheckout = async (product) => {
    const stripe = await stripePromise;

    const response = await fetch('http://djanagobackend-5.onrender.com/backend/create-checkout-session/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: product.product_name, price: product.price }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) console.error(result.error.message);
  };

  // Toggle extra images
  const toggleExpand = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  // Filtered list
  const filteredProducts = products.filter(product =>
    product.category === 'carbrands' &&
    product.verified === True &&
    
    (
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  );

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 text-[#2c3e50] font-sans">
       <BackButton className="md:hidden" />
      <section className="mb-12">
        {/* Search */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="search" className="text-xl mb-2 font-bold text-[#2c3e50]">
            🎯 <strong>Reach fast by owning these fancy car brands</strong> 👀 💡
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search what you want to buy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[60%] max-w-[400px] px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 md:grid-cols-2 auto-rows-auto">

          {filteredProducts.map(item => {
            const allImages = [item.product_photo, ...(item.images || []).map(img => img.image)];
            const firstFourImages = allImages.slice(0, 4);
            const remainingImages = allImages.slice(4);

            return (
             <div
  key={item.id}
  className="bg-white p-4 rounded-lg shadow transition-transform hover:scale-[1.01] flex flex-col self-start"
>

                {/* Poster Info */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 p-2 bg-gray-100 border-b border-gray-200 rounded-md">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.profile_photo || 'https://via.placeholder.com/60'}
                      alt={`${item.first_name} ${item.last_name}`}
                      className="w-9 h-9 rounded-full object-cover border border-gray-300"
                    />
                    <p className="text-sm font-semibold text-[#2c3e50]">{item.company_name}</p>
                  </div>
                  {item.contact_phone && (
                    <p className="text-sm text-gray-600">📞 {item.contact_phone}</p>
                  )}
                  <p className="text-xs text-gray-600">📍 <strong>Location:</strong> {item.location}</p>
                </div>

                {/* Product Images */}
                <div className="grid grid-cols-2 gap-1 mt-2 max-w-[700px]">
                  {firstFourImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Image ${idx}`}
                      className="w-[150px] h-[100px] object-cover border border-gray-300 rounded cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setZoomedImage(src)}
                    />
                  ))}
                </div>

                {/* Title */}
                <h6 className="text-lg font-bold text-center text-[#2c3e50] mt-2 mb-2">
                  {item.product_name}
                </h6>

                {/* View More */}
                {remainingImages.length > 0 && (
                  <button
                    className="mt-3 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full text-sm font-semibold shadow hover:from-blue-700 hover:to-blue-800 transition"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expandedProductId === item.id ? 'Hide' : 'More...'}
                  </button>
                )}

                {/* Extra Images and Details */}
                {expandedProductId === item.id && (
                  <>
                    <div className="w-full h-[200px] overflow-hidden rounded-md mb-4">
  <img
    src={item.product_photo}
    alt={item.product_name}
    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
    onClick={() => setZoomedImage(item.product_photo)}
  />
</div>


                    <div className="text-sm text-gray-700 leading-relaxed mt-2 space-y-1">
                      <p>📝 <strong>Description:</strong> {item.description}</p>
                      <p><strong>Posted:</strong> {new Date(item.date_posted).toLocaleDateString()}</p>
                      <div className="flex gap-4">
                        {item.contact_telegram && (
                          <a
                            href={item.contact_telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
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
                  </>
                )}

              </div>
            );
          })}
        </div>
      </section>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-[9999] cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <img src={zoomedImage} alt="Zoomed" className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg transform scale-105 transition" />
        </div>
      )}
    </div>
  );
};

export default CarHome;
