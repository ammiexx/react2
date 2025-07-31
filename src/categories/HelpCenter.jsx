// src/components/HelpCenter.jsx
import React, { useState } from 'react';
import './HelpCenter.css';

const HelpCenter = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I track my order?',
      answer:
        'Once your order is shipped, you will receive a tracking number via email. You can use that to track your shipment on our "Track Order" page.',
    },
    {
      question: 'How can I return an item?',
      answer:
        'You can initiate a return within 7 days of receiving the product from your "Orders" page. Simply click on the order and follow the return steps.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit/debit cards, UPI, net banking, and cash on delivery (COD) in supported areas.',
    },
    {
      question: 'How do I change my delivery address?',
      answer:
        'You can change your delivery address in "My Profile" > "Addresses". Make sure to update it before placing a new order.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="help-container">
      <h2>Help Center</h2>
      <p className="help-subtitle">Find answers to common questions below</p>

      <div className="faq-section">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>

      <div className="contact-help">
        <h3>Still need help?</h3>
        <p>Contact our customer support team 24/7 via email or chat.</p>
        <button className="contact-btn">Contact Support</button>
      </div>
    </div>
  );
};

export default HelpCenter;
