import React, { useState } from 'react';
import './ServicesFreelance.css';

const serviceItems = [
  {
    id: 1,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Sparkle Cleaners',
    companyLocation: 'Denver, USA',
    image: 'https://images.unsplash.com/photo-1556742400-b5c6f8a83e8f',
    category: 'Home Services',
    description: 'Reliable cleaning, repair, and maintenance services for your home.',
    providers: 'Sparkle Cleaners, HandyFix',
    availability: 'Available Now',
    price: 'From $50 per service',
    phone: '+1 720-555-2345',
    tiktok: 'https://www.tiktok.com/@sparklecleaners',
    telegram: 'https://t.me/sparklecleaners',
    website: 'https://sparklecleaners.com/',
  },
  {
    id: 2,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'QuickShip',
    companyLocation: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1515165562835-c2f1df8eb4b7',
    category: 'Delivery & Logistics',
    description: 'Fast and secure delivery, courier, and logistics services.',
    providers: 'QuickShip, FastTrack Logistics',
    availability: 'Open for Orders',
    price: 'Starting at $15 per shipment',
    phone: '+1 212-555-7890',
    tiktok: 'https://www.tiktok.com/@quickship',
    telegram: '#',
    website: 'https://quickship.com/',
  },
  {
    id: 3,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Creative Minds',
    companyLocation: 'San Francisco, USA',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15',
    category: 'Freelance & IT Services',
    description: 'Expert freelancers for graphic design, writing, IT support, and more.',
    providers: 'Creative Minds, CodeCrafters',
    availability: 'Available for Hire',
    price: 'Hourly rates starting at $30',
    phone: '+1 415-555-1234',
    tiktok: 'https://www.tiktok.com/@creativeminds',
    telegram: 'https://t.me/creativeminds',
    website: 'https://creativeminds.com/',
  },
  {
    id: 4,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Relax & Restore',
    companyLocation: 'Austin, USA',
    image: 'https://images.unsplash.com/photo-1546484959-f8e9f3c7cc4c',
    category: 'Personal Care Services',
    description: 'Massage therapists, fitness trainers, and wellness experts.',
    providers: 'Relax & Restore, FitPro Trainers',
    availability: 'Book Now',
    price: 'Sessions from $70',
    phone: '+1 512-555-4567',
    tiktok: '#',
    telegram: '#',
    website: 'https://relaxandrestore.com/',
  },
  {
    id: 5,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'LegalEase',
    companyLocation: 'Chicago, USA',
    image: 'https://images.unsplash.com/photo-1532619675605-70f36b8ed6c3',
    category: 'Professional Services',
    description: 'Consulting, legal advice, accounting, and professional support.',
    providers: 'LegalEase, Account Experts',
    availability: 'Consultations Available',
    price: 'Consultation from $150/hr',
    phone: '+1 312-555-9876',
    tiktok: '#',
    telegram: 'https://t.me/legalease',
    website: 'https://legalease.com/',
  },
];

const ServicesFreelance = () => {
  const [openContactIds, setOpenContactIds] = useState({});

  const toggleContact = (id) => {
    setOpenContactIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="services-page">
      <h2 className="services-title">🔧 Services & Freelance Jobs</h2>
      <div className="services-grid">
        {serviceItems.map((item) => (
          <div className="services-card" key={item.id}>
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
              className="services-image"
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

export default ServicesFreelance;
