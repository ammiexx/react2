import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const MESSAGE_API = "https://djanagobackend-5.onrender.com/api/cat";

const FloatingChat = () => {
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
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert("Please enter a message.");

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

  return (
  <div className="fixed bottom-4 right-4 z-50 w-[95%] max-w-xs sm:max-w-sm">
    <div className="bg-white rounded-xl shadow-lg p-3 text-center max-h-[300px] overflow-auto">
      <h2 className="text-md font-bold text-gray-800 mb-2">
        💬 What do you want to Buy/Sell?
      </h2>

      {submitted && (
        <div className="bg-green-100 text-green-800 text-sm font-medium p-2 rounded mb-2 border border-green-300">
          ✅ Message submitted!
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-2 border border-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          rows="1"
          placeholder="Your item to buy/sell…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-12 border border-gray-300 rounded-md px-2 py-1 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-1 rounded-md font-semibold hover:bg-blue-700 transition text-sm"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  </div>
);

};

export default FloatingChat;
