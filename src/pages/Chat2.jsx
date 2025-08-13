import React, { useState, useEffect } from 'react';
import './Chat.css';

const BACKEND_URL = 'http://djanagobackend-5.onrender.com/api/cat'; // update as needed

const Chat2 = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const response = await fetch(BACKEND_URL);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load messages');
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
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) throw new Error('Failed to submit message');

      setSubmitted(true);
      setMessage('');
      setName('');
      setError('');

      // Wait for updated messages before continuing
      await fetchMessages();
    } catch (err) {
      console.error(err);
      setError('There was a problem submitting your message. Please try again.');
      setSubmitted(false);
    }
  };

  return (
    <div className="talk-container">
      <div className="talk-box">
        <h1 className="talk-title">💬 share want you want and need</h1>
        <p className="talk-subtitle">This is a space where your voice matters. Say anything you want!</p>

        {submitted && <div className="talk-success">✅ Your message has been submitted!</div>}
        {error && <div className="talk-error" style={{ color: 'red' }}>{error}</div>}

        <form className="talk-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="talk-input"
          />
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="talk-textarea"
            rows={5}
          />
          <button type="submit" className="talk-submit-btn">Send Message</button>
        </form>

        <div className="talk-messages">
          <h2>Previous Messages:</h2>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <ul>
              {messages.map((msg, idx) => (
                <li key={idx} className="talk-message-item">
                  <strong>{msg.name ? msg.name : 'Anonymous'}:</strong> {msg.message}
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
