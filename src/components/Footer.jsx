import React from 'react';
import './Footer.css';

const businessCategories = [
  {
    title: "Retail Stores",
    description: "Local and online retail businesses offering great deals.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Tech Startups",
    description: "Innovative technology companies shaping the future.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Consulting Firms",
    description: "Professional consultants ready to help your business grow.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Healthcare Services",
    description: "Trusted health providers and clinics near you.",
    image: "https://images.unsplash.com/photo-1580281658622-9603769bf5b3?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Creative Agencies",
    description: "Design, marketing, and advertising agencies to boost your brand.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=60",
  }
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2>Explore Businesses on Customer Business Network</h2>
        <div className="business-scroll">
          {businessCategories.map((biz, index) => (
            <div className="business-card" key={index}>
              <img src={biz.image} alt={biz.title} />
              <h3>{biz.title}</h3>
              <p>{biz.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 customer-business-network. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="/">Home</a>
          <a href="/forsale">For Sale</a>
          <a href="/wanted">Wanted to Buy</a>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
