import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wanted.css';
const wantedPosts = [
  {
    id: 1,
    profileImg: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'Looking for a used iPhone 12 in good condition.',
    date: '2025-07-20',
    location: 'New York, USA',
    deadline: '2025-08-01',
    phone: '+1 234-567-8900',
    telegram: 'https://t.me/buyer1',
    tiktok: 'https://www.tiktok.com/@buyer1',
  },
  {
    id: 2,
    profileImg: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: 'Need a second-hand DSLR camera for school project.',
    date: '2025-07-21',
    location: 'Los Angeles, USA',
    deadline: '2025-08-05',
    phone: '+1 555-123-4567',
    telegram: 'https://t.me/buyer2',
    tiktok: 'https://www.tiktok.com/@buyer2',
  },
  {
    id: 3,
    profileImg: 'https://randomuser.me/api/portraits/men/3.jpg',
    content: 'Searching for bulk office chairs in Addis Ababa.',
    date: '2025-07-24',
    location: 'Addis Ababa, Ethiopia',
    deadline: '2025-08-10',
    phone: '+251 911-123456',
    telegram: 'https://t.me/buyer3',
    tiktok: 'https://www.tiktok.com/@buyer3',
  },
  {
    id: 4,
    profileImg: 'https://randomuser.me/api/portraits/women/4.jpg',
    content: 'Looking to buy a gently used gaming laptop.',
    date: '2025-07-25',
    location: 'Chicago, USA',
    deadline: '2025-08-15',
    phone: '+1 312-000-2222',
    telegram: 'https://t.me/buyer4',
    tiktok: 'https://www.tiktok.com/@buyer4',
  },
  {
    id: 5,
    profileImg: 'https://randomuser.me/api/portraits/men/5.jpg',
    content: 'Want a reliable used mountain bike.',
    date: '2025-07-26',
    location: 'Denver, USA',
    deadline: '2025-08-12',
    phone: '+1 720-555-9999',
    telegram: 'https://t.me/buyer5',
    tiktok: 'https://www.tiktok.com/@buyer5',
  },
];

const Wanted = () => {
  const [visibleContacts, setVisibleContacts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toggleContact = (id) => {
    setVisibleContacts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRegisterClick = () => {
    navigate('/sellers-form');
  };

  // Filter posts based on searchTerm (case-insensitive)
  const filteredPosts = wantedPosts.filter((post) => {
    const term = searchTerm.toLowerCase();
    return (
      post.content.toLowerCase().includes(term) ||
      post.location.toLowerCase().includes(term)
    );
  });

  // Sort filtered posts by date descending
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Split into 3 columns
  const columns = [[], [], []];
  sortedPosts.forEach((post, index) => {
    columns[index % 3].push(post);
  });

  return (
    <div className="wanted-page">
      <h2 className="wanted-title">
        We’re here to buy — show us what your business has to offer!
      </h2>

     <div className="top-action-row">
  <button className="register-buyer-btn" onClick={handleRegisterClick}>
    Reach active buyers — share your item and where it's available.
  </button>

  <input
    type="text"
    className="search-input"
    placeholder="Browse a product wanted by a customer"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>


      <div className="wanted-grid">
        {columns.map((column, i) => (
          <div className="wanted-column" key={i}>
            {column.map((post) => (
              <div className="wanted-item" key={post.id}>
                <img src={post.profileImg} alt="Profile" className="wanted-avatar" />
                <div className="wanted-details">
                  <p className="wanted-content">{post.content}</p>
                  <p className="wanted-date">Posted on: {post.date}</p>
                  <p className="wanted-location">
                    <strong>Location:</strong> {post.location}
                  </p>
                  <p className="wanted-deadline">
                    <strong>Deadline:</strong> {post.deadline}
                  </p>

                  <button className="contact-button" onClick={() => toggleContact(post.id)}>
                    {visibleContacts[post.id] ? 'Hide Contact Info' : 'Contact'}
                  </button>

                  {visibleContacts[post.id] && (
                    <div className="wanted-contacts">
                      <p><strong>Contact Info:</strong></p>
                      <p>📞 <a href={`tel:${post.phone}`}>{post.phone}</a></p>
                      <p>📨 <a href={post.telegram} target="_blank" rel="noopener noreferrer">Telegram</a></p>
                      <p>🎵 <a href={post.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a></p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wanted;
