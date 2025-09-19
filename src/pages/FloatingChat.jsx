import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";

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

  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 w-full max-w-full flex justify-center">

     <div className="w-full max-w-lg bg-black rounded-t-xl shadow-lg border-t border-gray-800">

        {submitted && (
          <div className="bg-green-800 text-green-100 text-sm font-medium p-2 rounded mb-2 text-center">
            ✅ Message submitted!
          </div>
        )}
        {error && (
          <div className="bg-red-800 text-red-100 text-sm p-2 rounded mb-2 text-center">
            {error}
          </div>
        )}

      <form onSubmit={handleSubmit} className="relative flex w-full">
  <textarea
    placeholder="Write the item you want to buy/sell & phone number..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    rows={1} // start with one row
    className="flex-1 text-white placeholder-gray-400 bg-black rounded-full px-6 py-3 pr-16 border border-white focus:outline-none focus:ring-2 focus:ring-gray-700 shadow-inner w-full resize-none overflow-y-auto"
  />

  <button
    type="submit"
    disabled={loading || !message.trim()}
    className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-2 transition disabled:opacity-50
      ${message.trim() ? "bg-white text-black hover:bg-gray-200" : "bg-gray-700 text-gray-400 hover:bg-gray-600"}`}
  >
    {loading ? <span className="animate-pulse">...</span> : <ArrowRight size={20} />}
  </button>
</form>

      </div>
    </div>
  );
};

export default FloatingChat;
