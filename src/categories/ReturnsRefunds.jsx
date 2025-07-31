import React from 'react';
import './ReturnsRefunds.css';

const ReturnsRefunds = () => {
  return (
    <div className="returns-container">
      <h1>Returns & Refunds Policy</h1>

      <section>
        <h2>Easy Returns</h2>
        <p>
          We want you to be completely satisfied with your purchase. If you are not happy with your order,
          you can return most items within 30 days of delivery for a full refund or exchange.
        </p>
      </section>

      <section>
        <h2>How to Return</h2>
        <ol>
          <li>Contact our <a href="/contact-us">Customer Support</a> to initiate your return request.</li>
          <li>Ensure the item is in its original packaging and condition.</li>
          <li>Ship the item back to the address provided by our support team.</li>
        </ol>
      </section>

      <section>
        <h2>Refund Process</h2>
        <p>
          Once we receive and inspect your returned item, we will process your refund within 5-7 business days.
          Refunds will be issued to your original payment method.
        </p>
      </section>

      <section>
        <h2>Exceptions</h2>
        <p>
          Some items are not eligible for return, including:
          <ul>
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>Personalized or custom-made items</li>
          </ul>
        </p>
      </section>

      <section>
        <h2>Need Help?</h2>
        <p>
          If you have questions or need assistance, please visit our <a href="/help-center">Help Center</a> or <a href="/contact-us">Contact Us</a>.
        </p>
      </section>
    </div>
  );
};

export default ReturnsRefunds;
