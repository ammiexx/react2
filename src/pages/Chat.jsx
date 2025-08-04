import React, { useState } from 'react';
import './Chat.css';
const buyers = [
  {
    id: 1,
    name: 'animut alemneh',
    message: 'I want to purchase a computer not old enough and my address is Addis Ababa.',
    profilePhoto: 'https://via.placeholder.com/50',
    telegram: 'https://t.me/@ammiexx',
    tiktok: 'https://www.tiktok.com/@ammiexx'
  },
  {
    id: 2,
    name: 'Mekdes Alemu',
    message: 'Looking for a used but high-performance laptop.',
    profilePhoto: 'https://via.placeholder.com/50',
    telegram: 'https://t.me/mekdesalem',
    tiktok: 'https://www.tiktok.com/@mekdesalem'
  },
  {
    id: 3,
    name: 'Binyam Tesfaye',
    message: 'Need a desktop PC for graphic design, not too old.',
    profilePhoto: 'https://via.placeholder.com/50',
    telegram: 'https://t.me/binyam_t',
    tiktok: 'https://www.tiktok.com/@binyam_t'
  }
];

const sellers = [
  {
    id: 1,
    name: 'Alice Smith',
    message: 'I need a customer who can buy an old item that is most durable.',
    profilePhoto: 'https://via.placeholder.com/50',
    telegram: 'https://t.me/alicesmith',
    tiktok: 'https://www.tiktok.com/@alicesmith'
  },
  {
    id: 2,
    name: 'Tadesse Worku',
    message: 'Selling a durable and slightly old computer monitor.',
    profilePhoto: 'https://via.placeholder.com/50',
    telegram: 'https://t.me/tadessew',
    tiktok: 'https://www.tiktok.com/@tadessew'
  },

  {
    id: 3,
    name: 'Hanna Berhanu',
    message: 'Old printer in good condition for sale.',
    profilePhoto: 'https://via.placeholder.com/50',
    telegram: 'https://t.me/hannaberhanu',
    tiktok: 'https://www.tiktok.com/@hannaberhanu'
  }
];

const Questions = () => {
  const [buyerSearchTerm, setBuyerSearchTerm] = useState('');
  const [sellerSearchTerm, setSellerSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (id, type) => {
    const key = `${type}-${id}`;
    setFavorites(prev => {
      const updated = new Set(prev);
      if (updated.has(key)) {
        updated.delete(key);
      } else {
        updated.add(key);
      }
      return updated;
    });
  };

  const isFavorited = (id, type) => favorites.has(`${type}-${id}`);

  return (
    <>
      {/* ✅ Page title */}
      <h1 className="main-title">"🔥Share us what you need — you'll find your ideal buyer/seller🔥"</h1>
      <div className="questions-container">
        <div className="column buyer-column">
          <h2>Buyers</h2>
          <div className="top-action-row">
            <input
              type="text"
              className="search-input"
              placeholder="share us what you want to sell..."
              value={buyerSearchTerm}
              onChange={(e) => setBuyerSearchTerm(e.target.value)}
            />
          </div>

          {buyers.map(buyer => (
            <div key={buyer.id} className="card">
              <img src={buyer.profilePhoto} alt="Profile" className="profile-photo" />
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
                    add to ★
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="column seller-column">
          <h2>Sellers</h2>
          <div className="top-action-row">
            <input
              type="text"
              className="comentinput-input"
              placeholder="Tell us what you want to buy..."
              value={sellerSearchTerm}
              onChange={(e) => setSellerSearchTerm(e.target.value)}
              aria-label="tell us what you want to buy ...."
            />
          </div>
          {sellers.map(seller => (
            <div key={seller.id} className="card">
              <img src={seller.profilePhoto} alt="Profile" className="profile-photo" />
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
                    add to ★
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
