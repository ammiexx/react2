
import React from 'react';
import './Aboutus.css';
const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Building bridges between buyers and sellers—locally, efficiently, and reliably.</p>
      </header>

      <section className="mission-section">
        <img src="https://plus.unsplash.com/premium_photo-1752433524344-c2f801835945?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            We are on a mission to connect local customers with businesses seamlessly.
            Whether you're a buyer searching for what you need nearby, or a seller looking to move inventory fast—we've built the perfect place for you.
          </p>
          <p>
            With real-time offers, verified sellers, and location-based listings, we help customers get what they want—faster, cheaper, and closer to home.
          </p>
        </div>
      </section>

      <section className="vision-section">
        <div className="vision-content">
          <h2>Why We Exist</h2>
          <p>
            We believe in simplifying commerce. Our platform removes the clutter and brings together demand and supply with unmatched clarity.
            Businesses showcase their offers, buyers post their needs—and connections happen naturally.
          </p>
          <p>
            This is not just a marketplace—it's a smarter way to buy and sell.
          </p>
        </div>
        <img src="https://images.unsplash.com/photo-1752743092036-1bc260931bd5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </section>

      <section className="impact-section">
        <h2>What We Offer</h2>
        <div className="impact-grid">
          <div className="impact-item">
            <img src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=600&q=80" alt="Buyer Finding Product" />
            <h3>For Buyers</h3>
            <p>Find what you want at discounted prices near you, faster than ever before.</p>
          </div>
          <div className="impact-item">
            <img src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=600&q=80" alt="Seller Success" />
            <h3>For Businesses</h3>
            <p>Reach ready-to-buy local customers and get your inventory sold out on time.</p>
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} CBN. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default AboutUs;
