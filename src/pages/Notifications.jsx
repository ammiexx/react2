import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import BackButton from '../components/BackButton';

const MESSAGE_API = 'https://djanagobackend-5.onrender.com/api/cat';
const Notification = () => {
  const { isSignedIn, user } = useUser();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [likesMap, setLikesMap] = useState({});
  const [showAll, setShowAll] = useState(false); // To control expanded view
  const fetchMessages = async () => {
    try {
      const response = await fetch(MESSAGE_API);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data.reverse()); // Show most recent first
      setError('');
    } catch (err) {
      console.error(err);
      setError('Internet connection is required to load messages.');
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  const handleReaction = (idx) => {
    if (!isSignedIn) {
      alert('You must be signed in to like a message.');
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
  const visibleMessages = showAll ? messages : messages.slice(0, 8);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-cyan-100 p-6">
      <BackButton className="md:hidden" />
      <div className="bg-white max-w-2xl w-full rounded-xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">💬 Recent Requests</h1>
        <p className="text-gray-600 mb-6">See what others want discounted!</p>
        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4 border border-red-300 transition-opacity duration-500">
            {error}
          </div>
        )}
        <div className="text-left">
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-4 max-h-[75vh] overflow-y-auto pr-1">
              {visibleMessages.map((msg, idx) => {
                const currentLikes = likesMap[idx] || new Set();
                const isLiked = isSignedIn && currentLikes.has(user?.id);
                return (
                  <li
                    key={idx}
                    className="bg-gray-50 rounded-lg p-4 shadow-sm text-sm text-gray-800"
                  >
                    <div className="font-semibold text-blue-700">
                      {msg.name?.trim() || 'Anonymous'}
                    </div>
                    <div className="mt-1">{msg.message}</div>
                    {msg.created_at && (
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(msg.created_at).toLocaleString()}
                      </div>
                    )}
                    <div className="mt-3">
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

          {/* Expand Button */}
          {messages.length > 8 && !showAll && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="text-blue-600 hover:underline font-medium"
              >
                Show more...
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
