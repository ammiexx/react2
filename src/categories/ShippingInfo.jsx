import React from 'react';
import './ShippingInfo.css';

const ShippingInfo = () => {
  return (
    <div className="shipping-container">
      <h2>Shipping Information</h2>
      <p>
        We strive to deliver your orders as quickly and safely as possible. Below you'll find
        details about our shipping policies, delivery times, and tracking information.
      </p>

      <section>
        <h3>Shipping Methods & Costs</h3>
        <ul>
          <li><strong>Standard Shipping:</strong> 3-7 business days — Free for orders over $50</li>
          <li><strong>Express Shipping:</strong> 1-3 business days — Flat rate $15</li>
          <li><strong>Overnight Shipping:</strong> Next day delivery — $30</li>
        </ul>
      </section>

      <section>
        <h3>Order Processing Time</h3>
        <p>
          Most orders are processed within 1-2 business days. Orders placed on weekends or holidays
          will be processed the next business day.
        </p>
      </section>

      <section>
        <h3>Tracking Your Order</h3>
        <p>
          Once your order ships, you will receive a tracking number via email to monitor your package
          in real time.
        </p>
      </section>

      <section>
        <h3>International Shipping</h3>
        <p>
          We currently ship to the United States and Canada only. International shipping will be
          available soon.
        </p>
      </section>

      <section>
        <h3>Shipping FAQs</h3>
        <ul>
          <li><strong>Can I change my shipping address after placing an order?</strong> Please contact our support team within 1 hour of placing your order to update your address.</li>
          <li><strong>What if my package is lost or damaged?</strong> Contact our customer service immediately and we will assist you with a replacement or refund.</li>
          <li><strong>Do you offer free shipping?</strong> Yes, free standard shipping applies to orders over $50.</li>
        </ul>
      </section>
    </div>
  );
};

export default ShippingInfo;
