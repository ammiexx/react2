import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import BackButton from '../components/BackButton';

const MESSAGE_API = 'https://djanagobackend-5.onrender.com/api/cat';

const Chat2 = () => {
  const { isSignedIn, user } = useUser();

  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likesMap, setLikesMap] = useState({});

  const fetchMessages = async () => {
    try {
      const response = await fetch(MESSAGE_API);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data.reverse());
      setError('');
    } catch (err) {
      console.error(err);
      setError('Internet connection is required to load messages.');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Auto-clear success message after 2 seconds
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  // Auto-clear error message after 2 seconds
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
      fetchMessages();
    } catch (err) {
      console.error(err);
      setError('There was a problem submitting your message.');
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = (idx) => {
    if (!isSignedIn) {
      alert('You must be sign up to like a message.');
      return;
    }

    const userId = user.id;

    setLikesMap((prev) => {
      const updated = { ...prev };
      const currentSet = new Set(prev[idx] || []);

      if (currentSet.has(userId)) currentSet.delete(userId);
      else currentSet.add(userId);

      updated[idx] = currentSet;
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-cyan-100 p-6">
      <BackButton className="md:hidden" />
      <div className="bg-white max-w-2xl w-full rounded-xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">💬 Share what you want to be discounted!</h1>
        <p className="text-gray-600 mb-6">We are here to solve your problems!</p>

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
            rows="4"
            placeholder="Write what you want to be discounted..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Previous Messages:</h2>
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-1">
              {messages.map((msg, idx) => {
                const currentLikes = likesMap[idx] || new Set();
                const isLiked = isSignedIn && currentLikes.has(user?.id);

                return (
                  <li
                    key={idx}
                    className="bg-gray-50 rounded-lg p-4 shadow-sm flex flex-col justify-between text-sm text-gray-800"
                  >
                    <div className="font-semibold text-blue-700">{msg.name?.trim() || 'Anonymous'}</div>
                    <div className="mt-1">{msg.message}</div>
                    {msg.created_at && (
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(msg.created_at).toLocaleString()}
                      </div>
                    )}
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleReaction(idx)}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium ${
                          isLiked ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-800'
                        } hover:bg-blue-200 transition`}
                      >
                        👍 {currentLikes.size}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default Chat2;
