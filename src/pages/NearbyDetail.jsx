import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Skeleton loader
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const MESSAGE_API = "https://djanagobackend-5.onrender.com/api/cat";

// Floating chat box
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
    } catch {
      setError("There was a problem submitting your message.");
    } finally {
      setLoading(false);
    }
  };

  if (isImageZoomed) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border p-3">
        {submitted && (
          <div className="bg-green-100 text-green-700 text-sm p-2 rounded mb-1 text-center">
            ✅ Message submitted!
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-1 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="relative flex">
          <textarea
            placeholder="Write what you want to buy/sell & your phone number..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            className="flex-1 rounded-full px-6 py-2 pr-16 border resize-none"
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2"
          >
            {loading ? "..." : <ArrowRight size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Product Detail Page
const NearbyDetail = () => {
  const { state } = useLocation();
  const product = state?.product;

  const [imgLoaded, setImgLoaded] = useState({});
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) return <p className="text-center mt-20">Product not found</p>;

  const images = [
    product.product_photo,
    ...(product.images || []).map((img) => img.image),
  ].filter(Boolean);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(handleNext, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4">
        <img
          src={product.profile_photo || "https://via.placeholder.com/60"}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{product.company_name}</h2>
          <p>📍 {product.location}</p>
          <p>📞 {product.contact_phone}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Media */}
        <div className="flex-1">
          {product.product_video && (
            <video
              src={product.product_video}
              controls
              className="w-full rounded mb-4"
              onLoadedData={() => setVideoLoaded(true)}
            />
          )}

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                className="w-full h-[450px] object-cover rounded cursor-pointer"
                onClick={() => setSelectedImage(images[currentIndex])}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow space-y-4">
          <p>
            <strong>Description:</strong> {product.description}
          </p>

          {/* FOR WHOM */}
          {product.for_whom && (
            <div>
              <h4 className="font-semibold mb-1">👥 Suitable For</h4>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {product.for_whom}
              </span>
            </div>
          )}

          {/* ADDITIONAL TIPS */}
          {product.additional_tips && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <h4 className="font-semibold mb-1">💡 Additional Tips</h4>
              <p className="text-sm text-gray-700">{product.additional_tips}</p>
            </div>
          )}

          {product.contact_telegram && (
            <a
              href={product.contact_telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              <FaTelegramPlane /> Telegram
            </a>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
};

export default NearbyDetail;
