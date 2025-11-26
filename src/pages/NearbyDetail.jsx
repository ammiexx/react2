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
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-200 p-3">
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
            placeholder="Write what you want to buy/sell & your phone number..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            className="flex-1 text-black placeholder-gray-500 bg-gray-50 rounded-full px-6 py-2 pr-16 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none w-full"
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-2 transition disabled:opacity-50
              ${message.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500"}`}
          >
            {loading ? <span className="animate-pulse">...</span> : <ArrowRight size={20} />}
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

  const images = [product.product_photo, ...(product.images || []).map((img) => img.image)].filter(Boolean);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Optional auto-slide every 5 seconds
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => handleNext(), 3000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Product Header */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md mb-6">
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
          <h2 className="text-2xl font-bold text-gray-800">{product.company_name}</h2>
          <p className="text-gray-600">📍 Location: {product.location}</p>
          {product.contact_phone && <p className="text-gray-600">📞 {product.contact_phone}</p>}
          <p className="text-gray-600">🗓 Posted: {new Date(product.date_posted).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Main content: Video + Image Slider + Description */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left section: Video + Image Slider */}
        <div className="flex-1">
          {/* Product Video */}
          {product.product_video && (
            <div className="mb-4 rounded overflow-hidden shadow-lg">
              {!videoLoaded && <SkeletonBox className="w-full h-80 mb-2" />}
              <video
                src={product.product_video}
                controls
                className={`w-full max-h-80 rounded transition-opacity duration-500 ${
                  videoLoaded ? "opacity-100" : "opacity-0 absolute"
                }`}
                onLoadedData={() => setVideoLoaded(true)}
              />
            </div>
          )}

          {/* Image Slider */}
          <div className="relative w-full flex flex-col items-center justify-center overflow-hidden rounded-xl shadow-lg bg-white">
            {images.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Product ${currentIndex}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full h-[450px] object-cover rounded-xl cursor-pointer"
                  onClick={() => setSelectedImage(images[currentIndex])}
                />
              </AnimatePresence>
            )}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-3 flex space-x-2">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right section: Description + Contact */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md space-y-4">
          <p className="text-gray-800 leading-relaxed">
            📝 <strong>Description:</strong> {product.description}
          </p>

         <div className="flex flex-wrap items-center gap-3">
  {product.contact_telegram && (
    <a
      href={product.contact_telegram}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition"
    >
      <FaTelegramPlane /> Telegram
    </a>
  )}
 {product.discount && (() => {
  const DAY_MS = 1000 * 60 * 60 * 24;
  const now = new Date();
  const postedDate = product.date_posted ? new Date(product.date_posted) : new Date();

  // Calculate start date
  const startOffset = Number(product.discount_start_date);
  const startDate = !isNaN(startOffset) ? new Date(postedDate.getTime() + startOffset * DAY_MS) : postedDate;

  // Calculate end date (if discount_duration exists)
  const durationDays = Number(product.discount_duration);
  const endDate = !isNaN(durationDays) ? new Date(startDate.getTime() + durationDays * DAY_MS) : null;

  // Remaining days
  const remainingToBegin = startDate > now ? Math.ceil((startDate - now) / DAY_MS) : 0;
  const remainingToEnd = endDate && endDate > now ? Math.ceil((endDate - now) / DAY_MS) : 0;

  // Determine status and badge
  let statusText = "";
  let badgeColor = "";
  let emoji = "";

  if (product.discount === "waiting") {
    statusText = "Waiting for discount";
    badgeColor = "bg-gray-200 text-gray-600";
    emoji = "⏳";
  }
  
  else if (product.discount === "coming") {
                  statusText = "Coming Soon";
                  badgeColor = "bg-gray-200 text-gray-600";
                  emoji = "🔜";
                }else if (remainingToBegin > 0) {
    statusText = `${remainingToBegin} day${remainingToBegin > 1 ? "s" : ""} left to begin`;
    badgeColor = "bg-blue-100 text-blue-800"; // same as Shops for 'to begin'
    emoji = "🕒";
  } else if (remainingToEnd > 0) {
    statusText = `${remainingToEnd} day${remainingToEnd > 1 ? "s" : ""} left to end`;
    badgeColor = "bg-yellow-100 text-yellow-800"; // same as Shops for 'active'
    emoji = "⏳";
  } else if (!endDate) {
    statusText = "⚡ Discount active";
    badgeColor = "bg-yellow-100 text-yellow-800"; // active ongoing
    emoji = "⚡";
  } else {
    statusText = "Discount expired";
    badgeColor = "bg-red-100 text-red-700";
    emoji = "❌";
  }

  return (
    <div className="flex flex-col">
      {/* Only show OFF badge if discount is not waiting */}
      {product.discount !== "waiting" && (
        <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full shadow mb-1">
          🎉 {product.discount}% OFF
        </span>
      )}
      <span className={`text-sm font-semibold px-2 py-1 rounded ${badgeColor}`}>
        {emoji} {statusText}
      </span>
    </div>
  );
})()}


</div>

        </div>
      </div>

      {/* Fullscreen Modal for Image */}
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

   
    </div>
  );
};

export default NearbyDetail;
