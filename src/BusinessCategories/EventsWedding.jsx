import React, { useState } from 'react';
import './EventesWedding.css';

const eventsItems = [
  {
    id: 1,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Grand Hall',
    companyLocation: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    category: 'Event Venues',
    description: 'Beautiful venues perfect for weddings, parties, and corporate events.',
    providers: 'Grand Hall, Riverside Gardens',
    availability: 'Booking Available',
    price: 'Starting at $2000',
    phone: '+1 212-555-7890',
    tiktok: 'https://www.tiktok.com/@grandhall',
    telegram: 'https://t.me/grandhall',
    website: 'https://www.grandhall.com/',
  },
  {
    id: 2,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Gourmet Catering Co.',
    companyLocation: 'Los Angeles, USA',
    image: 'https://images.unsplash.com/photo-1516685304081-de7947d419d2',
    category: 'Catering Services',
    description: 'Delicious and customizable menus for all your event needs.',
    providers: 'Gourmet Catering Co., Taste Buds',
    availability: 'Available Now',
    price: 'From $25 per person',
    phone: '+1 310-555-1234',
    tiktok: 'https://www.tiktok.com/@gourmetcateringco',
    telegram: 'https://t.me/gourmetcateringco',
    website: 'https://www.gourmetcatering.com/',
  },
  {
    id: 3,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Beat Masters',
    companyLocation: 'Miami, USA',
    image: 'https://images.unsplash.com/photo-1530023367847-69a6a6f1648d',
    category: 'DJs & Entertainment',
    description: 'Experienced DJs and entertainers to make your event unforgettable.',
    providers: 'Beat Masters, PartyStar DJs',
    availability: 'Limited Slots',
    price: 'Starting at $500',
    phone: '+1 305-555-4567',
    tiktok: 'https://www.tiktok.com/@beatmasters',
    telegram: 'https://t.me/beatmasters',
    website: 'https://www.beatmasters.com/',
  },
  {
    id: 4,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Dream Decor',
    companyLocation: 'Chicago, USA',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
    category: 'Event Decoration',
    description: 'Creative and elegant decoration services tailored to your event theme.',
    providers: 'Dream Decor, Elegant Events',
    availability: 'Booking Available',
    price: 'Custom quotes',
    phone: '+1 312-555-9876',
    tiktok: 'https://www.tiktok.com/@dreamdecor',
    telegram: 'https://t.me/dreamdecor',
    website: 'https://www.dreamdecor.com/',
  },
  {
    id: 5,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Forever Weddings',
    companyLocation: 'San Francisco, USA',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    category: 'Wedding Planning & Services',
    description: 'Professional wedding planners making your big day stress-free and memorable.',
    providers: 'Forever Weddings, Blissful Brides',
    availability: 'Available Now',
    price: 'Packages from $3000',
    phone: '+1 415-555-7654',
    tiktok: 'https://www.tiktok.com/@foreverweddings',
    telegram: 'https://t.me/foreverweddings',
    website: 'https://www.foreverweddings.com/',
  },
  // New items
  {
    id: 6,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Elegant Events',
    companyLocation: 'Austin, USA',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b',
    category: 'Event Management',
    description: 'Full-service event management from concept to execution.',
    providers: 'Elegant Events, Dream Decor',
    availability: 'Booking Available',
    price: 'Custom quotes',
    phone: '+1 512-555-2468',
    tiktok: '#',
    telegram: '#',
    website: 'https://www.elegantevents.com/',
  },
  {
    id: 7,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Blissful Brides',
    companyLocation: 'Seattle, USA',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    category: 'Bridal Services',
    description: 'Makeup, hairstyling, and bridal consultations for your special day.',
    providers: 'Blissful Brides',
    availability: 'Available Now',
    price: 'Starting at $150',
    phone: '+1 206-555-7891',
    tiktok: 'https://www.tiktok.com/@blissfulbrides',
    telegram: '#',
    website: 'https://www.blissfulbrides.com/',
  },
];

const EventsWeddings = () => {
  const [openContactIds, setOpenContactIds] = useState({});

  const toggleContact = (id) => {
    setOpenContactIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="events-page">
      <h2 className="events-title">🎉 Events & Weddings Services</h2>
      <div className="events-grid">
        {eventsItems.map((item) => (
          <div className="events-card" key={item.id}>
            <div className="company-header">
              <img src={item.profilePhoto} alt={item.companyName} className="company-logo" />
              <div>
                <h4 className="company-name">{item.companyName}</h4>
                <p className="company-location">{item.companyLocation}</p>
              </div>
            </div>

            <img
              src={item.image + '?auto=format&fit=crop&w=400&q=80'}
              alt={item.category}
              className="events-image"
            />

            <h3>{item.category}</h3>
            <p className="description">{item.description}</p>
            <p><strong>Providers:</strong> {item.providers}</p>
            <p><strong>Availability:</strong> {item.availability}</p>
            <p><strong>Price:</strong> {item.price}</p>

            <button
              className="btn contact-toggle-btn"
              onClick={() => toggleContact(item.id)}
              aria-expanded={!!openContactIds[item.id]}
              aria-controls={`contact-info-${item.id}`}
            >
              {openContactIds[item.id] ? 'Hide Contact Info' : 'Contact Us'}
            </button>

            {openContactIds[item.id] && (
              <div className="contact-buttons" id={`contact-info-${item.id}`}>
                {item.phone && item.phone !== '#' && (
                  <a href={`tel:${item.phone}`} className="btn contact-btn">📞 Call</a>
                )}
                {item.tiktok && item.tiktok !== '#' && (
                  <a href={item.tiktok} target="_blank" rel="noreferrer" className="btn contact-btn">🎵 TikTok</a>
                )}
                {item.telegram && item.telegram !== '#' && (
                  <a href={item.telegram} target="_blank" rel="noreferrer" className="btn contact-btn">💬 Telegram</a>
                )}
                {item.website && item.website !== '#' && (
                  <a href={item.website} target="_blank" rel="noreferrer" className="btn contact-btn">🌐 Website</a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsWeddings;
