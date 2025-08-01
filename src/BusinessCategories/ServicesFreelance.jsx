import React, { useState } from 'react';
import './ServicesFreelance.css';

const serviceItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1556742400-b5c6f8a83e8f', // cleaning service
    category: 'Home Services',
    description: 'Reliable cleaning, repair, and maintenance services for your home.',
    providers: 'Sparkle Cleaners, HandyFix',
    availability: 'Available Now',
    rating: '4.8/5',
    link: 'https://sparklecleaners.com/',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1515165562835-c2f1df8eb4b7', // delivery
    category: 'Delivery & Logistics',
    description: 'Fast and secure delivery, courier, and logistics services.',
    providers: 'QuickShip, FastTrack Logistics',
    availability: 'Open for Orders',
    rating: '4.7/5',
    link: 'https://quickship.com/',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15', // freelance & IT
    category: 'Freelance & IT Services',
    description: 'Expert freelancers for graphic design, writing, IT support, and more.',
    providers: 'Creative Minds, CodeCrafters',
    availability: 'Available for Hire',
    rating: '4.9/5',
    link: 'https://creativeminds.com/',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1546484959-f8e9f3c7cc4c', // personal care
    category: 'Personal Care Services',
    description: 'Massage therapists, fitness trainers, and wellness experts.',
    providers: 'Relax & Restore, FitPro Trainers',
    availability: 'Book Now',
    rating: '4.8/5',
    link: 'https://relaxandrestore.com/',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1532619675605-70f36b8ed6c3', // professional services
    category: 'Professional Services',
    description: 'Consulting, legal advice, accounting, and professional support.',
    providers: 'LegalEase, Account Experts',
    availability: 'Consultations Available',
    rating: '4.9/5',
    link: 'https://legalease.com/',
  },
];

const ServicesFreelance = () => {
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="services-page">
      <h2 className="services-title">🔧 Services & Freelance Jobs</h2>
      <div className="services-list">
        {serviceItems.map((item) => (
          <div className="services-card" key={item.id}>
            <img
              src={item.image + '?auto=format&fit=crop&w=400&q=80'}
              alt={item.category}
              className="services-image"
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

export default ServicesFreelance;
