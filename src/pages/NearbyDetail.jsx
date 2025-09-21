import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThumbsUp, MessageCircle, Share2, ArrowRight } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

// Skeleton loader
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const NearbyDetail = () => {
  const { state } = useLocation();
  const product = state?.product;
  const { isSignedIn, user } = useUser();

  const [imgLoaded, setImgLoaded] = useState({});
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState([]);
  const [shares, setShares] = useState(0);
  const [showCommentInput, setShowCommentInput] = useState(false);

  if (!product) return <p className="text-center mt-20">Product not found</p>;

  // Fetch existing likes, comments, shares from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/products/${product.id}/`); // Assuming your DRF endpoint
        const data = await res.json();
        setComments(data.comments || []);
        setLikes(data.likes || []);
        setShares(data.shares || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [product.id]);

  // Handle like
  const handleLike = async () => {
    if (!isSignedIn) return alert("Please sign in to like this post.");
    const email = user.primaryEmailAddress?.emailAddress;
    let updatedLikes = likes.includes(email)
      ? likes.filter((e) => e !== email)
      : [...likes, email];

    setLikes(updatedLikes);

    // Send to backend
    await fetch(`/api/products/${product.id}/like/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  };

  // Handle share
  const handleShare = async () => {
    if (!isSignedIn) return alert("Please sign in to share.");
    navigator.clipboard.writeText(`${window.location.origin}/nearby-detail?id=${product.id}`);
    alert("Link copied!");
    
    setShares((prev) => prev + 1);
    await fetch(`/api/products/${product.id}/share/`, { method: "POST" });
  };

  // Handle comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn || !newComment.trim()) return;

    const commentData = {
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Anonymous",
      text: newComment.trim(),
    };

    setComments((prev) => [...prev, commentData]);
    setNewComment("");
    setSubmitted(true);

    // Send to backend
    await fetch(`/api/products/${product.id}/comment/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    setTimeout(() => setSubmitted(false), 2000);
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
          <p className="text-gray-600">
            🗓 Posted: {new Date(product.date_posted).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Product Video */}
      {product.product_video && (
        <div className="mb-6">
          <div className="relative w-full max-h-80 mb-2">
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

          {/* Action buttons */}
          <div className="flex justify-around items-center text-gray-700 mb-4 border-t pt-2">
           

           
          </div>

          {/* Comment input */}
          {showCommentInput && (
            <div className="w-full bg-white rounded-t-xl shadow-lg border-t border-gray-200 mb-4 p-2">
              {submitted && (
                <div className="bg-green-100 text-green-700 text-sm font-medium p-2 rounded mb-1 text-center">
                  ✅ Comment submitted!
                </div>
              )}
              <form onSubmit={handleCommentSubmit} className="relative flex w-full mb-2">
                <textarea
                  placeholder={isSignedIn ? "Write a comment..." : "Sign in to comment"}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={1}
                  className="flex-1 text-black placeholder-gray-500 bg-white rounded-full px-6 py-1 pr-16 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-inner w-full resize-none overflow-y-auto"
                  disabled={!isSignedIn}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleCommentSubmit(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || !newComment.trim()}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-2 transition disabled:opacity-50 ${
                    newComment.trim()
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {loading ? <span className="animate-pulse">...</span> : <ArrowRight size={20} />}
                </button>
              </form>

              {/* Comments list */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {comments.map((c, idx) => (
                  <div key={idx} className="bg-gray-100 p-2 rounded shadow">
                    <span className="font-semibold text-blue-600">{c.name}</span>: {c.text}
                  </div>
                ))}
              </div>
            </div>
          )}
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
