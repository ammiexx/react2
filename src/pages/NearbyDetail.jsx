import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const NearbyDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  if (!product) return <p className="text-center mt-20">Product not found</p>;

  const [imgLoaded, setImgLoaded] = useState({});
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Main Row */}
      <div className="flex items-center gap-4 bg-white p-4 rounded shadow mb-6">
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
          <p className="text-gray-600">
            🗓 Posted: {new Date(product.date_posted).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Product Video */}
      {product.product_video && (
        <div className="mb-6 relative w-full max-h-80">
          {!videoLoaded && <SkeletonBox className="w-full h-80" />}
          <video
            src={product.product_video}
            controls
            className={`w-full max-h-80 rounded shadow transition-opacity duration-500 ${
              videoLoaded ? "opacity-100" : "opacity-0 absolute"
            }`}
            onLoadedData={() => setVideoLoaded(true)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Product Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {[product.product_photo, ...(product.images || []).map((img) => img.image)].map(
          (src, idx) => (
            <div key={idx} className="relative w-full h-40">
              {!imgLoaded[idx] && <SkeletonBox className="w-full h-40" />}
              <img
                src={src}
                alt={`Product ${idx}`}
                className={`w-full h-40 object-cover rounded cursor-pointer hover:scale-105 transition-transform transition-opacity duration-500 ${
                  imgLoaded[idx] ? "opacity-100" : "opacity-0 absolute"
                }`}
                onLoad={() => setImgLoaded((prev) => ({ ...prev, [idx]: true }))}
              />
            </div>
          )
        )}
      </div>

      {/* Discount */}
      {product.discount && (
        <p className="text-gray-800">
          💰 <strong>Discount:</strong>{" "}
          {product.discount === "waiting" ? (
            <span className="text-yellow-500">Waiting for discount...</span>
          ) : product.discount === "ended" ? (
            <span className="text-red-500">Offer ended</span>
          ) : (
            <span className="text-green-500">{product.discount}%</span>
          )}
        </p>
      )}

      {/* Description & Contact */}
      <div className="bg-gray-100 p-4 rounded">
        <p className="text-gray-800 mb-2">
          📝 <strong>Description:</strong> {product.description}
        </p>

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
