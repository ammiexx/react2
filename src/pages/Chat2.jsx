import React, { useState, useEffect } from 'react';
import './Chat.css';

const Questions = () => {
    const [buyerMessage, setBuyerMessage] = useState('');
const [sellerMessage, setSellerMessage] = useState('');
const handleSendBuyer = () => {
  if (!buyerMessage.trim()) return;

  fetch('http://127.0.0.1:8000/api/buyers/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ message: buyerMessage }),
  })
    .then(res => res.json())
    .then(data => {
      setBuyers(prev => [...prev, data]);  // Add new buyer to list
      setBuyerMessage(''); // Clear input
    })
    .catch(err => console.error('Error sending buyer message:', err));
};

const handleSendSeller = () => {
  if (!sellerMessage.trim()) return;

  fetch('http://127.0.0.1:8000/api/sellers/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ message: sellerMessage }),
  })
    .then(res => res.json())
    .then(data => {
      setSellers(prev => [...prev, data]);  // Add new seller to list
      setSellerMessage(''); // Clear input
    })
    .catch(err => console.error('Error sending seller message:', err));
};

  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [buyerSearchTerm, setBuyerSearchTerm] = useState('');
  const [sellerSearchTerm, setSellerSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  // ✅ Fetch buyers, sellers, and favorites
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/buyers/')
      .then(response => response.json())
      .then(data => setBuyers(data))
      .catch(error => console.error('Error fetching buyers:', error));

    fetch('http://localhost:8000/api/sellers/')
      .then(response => response.json())
      .then(data => setSellers(data))
      .catch(error => console.error('Error fetching sellers:', error));

    fetch('http://127.0.0.1:8000/api/favorites/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const favSet = new Set(data.map(item => `${item.target_type}-${item.target_id}`));
        setFavorites(favSet);
      })
      .catch(err => console.error('Error fetching favorites:', err));
  }, []);

  // ✅ Toggle favorite status via backend
  const toggleFavorite = (id, type) => {
  fetch('http://127.0.0.1:8000/api/favorites/toggle/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ target_id: id, target_type: type })
  })
    .then(res => res.json())
    .then(data => {
      const key = `${type}-${id}`;
      const name = type === 'buyer' 
        ? buyers.find(b => b.id === id)?.name 
        : sellers.find(s => s.id === id)?.name;

      setFavorites(prev => {
        const updated = new Set(prev);
        if (data.message.includes('added')) {
          updated.add(key);
          setNotification(`${type === 'buyer' ? 'Buyer' : 'Seller'} "${name}" added to favorites!`);
        } else if (data.message.includes('removed')) {
          updated.delete(key);
        }
        {notification && (
  <div className="notification-popup">
    {notification}
  </div>
)}

        return updated;
      });

      // Clear the notification after 2 seconds
      setTimeout(() => setNotification(''), 2000);
    })
    .catch(err => console.error('Error toggling favorite:', err));
};


  const isFavorited = (id, type) => favorites.has(`${type}-${id}`);

  const filteredBuyers = buyers.filter(buyer =>
    buyer.message.toLowerCase().includes(buyerSearchTerm.toLowerCase())
  );

  const filteredSellers = sellers.filter(seller =>
    seller.message.toLowerCase().includes(sellerSearchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="main-title">"🔥Share us what you need — you'll find your ideal buyer/seller🔥"</h1>
      <div className="questions-container">

        {/* 👤 Buyers Section */}
        <div className="column buyer-column">
          <h2>Buyers</h2>
         <div className="top-action-row">
  <input
    type="text"
    className="search-input"
    placeholder="share us what you want to buy..."
    value={buyerMessage}
    onChange={(e) => setBuyerMessage(e.target.value)}
  />
  <button onClick={handleSendBuyer} className="send-button">Send</button>
</div>

          {filteredBuyers.map(buyer => (
            <div key={buyer.id} className="card">
              <img src={buyer.profile_photo} alt="Profile" className="profile-photo" />
              <div className="info">
                <h4>{buyer.name}</h4>
                <p>{buyer.message}</p>
                <div className="button-row">
                  <a href={buyer.telegram} target="_blank" rel="noopener noreferrer" className="inbox-button">
                    Talk me inbox
                  </a>
                  <a href={buyer.tiktok} target="_blank" rel="noopener noreferrer" className="follow-button">
                    Follow
                  </a>
                  <button
                    className={`favorite-button ${isFavorited(buyer.id, 'buyer') ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(buyer.id, 'buyer')}
                  >
                    {isFavorited(buyer.id, 'buyer') ? '★ Favorited' : 'Add to ★'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 💼 Sellers Section */}
        <div className="column seller-column">
          <h2>Sellers</h2>
         <div className="top-action-row">
  <input
    type="text"
    className="comentinput-input"
    placeholder="Tell us what you want to sell..."
    value={sellerMessage}
    onChange={(e) => setSellerMessage(e.target.value)}
    aria-label="tell us what you want to sell"
  />
  <button onClick={handleSendSeller} className="send-button">Send</button>
</div>

          {filteredSellers.map(seller => (
            <div key={seller.id} className="card">
              <img src={seller.profile_photo} alt="Profile" className="profile-photo" />
              <div className="info">
                <h4>{seller.name}</h4>
                <p>{seller.message}</p>
                <div className="button-row">
                  <a href={seller.telegram} target="_blank" rel="noopener noreferrer" className="inbox-button">
                    Talk me inbox
                  </a>
                  <a href={seller.tiktok} target="_blank" rel="noopener noreferrer" className="follow-button">
                    Follow
                  </a>
                  <button
                    className={`favorite-button ${isFavorited(seller.id, 'seller') ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(seller.id, 'seller')}
                  >
                    {isFavorited(seller.id, 'seller') ? '★ Favorited' : 'Add to ★'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Questions;
