import React from 'react';
import './TodaysDeals.css';
const TodaysDeals = () => {
  return (
    <div className="todays-deals-container">
      <h1>🔥 Today’s Deals</h1>
      <p>Grab the best discounts before they’re gone!</p>

      <div className="deal-list">
        <div className="deal-card">
          <img src="/images/deal1.jpg" alt="Deal 1" />
          <h3>Wireless Earbuds</h3>
          <p>Now only $29.99 (was $59.99)</p>
        </div>

        <div className="deal-card">
          <img src="/images/deal2.jpg" alt="Deal 2" />
          <h3>Smartwatch Bundle</h3>
          <p>50% off today only</p>
        </div>

        <div className="deal-card">
          <img src="/images/deal3.jpg" alt="Deal 3" />
          <h3>4K TV - 55"</h3>
          <p>Save $150 – Limited stock!</p>
        </div>
      </div>
    </div>
  );
};

export default TodaysDeals;
