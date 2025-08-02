// Announcements.jsx
import React from 'react';
import './Announcements.css';

const Announcements = () => {
  return (
    <section className="announcements">
      <h2 className="announcement-title">📢 We Are Ready to Give You Timely Information</h2>

      <p className="announcement-description">
        Stay updated with the latest changes to products, pricing, and availability. 
        We bring you quick, reliable announcements to help you make the best business decisions.
        will tell you what something you don't know but important! to ascertain what you are purchasing!
      </p>

      <div className="announcement-list">
        <div className="announcement-item">
          <h3>🆕 New Product Release</h3>
          <p>Check out our latest addition to the catalog — designed to meet growing market needs.</p>
        </div>

        <div className="announcement-item">
          <h3>💲 Price Update</h3>
          <p>Recent adjustments reflect changes in demand and supplier costs. Competitive pricing guaranteed.</p>
        </div>

        <div className="announcement-item">
          <h3>✅ Improved Product Quality</h3>
          <p>Our team upgraded materials and processes to deliver better performance and satisfaction.</p>
        </div>

        <div className="announcement-item">
          <h3>📦 Stock Level Changes</h3>
          <p>We’ve updated availability due to high demand. Make sure to place your orders early!</p>
        </div>

        <div className="announcement-item">
          <h3>✨ Other Updates</h3>
          <p>New bundle offers, seasonal collections, and feature improvements are now live.</p>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
