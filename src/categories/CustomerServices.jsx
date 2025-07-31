import React from 'react';
import './CustomerServices.css';

const CustomerServices = () => {
  return (
    <div className="customer-service-container">
      <h1>Customer Service</h1>
      <p>We're here to help! Explore our support topics below.</p>

      <div className="service-sections">
        <div className="service-card">
          <h3>📦 Order Help</h3>
          <p>Track, cancel, or return orders with ease.</p>
          <a href="/track-order">Track My Order</a>
        </div>

        <div className="service-card">
          <h3>💳 Payment Issues</h3>
          <p>Questions about billing, refunds, or failed transactions?</p>
          <a href="/payment-methods">Manage Payment Methods</a>
        </div>

        <div className="service-card">
          <h3>🚚 Shipping Info</h3>
          <p>Learn about shipping methods, delivery timelines, and fees.</p>
          <a href="/shipping-info">View Shipping Info</a>
        </div>

        <div className="service-card">
          <h3>🔁 Returns & Refunds</h3>
          <p>Understand our return policy and how refunds are handled.</p>
          <a href="/returns-refunds">View Return Policy</a>
        </div>

        <div className="service-card">
          <h3>📞 Contact Support</h3>
          <p>Still need help? Reach out to our support team directly.</p>
          <a href="/contact-us">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default CustomerServices;
