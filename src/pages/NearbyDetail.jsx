import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

// Placeholder Skeleton while loading images/videos
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

// Placeholder ChatBox (replace with your socket.io chat component)
const ChatBox = ({ userEmail, posterEmail }) => {
  return (
    <div className="w-80 h-96 bg-white rounded shadow-lg p-4 flex flex-col">
      <h3 className="font-bold text-lg mb-2">Chat with Seller</h3>
      <div className="flex-1 border rounded p-2 mb-2 overflow-y-auto">
        {/* Messages will appear here */}
        <p className="text-gray-500 text-sm">Chat messages...</p>
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        className="border rounded px-2 py-1 w-full"
      />
    </div>
  );
};

const NearbyDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  if (!product) return <p className="text-center mt-20">Product not found</p>;

  const { isSignedIn, user } = useUser();
  const [imgLoaded, setImgLoaded] = useState({});
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Toggle Like
  const handleLike = (key) => {
    if (!isSignedIn) {
      alert("Please sign in to like this post.");
      return;
    }

    const email = user.primaryEmailAddress?.emailAddress;
    setImgLoaded((prev) => {
      const likes = prev[`likes-${key}`] || [];
      const hasLiked = likes.includes(email);

      return {
        ...prev,
        [`likes-${key}`]: hasLiked
          ? likes.filter((e) => e !== email)
          : [...likes, email],
      };
    });
  };

  // Share
  const handleShare = (key) => {
    if (!isSignedIn) {
      alert("Please sign in to share.");
      return;
    }

    const shareUrl = `${window.location.origin}/nearby-detail?id=${product.id}`;
    if (navigator.share) {
      navigator.share({
        title: product.product_name,
        text: "Check out this product!",
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product Details */}
      <div className="flex items-center gap-4 bg-white p-4 rounded shadow mb-4">
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
        <div className="mb-4 relative w-full max-h-80">
          {!videoLoaded && <SkeletonBox className="w-full h-80" />}
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
            <div key={idx} className="relative w-full bg-white rounded shadow p-2">
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
                <span className="absolute bottom-2 right-2 bg-green-600 text-white text-sm font-semibold px-2 py-1 rounded-lg shadow">
                  ${product.price}
                </span>
              )}
            </div>
          )
        )}
      </div>

      {/* Single Like / Comment / Share / Chat Row */}
      <div className="flex justify-around items-center text-gray-700 mb-4 border-t pt-2">
        {/* Like */}
        <button
          onClick={() => handleLike("post")}
          className={`flex items-center gap-1 ${
            imgLoaded["likes-post"]?.includes(user?.primaryEmailAddress?.emailAddress)
              ? "text-blue-600 font-semibold"
              : "hover:text-blue-600"
          }`}
        >
          <ThumbsUp size={16} /> {imgLoaded["likes-post"]?.length || 0}
        </button>

        {/* Comment */}
        <button
          onClick={() => navigate("/comments", { state: { product } })}
          className="p-1 rounded-full hover:bg-gray-200 transition"
        >
          <MessageCircle size={18} />
        </button>

        {/* Share */}
        <button
          onClick={() => handleShare("post")}
          className="flex items-center gap-1 hover:text-green-600"
        >
          <Share2 size={16} />
        </button>

        {/* Chat */}
       
      </div>

      {showChat && (
        <div className="fixed bottom-4 right-4 z-50">
          <ChatBox
            userEmail={user.primaryEmailAddress?.emailAddress}
            posterEmail={product.poster_email} // fetch from product
          />
        </div>
      )}

      {/* Discount */}
      {product.discount && (
        <p className="text-gray-800 mb-2">
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
      <div className="bg-gray-100 p-4 rounded mt-2">
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
