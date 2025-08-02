import React from 'react';
import './PurchaseHistory.css';

const rewardsData = [
  {
    id: 1,
    buyer: 'Animut Alemneh',
    totalPurchases: 15,
    earlyPurchases: 5,
    pointsEarned: 150,
    tier: 'Gold',
  },
  {
    id: 2,
    buyer: 'Mekdes Alemu',
    totalPurchases: 8,
    earlyPurchases: 3,
    pointsEarned: 80,
    tier: 'Silver',
  },
  {
    id: 3,
    buyer: 'Binyam Tesfaye',
    totalPurchases: 20,
    earlyPurchases: 10,
    pointsEarned: 200,
    tier: 'Platinum',
  }
];

const PurchaseHistory = () => {
  return (
    <div className="purchase-history-container">
      <h2 className="section-title">🎁 REWARDS FOR BUYERS 🎁</h2>
      <p className="subtitle">✅ Earn points for buying more, buying early, and staying loyal!</p>

      <table className="rewards-table">
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Total Purchases</th>
            <th>Early Purchases</th>
            <th>Points Earned</th>
            <th>Tier</th>
          </tr>
        </thead>
        <tbody>
          {rewardsData.map((buyer) => (
            <tr key={buyer.id}>
              <td>{buyer.buyer}</td>
              <td>{buyer.totalPurchases}</td>
              <td>{buyer.earlyPurchases}</td>
              <td>{buyer.pointsEarned}</td>
              <td className={`tier ${buyer.tier.toLowerCase()}`}>{buyer.tier}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="note">
        💡 Tip: The more and earlier you buy, the more rewards you earn!
      </div>
    </div>
  );
};

export default PurchaseHistory;
