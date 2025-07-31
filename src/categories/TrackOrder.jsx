import React, { useState } from 'react';
import './TrackOrder.css';

const mockOrderStatus = {
  '12345': 'Shipped - Expected delivery in 3 days',
  '67890': 'Processing - We are preparing your order',
  '11121': 'Delivered on July 28, 2025',
};

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setOrderNumber(e.target.value);
    setStatus(null);
    setError('');
  };

  const handleTrack = (e) => {
    e.preventDefault();

    if (!orderNumber.trim()) {
      setError('Please enter your order number.');
      setStatus(null);
      return;
    }

    // Simulate checking order status (replace with real API call)
    const orderStatus = mockOrderStatus[orderNumber.trim()];
    if (orderStatus) {
      setStatus(orderStatus);
      setError('');
    } else {
      setStatus(null);
      setError('Order number not found. Please check and try again.');
    }
  };

  return (
    <div className="track-container">
      <h1>Track Your Order</h1>
      <form onSubmit={handleTrack} className="track-form">
        <input
          type="text"
          placeholder="Enter your order number"
          value={orderNumber}
          onChange={handleInputChange}
          className="track-input"
        />
        <button type="submit" className="track-button">Track</button>
      </form>

      {error && <p className="track-error">{error}</p>}
      {status && <p className="track-status">{status}</p>}
    </div>
  );
};

export default TrackOrder;
