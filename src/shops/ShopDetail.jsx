// ShopDetail.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Skeleton loader
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const FloatingChat = ({ isImageZoomed }) => {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      setLoading(true);
      // Replace with your message API
      await fetch("https://djanagobackend-5.onrender.com/api/cat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Anonymous", message }),
      });
      setSubmitted(true);
      setMessage("");
      setError("");
    } catch (err) {
      setError("There was a problem submitting your message.");
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  if (isImageZoomed) return null;

  return (
    <div className="fixed bottom-1 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-lg bg-white rounded-t-xl shadow-lg border-t border-gray-200 p-2">
        {submitted && (
          <div className="bg-green-100 text-green-700 text-sm font-medium p-2 rounded mb-1 text-center">
            ✅ Message submitted!
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-1 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative flex w-full">
          <textarea
            placeholder="Write the item you want to buy/sell & phone number..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            className="flex-1 text-black placeholder-gray-500 bg-white rounded-full px-6 py-1 pr-16 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-inner w-full resize-none overflow-y-auto"
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-2 transition disabled:opacity-50 ${
              message.trim() ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 text-gray-500"
            }`}
          >
            {loading ? <span className="animate-pulse">...</span> : <ArrowRight size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};

const ShopDetail = () => {
  const { state } = useLocation();
  const shop = state?.product;
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgLoaded, setImgLoaded] = useState({});

  if (!shop) return <p className="text-center mt-20">Shop not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Shop Info */}
      <div className="flex items-center gap-4 bg-white p-4 rounded shadow mb-4">
        <div className="relative w-16 h-16">
          {!imgLoaded.profile && <SkeletonBox className="w-16 h-16 rounded-full" />}
          <img
            src={shop.profile_photo || "https://via.placeholder.com/60"}
            alt={`${shop.first_name} ${shop.last_name}`}
            className={`w-16 h-16 rounded-full border border-gray-300 object-cover transition-opacity duration-500 ${
              imgLoaded.profile ? "opacity-100" : "opacity-0 absolute"
            }`}
            onLoad={() => setImgLoaded((prev) => ({ ...prev, profile: true }))}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800">{shop.company_name}</h2>
          <p className="text-gray-600">📍 Location: {shop.location}</p>
          {shop.contact_phone && <p className="text-gray-600">📞 {shop.contact_phone}</p>}
        </div>
      </div>

      {/* Product Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        {[shop.product_photo, ...(shop.images || []).map((img) => img.image)].map((src, idx) => (
          <div
            key={idx}
            className="relative w-full bg-white rounded shadow p-2 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:z-30"
            onClick={() => setSelectedImage(src)}
          >
            {!imgLoaded[idx] && <SkeletonBox className="w-full h-40" />}
            <img
              src={src}
              alt={`Product ${idx}`}
              className={`w-full h-40 object-cover rounded transition-opacity duration-500 ${
                imgLoaded[idx] ? "opacity-100" : "opacity-0 absolute"
              }`}
              onLoad={() => setImgLoaded((prev) => ({ ...prev, [idx]: true }))}
            />
            {shop.price && (
              <span className="absolute bottom-2 right-2 bg-green-600 text-white text-sm font-semibold px-2 py-1 rounded-lg shadow z-10">
                ${shop.price}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Zoomed Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Zoomed"
            className="max-w-full max-h-full object-contain transform transition-transform duration-300 hover:scale-110"
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white text-3xl">
            ✕
          </button>
        </div>
      )}

      {/* Description */}
      <div className="bg-gray-100 p-4 rounded mt-2">
        <p className="text-gray-800 mb-2">
          📝 <strong>Description:</strong> {shop.description}
        </p>
      </div>

      {/* Floating Chat */}
      <FloatingChat isImageZoomed={!!selectedImage} />
    </div>
  );
};

export default ShopDetail;
