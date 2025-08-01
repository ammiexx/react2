import React from 'react';
import './Footer.css';

const businessCategories = [
  {
    title: "Retail Stores",
    description: "Great local and online shopping options.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Tech Startups",
    description: "Innovation & software shaping the future.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Consulting Firms",
    description: "Professional advice for business growth.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Healthcare Services",
    description: "Clinics, doctors, and health experts near you.",
    image: "https://images.unsplash.com/photo-1580281658622-9603769bf5b3?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Creative Agencies",
    description: "Design, branding & marketing partners.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=60",
  }
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-categories">
          <h2>🌐 Explore by Category</h2>
          <div className="category-scroll">
            {businessCategories.map((biz, index) => (
              <div className="category-card" key={index}>
                <img src={biz.image} alt={biz.title} className="category-image" />
                <div className="category-info">
                  <h4>{biz.title}</h4>
                  <p>{biz.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-about">
          <h3>Customer Business Network</h3>
          <p>
            Empowering local businesses and service providers by connecting them with customers across regions.
            Whether you're selling products, offering services, or looking for talent — we've got you covered.
          </p>
          <div className="contact-info">
            <p>📧 Email: support@cbnetwork.com</p>
            <p>📍 Location: Worldwide Access</p>
            <p>📞 Phone: +1 (800) 555-2025</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <nav className="footer-nav">
          <a href="/">Home</a>
          <a href="/forsale">For Sale</a>
          <a href="/wanted">Wanted</a>
          <a href="/services">Services</a>
          <a href="/events">Events</a>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </nav>
        <p className="footer-copy">© 2025 Customer Business Network. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
