import React, { useState, useEffect } from 'react';
import './Chat.css';

const BACKEND_URL = 'https://djanagobackend-5.onrender.com/api/cat'; // Use HTTPS if backend supports it

const Chat2 = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const response = await fetch(BACKEND_URL);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data.reverse()); // newest on top
      setError('');
    } catch (err) {
      console.error(err);
      setError('it needs internet connection');
    }
  };

  // On mount, load messages
  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Server error:', text);
        throw new Error('Failed to submit message');
      }

      setSubmitted(true);
      setMessage('');
      setName('');
      setError('');

      // Refresh messages
      await fetchMessages();
    } catch (err) {
      console.error(err);
      setError('There was a problem submitting your message. Please try again.');
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="talk-container">
      <div className="talk-box">
        <h1 className="talk-title">💬 Share us what you want to be discounted!</h1>
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
              {messages.map((msg, idx) => (
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
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat2;
