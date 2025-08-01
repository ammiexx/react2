import React, { useState } from 'react';
import './EventesWedding.css';

const eventsItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // event venue
    category: 'Event Venues',
    description: 'Beautiful venues perfect for weddings, parties, and corporate events.',
    providers: 'Grand Hall, Riverside Gardens',
    availability: 'Booking Available',
    rating: '4.9/5',
    link: 'https://www.grandhall.com/',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1516685304081-de7947d419d2', // catering
    category: 'Catering Services',
    description: 'Delicious and customizable menus for all your event needs.',
    providers: 'Gourmet Catering Co., Taste Buds',
    availability: 'Available Now',
    rating: '4.8/5',
    link: 'https://www.gourmetcatering.com/',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1530023367847-69a6a6f1648d', // DJ & entertainment
    category: 'DJs & Entertainment',
    description: 'Experienced DJs and entertainers to make your event unforgettable.',
    providers: 'Beat Masters, PartyStar DJs',
    availability: 'Limited Slots',
    rating: '4.7/5',
    link: 'https://www.beatmasters.com/',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac', // event decoration
    category: 'Event Decoration',
    description: 'Creative and elegant decoration services tailored to your event theme.',
    providers: 'Dream Decor, Elegant Events',
    availability: 'Booking Available',
    rating: '4.9/5',
    link: 'https://www.dreamdecor.com/',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', // wedding planning
    category: 'Wedding Planning & Services',
    description: 'Professional wedding planners making your big day stress-free and memorable.',
    providers: 'Forever Weddings, Blissful Brides',
    availability: 'Available Now',
    rating: '5.0/5',
    link: 'https://www.foreverweddings.com/',
  },
];

const EventsWeddings = () => {
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="events-page">
      <h2 className="events-title">🎉 Events & Weddings Services</h2>
      <div className="events-list">
        {eventsItems.map((item) => (
          <div className="events-card" key={item.id}>
            <img
              src={item.image + '?auto=format&fit=crop&w=400&q=80'}
              alt={item.category}
              className="events-image"
            />
            <h3>{item.category}</h3>
            <p><strong>Providers:</strong> {item.providers}</p>
            <p><strong>Availability:</strong> {item.availability}</p>
            <p><strong>Rating:</strong> {item.rating}</p>

            {showDetails[item.id] && (
              <p className="description">📝 {item.description}</p>
            )}

            <div className="buttons">
              <button onClick={() => toggleDetails(item.id)}>
                {showDetails[item.id] ? 'Hide Details' : 'More Details'}
              </button>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Visit Provider
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsWeddings;
