import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const NearbyDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  if (!product) return <p className="text-center mt-20">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Main Row */}
      <div className="flex items-center gap-4 bg-white p-4 rounded shadow mb-6">
        <img
          src={product.profile_photo || 'https://via.placeholder.com/60'}
          alt={`${product.first_name} ${product.last_name}`}
          className="w-16 h-16 rounded-full border border-gray-300 object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800">{product.company_name}</h2>
          <p className="text-gray-600">📍 Location: {product.location}</p>
          {product.contact_phone && <p className="text-gray-600">📞 {product.contact_phone}</p>}
          <p className="text-gray-600">🗓 Posted: {new Date(product.date_posted).toLocaleDateString()}</p>
        </div>
      </div>
{/* Product Video */}
{product.product_video && (
  <div className="mb-6">
    <video
      src={product.product_video} // use the correct field
      controls
      className="w-full max-h-80 rounded shadow"
    >
      Your browser does not support the video tag.
    </video>
  </div>
)}


      {/* Product Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {[product.product_photo, ...(product.images || []).map(img => img.image)].map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Product ${idx}`}
            className="w-full h-40 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
          />
        ))}
      </div>

      {/* Description & Discount */}
      <div className="bg-gray-100 p-4 rounded">
        <p className="text-gray-800 mb-2">📝 <strong>Description:</strong> {product.description}</p>
        {product.discount && <p className="text-gray-800">💰 <strong>Discount:</strong> {product.discount}</p>}
        <div className="flex gap-4 mt-2">
          {product.contact_telegram && (
            <a
              href={product.contact_telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              📲 Telegram
            </a>
          )}
          {product.contact_tick && (
            <a
              href={product.contact_tick}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              📲 TikTok
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NearbyDetail;
