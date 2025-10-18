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

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => handleNext(), 5000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      {/* Header Section */}
      <div className="flex items-center gap-4 p-5 rounded-xl shadow-md bg-gradient-to-r from-blue-100 to-blue-200">
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
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800">{product.company_name}</h2>
          <p className="text-gray-700">📍 {product.location}</p>
          {product.contact_phone && <p className="text-gray-700">📞 {product.contact_phone}</p>}
          <p className="text-gray-700">🗓 Posted: {new Date(product.date_posted).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Section: Video + Image Slider */}
        <div className="flex-1 space-y-4">
          {product.product_video && (
            <div className="rounded-xl overflow-hidden shadow-lg bg-gray-50">
              {!videoLoaded && <SkeletonBox className="w-full h-80" />}
              <video
                src={product.product_video}
                controls
                className={`w-full max-h-80 rounded transition-opacity duration-500 ${videoLoaded ? "opacity-100" : "opacity-0 absolute"}`}
                onLoadedData={() => setVideoLoaded(true)}
              />
            </div>
          )}

          <div className="relative w-full rounded-xl shadow-lg overflow-hidden bg-gradient-to-b from-purple-100 to-purple-200">
            {images.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Product ${currentIndex}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-[450px] object-cover cursor-pointer rounded-xl"
                  onClick={() => setSelectedImage(images[currentIndex])}
                />
              </AnimatePresence>
            )}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 flex space-x-2 justify-center w-full">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? "bg-purple-700 scale-125" : "bg-purple-300"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Description + Contact */}
        <div className="flex-1 bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-xl shadow-md space-y-5">
          <p className="text-gray-800 leading-relaxed text-lg">
            📝 <strong>Description:</strong> {product.description}
          </p>

          <p className="text-gray-700 font-medium italic">
            💡 Looking to buy or sell? Reach out directly to the seller!
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {product.contact_telegram && (
              <a
                href={product.contact_telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition font-semibold"
              >
                <FaTelegramPlane /> Telegram
              </a>
            )}
            {product.discount && (
              <span className="bg-yellow-100 text-yellow-800 font-bold px-3 py-1 rounded-full shadow-md">
                🎉 {product.discount}% OFF
              </span>
            )}
          </div>

          <p className="text-gray-700 font-medium">
            🛒 Don't miss this amazing opportunity! Contact now before it's gone.
          </p>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
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
