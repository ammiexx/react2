// DidYouKnow.jsx
import React from 'react';
import './Blog.css';

const DidYouKnow = () => {
  return (
    <section className="did-you-know">
      <h2 className="dyk-title">🧠 Did You Know?</h2>
      <p className="dyk-intro">
        Welcome to our buyer blog — a space to help you become smarter, more informed, and confident in your purchasing decisions.
      </p>

      <div className="dyk-blogs">

        <article className="dyk-item">
          <h3>🔎 Quality Over Quantity</h3>
          <p>
            Did you know that buying from verified sellers with higher product ratings often leads to longer-lasting value and fewer replacements?
            Always check product reviews and business badges.
          </p>
        </article>

        <article className="dyk-item">
          <h3>💡 Early Buyers Get Better Deals</h3>
          <p>
            Businesses often reward early buyers with discounts or bonuses. Keep an eye out for early bird offers and product pre-releases.
          </p>
        </article>

        <article className="dyk-item">
          <h3>📦 Stock Doesn't Last Forever</h3>
          <p>
            Products with high demand can go out of stock quickly. Adding items to your wishlist or subscribing to alerts can help you stay ahead.
          </p>
        </article>

        <article className="dyk-item">
          <h3>📊 Your Data Makes You Powerful</h3>
          <p>
            Tracking your past purchases can help you identify trends, avoid overspending, and negotiate better deals with sellers. Use dashboards wisely!
          </p>
        </article>

        <article className="dyk-item">
          <h3>🤝 Communication Builds Trust</h3>
          <p>
            Reaching out to sellers to ask about delivery, customization, or product use often leads to better service and relationships. Don't hesitate to message them.
          </p>
        </article>

      </div>
    </section>
  );
};

export default DidYouKnow;
