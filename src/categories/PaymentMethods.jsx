import React, { useState } from 'react';
import './PaymentMethods.css';

const PaymentMethods = () => {
  const [cards, setCards] = useState([
    { id: 1, type: 'Visa', number: '**** **** **** 1234', expiry: '12/25' },
    { id: 2, type: 'MasterCard', number: '**** **** **** 5678', expiry: '08/24' },
  ]);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [error, setError] = useState('');

  const handleAddCard = (e) => {
    e.preventDefault();

    if (!/^\d{16}$/.test(newCardNumber.replace(/\s/g, ''))) {
      setError('Please enter a valid 16-digit card number.');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(newCardExpiry)) {
      setError('Expiry date must be in MM/YY format.');
      return;
    }

    const cardType = newCardNumber.startsWith('4') ? 'Visa' : 'MasterCard'; // Simple detection

    const newCard = {
      id: Date.now(),
      type: cardType,
      number: '**** **** **** ' + newCardNumber.slice(-4),
      expiry: newCardExpiry,
    };

    setCards([...cards, newCard]);
    setNewCardNumber('');
    setNewCardExpiry('');
    setError('');
  };

  const handleRemoveCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="payment-container">
      <h1>Payment Methods</h1>

      <div className="cards-list">
        {cards.length === 0 && <p>No payment methods saved.</p>}
        {cards.map(card => (
          <div key={card.id} className="card-item">
            <div>
              <strong>{card.type}</strong> - {card.number}
              <span className="expiry">Expires: {card.expiry}</span>
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemoveCard(card.id)}
              aria-label={`Remove ${card.type} card ending in ${card.number.slice(-4)}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddCard} className="add-card-form">
        <h2>Add New Card</h2>
        <input
          type="text"
          placeholder="Card Number (16 digits)"
          maxLength="19"
          value={newCardNumber}
          onChange={(e) => setNewCardNumber(e.target.value)}
          className="card-input"
          required
        />
        <input
          type="text"
          placeholder="Expiry (MM/YY)"
          maxLength="5"
          value={newCardExpiry}
          onChange={(e) => setNewCardExpiry(e.target.value)}
          className="card-input"
          required
        />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit" className="add-btn">Add Card</button>
      </form>
    </div>
  );
};

export default PaymentMethods;
