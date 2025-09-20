import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";

const MESSAGE_API = "https://djanagobackend-5.onrender.com/api/cat";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const CommentsPage = () => {
  const { state } = useLocation();
  const { isSignedIn, user } = useUser();
  const product = state?.product;
  const imageId = state?.imageId; // Pass image identifier when navigating

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(MESSAGE_API);
      const data = await res.json();

      // Filter comments by product and image
      const filtered = data.filter(
        (c) => c.product_id === product.id && c.image_id === imageId
      );

      setComments(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn || !newComment.trim()) return;

    const email = user.primaryEmailAddress?.emailAddress;
    const commentData = {
      product_id: product.id,
      image_id: imageId,
      user_email: email,
      comment: newComment.trim(),
      date_posted: new Date().toISOString(),
    };

    try {
      await fetch(MESSAGE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });
      setNewComment("");
      setSubmitted(true);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col min-h-screen">
      {/* Comments List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {loading
          ? [...Array(5)].map((_, idx) => <SkeletonBox key={idx} className="h-12 w-full" />)
          : comments.map((c, idx) => (
              <div key={idx} className="bg-gray-100 p-3 rounded shadow flex flex-col">
                <span className="font-semibold text-blue-600">{c.user_email}</span>
                <span className="text-gray-700">{c.comment}</span>
              </div>
            ))}
      </div>

      {/* Comment Input */}
      <form onSubmit={handleCommentSubmit} className="relative flex w-full mt-4">
        <textarea
          placeholder={isSignedIn ? "Write a comment..." : "Sign in to comment"}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!isSignedIn}
          rows={2}
          className="flex-1 text-black placeholder-gray-500 bg-white rounded-full px-6 py-3 pr-16 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-inner w-full resize-none overflow-y-auto"
        />
        <button
          type="submit"
          disabled={!isSignedIn || !newComment.trim()}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-2 transition disabled:opacity-50 ${
            newComment.trim() ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 text-gray-500"
          }`}
        >
          <ArrowRight size={20} />
        </button>
      </form>

      {submitted && (
        <p className="text-green-600 text-sm mt-2 text-center">✅ Comment submitted!</p>
      )}
    </div>
  );
};

export default CommentsPage;
