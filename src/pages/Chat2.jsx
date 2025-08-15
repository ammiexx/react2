// src/components/Chat2.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import './Chat.css';

const BACKEND_URL = 'https://djanagobackend-5.onrender.com/api/cat';

const Chat2 = () => {
  const { isSignedIn, user } = useUser(); // Clerk user state

  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [likesMap, setLikesMap] = useState({}); // Tracks likes: { [messageIndex]: Set<userId> }
  const [replyingTo, setReplyingTo] = useState(null);
  const [replies, setReplies] = useState({});

  const fetchMessages = async () => {
    try {
      const response = await fetch(BACKEND_URL);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data.reverse());
      setError('');
    } catch (err) {
      console.error(err);
      setError('It needs internet connection');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    const userName = isSignedIn
      ? user.fullName || user.username || user.primaryEmailAddress?.emailAddress
      : "Anonymous";

    try {
      setLoading(true);
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, message }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Server error:', text);
        throw new Error('Failed to submit message');
      }

      setSubmitted(true);
      setMessage('');
      setError('');
      await fetchMessages();
    } catch (err) {
      console.error(err);
      setError('There was a problem submitting your message. Please try again.');
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Like toggle handler
  const handleReaction = (idx) => {
    if (!isSignedIn) {
      alert("You must be signed in to like a message.");
      return;
    }

    const userId = user.id;

    setLikesMap((prev) => {
      const updated = { ...prev };
      const currentSet = new Set(prev[idx] || []);

      if (currentSet.has(userId)) {
        currentSet.delete(userId); // Unlike
      } else {
        currentSet.add(userId); // Like
      }

      updated[idx] = currentSet;
      return updated;
    });
  };

  const handleReplyChange = (idx, text) => {
    setReplies((prev) => ({
      ...prev,
      [idx]: text,
    }));
  };

  const handleReplySubmit = (idx) => {
    alert('Reply submitted: ' + replies[idx]);
    setReplyingTo(null);
    handleReplyChange(idx, '');
  };

  return (
    <div className="talk-container">
      <div className="talk-box">
        <h1 className="talk-title">💬 Share what you want to be discounted!</h1>
        <p className="talk-subtitle">We are here to solve your problems!</p>

        {submitted && <div className="talk-success">✅ Message submitted!</div>}
        {error && <div className="talk-error" style={{ color: 'red' }}>{error}</div>}

        <form className="talk-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Write what you want to be discounted..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="talk-textarea"
            rows={4}
          />
          <button type="submit" className="talk-submit-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="talk-messages">
          <h2>Previous Messages:</h2>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <ul>
              {messages.map((msg, idx) => {
                const currentLikes = likesMap[idx] || new Set();
                const isLiked = isSignedIn && currentLikes.has(user?.id);

                return (
                  <li key={idx} className="talk-message-item">
                    <div className="talk-message-name">
                      <strong>{msg.name?.trim() || 'Anonymous'}</strong>
                    </div>
                    <div>{msg.message}</div>
                    {msg.created_at && (
                      <div className="talk-message-time">
                        {new Date(msg.created_at).toLocaleString()}
                      </div>
                    )}

                    <div className="reaction-buttons" style={{ marginTop: '8px', display: 'flex', gap: '12px' }}>
                      <button
                        onClick={() => handleReaction(idx)}
                        className={`reaction-btn like-btn ${isLiked ? 'liked' : ''}`}
                        aria-label="Like message"
                      >
                        👍 {currentLikes.size}
                      </button>

                      <button
                        onClick={() => setReplyingTo(idx)}
                        className="reaction-btn reply-btn"
                        aria-label="Reply to message"
                      >
                        💬 Reply
                      </button>
                    </div>

                    {replyingTo === idx && (
                      <div className="reply-box" style={{ marginTop: '10px' }}>
                        <textarea
                          rows={2}
                          placeholder="Write your reply..."
                          value={replies[idx] || ''}
                          onChange={(e) => handleReplyChange(idx, e.target.value)}
                          style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
                        />
                        <button onClick={() => handleReplySubmit(idx)} style={{ padding: '6px 12px' }}>
                          Submit Reply
                        </button>
                      </div>
                    )}
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
