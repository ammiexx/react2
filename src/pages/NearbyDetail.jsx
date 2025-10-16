import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";
import { FaTelegramPlane, FaTiktok } from "react-icons/fa";

// Skeleton loader
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const MESSAGE_API = "https://djanagobackend-5.onrender.com/api/cat";

const FloatingChat = ({ isImageZoomed }) => {
  const { isSignedIn, user } = useUser();
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userName = isSignedIn
      ? user.fullName || user.username || user.primaryEmailAddress?.emailAddress
      : "Anonymous";

    try {
      setLoading(true);
      const response = await fetch(MESSAGE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, message }),
      });

      if (!response.ok) throw new Error(await response.text());

      setSubmitted(true);
      setMessage("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("There was a problem submitting your message.");
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  if (isImageZoomed) return null;

  return (
    <div className="fixed bottom-1 left-0 right-0 z-50 w-full max-w-full flex justify-center">
      <div className="w-full max-w-lg bg-white rounded-t-xl shadow-lg border-t border-gray-200">
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
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-2 transition disabled:opacity-50
              ${
                message.trim()
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500"
              }`}
          >
            {loading ? <span className="animate-pulse">...</span> : <ArrowRight size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};

const NearbyDetail = () => {
  const { state } = useLocation();
  const product = state?.product;

  const [imgLoaded, setImgLoaded] = useState({});
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!product) return <p className="text-center mt-20">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Product Header */}
      <div className="flex items-center gap-4 bg-white p-4 rounded shadow">
        <div className="relative w-16 h-16">
          {!imgLoaded.profile && <SkeletonBox className="w-16 h-16 rounded-full" />}
          <img
            src={product.profile_photo || "https://via.placeholder.com/60"}
            alt={`${product.first_name} ${product.last_name}`}
            className={`w-16 h-16 rounded-full border border-gray-300 object-cover transition-opacity duration-500 ${
              imgLoaded.profile ? "opacity-100" : "opacity-0 absolute"
            }`}
            onLoad={() => setImgLoaded((prev) => ({ ...prev, profile: true }))}
          />
        </div>
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
          {!videoLoaded && <SkeletonBox className="w-full h-80 mb-2" />}
          <video
            src={product.product_video}
            controls
            className={`w-full max-h-80 rounded shadow transition-opacity duration-500 ${
              videoLoaded ? "opacity-100" : "opacity-0 absolute"
            }`}
            onLoadedData={() => setVideoLoaded(true)}
          />
        </div>
      )}

      {/* Product Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        {[product.product_photo, ...(product.images || []).map((img) => img.image)].map(
          (src, idx) => (
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
              {product.price && (
                <span className="absolute bottom-2 right-2 bg-green-600 text-white text-sm font-semibold px-2 py-1 rounded-lg shadow z-10">
                  ${product.price}
                </span>
              )}
            </div>
          )
        )}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Zoomed product"
            className="max-w-full max-h-full object-contain transform transition-transform duration-300 hover:scale-110"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            ✕
          </button>
        </div>
      )}

      {/* Description & Contact */}
      <div className="bg-gray-50 p-6 rounded shadow space-y-3">
        <p className="text-gray-800">
          📝 <strong>Description:</strong> {product.description}
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          {product.contact_telegram && (
            <a
              href={product.contact_telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
            >
              <FaTelegramPlane /> Visit Telegram
            </a>
          )}

          {product.contact_tick && (
            <a
              href={product.contact_tick}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow transition"
            >
              <FaTiktok /> TikTok
            </a>
          )}

          {product.discount && (
            <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full shadow">
              🎉 Discount: {product.discount}%
            </span>
          )}
        </div>

        {product.contact_telegram && (
          <p className="text-gray-600 mt-2 text-sm">
            ℹ️ Visit our Telegram to see the price.
          </p>
        )}
      </div>

      <FloatingChat isImageZoomed={!!selectedImage} />
    </div>
  );
};

export default NearbyDetail;
