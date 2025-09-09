import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
const MESSAGE_API = 'https://djanagobackend-5.onrender.com/api/cat';
const Chat2 = () => {
  const { isSignedIn, user } = useUser();
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert('Please enter a message.');

    const userName = isSignedIn
      ? user.fullName || user.username || user.primaryEmailAddress?.emailAddress
      : 'Anonymous';

    try {
      setLoading(true);
      const response = await fetch(MESSAGE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, message }),
      });

      if (!response.ok) throw new Error(await response.text());

      setSubmitted(true);
      setMessage('');
      setError('');
    } catch (err) {
      console.error(err);
      setError('There was a problem submitting your message.');
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-gray-100 to-cyan-100 p-6">
      <div className="bg-white max-w-2xl w-full rounded-xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">💬Tell us what you want to Buy(Sell)</h1>
        <p className="text-gray-600 mb-6">Tell us today, the bigger your chance will be</p>
        {submitted && (
          <div className="bg-green-100 text-green-800 text-sm font-medium p-3 rounded mb-4 border border-green-300 transition-opacity duration-500">
            ✅ Message submitted!
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4 border border-red-300 transition-opacity duration-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
          <textarea
            rows="2"
            placeholder="Your item to buy/sell…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat2;
