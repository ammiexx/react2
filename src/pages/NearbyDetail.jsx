import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

// Skeleton box while images/videos load
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const NearbyDetail = () => {
  const { state } = useLocation();
  const navigate=useNavigate();
  const product = state?.product;

  if (!product) return <p className="text-center mt-20">Product not found</p>;

  const { isSignedIn, user } = useUser();
  const [imgLoaded, setImgLoaded] = useState({});
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Toggle Like
  const handleLike = (idx) => {
    if (!isSignedIn) {
      alert("Please sign in to like this post.");
      return;
    }

    const email = user.primaryEmailAddress?.emailAddress;
    setImgLoaded((prev) => {
      const likes = prev[`likes-${idx}`] || [];
      const hasLiked = likes.includes(email);

      return {
        ...prev,
        [`likes-${idx}`]: hasLiked
          ? likes.filter((e) => e !== email)
          : [...likes, email],
      };
    });
  };

  // Add comment
  const handleComment = (idx, text) => {
    if (!isSignedIn) {
      alert("Please sign in to comment.");
      return;
    }
    const email = user.primaryEmailAddress?.emailAddress;
    setImgLoaded((prev) => ({
      ...prev,
      [`comments-${idx}`]: [
        ...(prev[`comments-${idx}`] || []),
        { email, text },
      ],
    }));
  };

  // Share
  const handleShare = (idx) => {
    if (!isSignedIn) {
      alert("Please sign in to share.");
      return;
    }

    const shareUrl = `${window.location.origin}/nearby-detail?id=${product.id}#img-${idx}`;
    if (navigator.share) {
      navigator.share({
        title: product.product_name,
        text: "Check out this product!",
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Image link copied!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product Details */}
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
          />
        </div>
      )}

      {/* Product Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
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

              {/* Price Overlay */}
              {product.price && (
                <span className="absolute bottom-2 right-2 bg-green-600 text-white text-sm font-semibold px-2 py-1 rounded-lg shadow">
                  ${product.price}
                </span>
              )}

              {/* Like / Comment / Share */}
              <div className="flex justify-around items-center text-sm text-gray-700 mt-2 border-t pt-1">
                {/* Like Button */}
                <button
                  onClick={() => handleLike(idx)}
                  className={`flex items-center gap-1 ${
                    imgLoaded[`likes-${idx}`]?.includes(
                      user?.primaryEmailAddress?.emailAddress
                    )
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600"
                  }`}
                >
                  <ThumbsUp size={16} /> {imgLoaded[`likes-${idx}`]?.length || 0}
                </button>

                {/* Comment Button */}
    {/* Comment Button */}
<button
  onClick={() => navigate("/comments", { state: { product } })}
  className="p-1 rounded-full hover:bg-gray-200 transition"
>
  <MessageCircle size={18} />
</button>



                {/* Share Button */}
                <button
                  onClick={() => handleShare(idx)}
                  className="hover:text-green-600 flex items-center gap-1"
                >
                  <Share2 size={16} /> 
                </button>
              </div>

              {/* Comment Box */}
              {imgLoaded[`showComment-${idx}`] && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="w-full border rounded px-2 py-1 text-xs"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const val = e.target.value.trim();
                        if (!val) return;
                        handleComment(idx, val);
                        e.target.value = "";
                      }
                    }}
                  />
                  <div className="space-y-1 mt-1 max-h-32 overflow-y-auto">
                    {(imgLoaded[`comments-${idx}`] || []).map((c, i) => (
                      <p
                        key={i}
                        className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded"
                      >
                        <span className="font-semibold">{c.email}:</span> {c.text}
                      </p>
                    ))}
                  </div>
                </div>
              )}
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
      <div className="bg-gray-100 p-4 rounded mt-4">
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
