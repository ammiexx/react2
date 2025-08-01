import React, { useState } from 'react';
import './RealEstate.css';

const realEstatePosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    category: 'Residential Properties',
    description: 'Modern family homes, villas, and townhouses in prime neighborhoods.',
    location: 'San Diego, CA',
    priceRange: '$350,000 - $1.2M',
    services: 'Includes virtual tours & mortgage assistance',
    rating: '4.8/5',
    contactLink: 'https://www.realtor.com',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1558002038-7e498c53654b',
    category: 'Commercial Properties',
    description: 'Office buildings, retail spaces, and warehouses suitable for all business sizes.',
    location: 'Dallas, TX',
    priceRange: '$500,000 - $5M',
    services: 'Zoning advisory & investment support',
    rating: '4.6/5',
    contactLink: 'https://www.loopnet.com',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1507738978512-35798112892c',
    category: 'Land for Sale',
    description: 'Development-ready plots, farmland, and premium parcels for investment.',
    location: 'Montana & Idaho',
    priceRange: '$30,000 - $750,000',
    services: 'Topographic survey & title services available',
    rating: '4.7/5',
    contactLink: 'https://www.landwatch.com',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
    category: 'Rentals (House/Apartment)',
    description: 'Affordable studio apartments to luxury rentals with flexible leases.',
    location: 'New York City, NY',
    priceRange: '$1,200/mo - $6,000/mo',
    services: 'Furnished & pet-friendly options available',
    rating: '4.9/5',
    contactLink: 'https://www.zillow.com/rent/',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
    category: 'Real Estate Services',
    description: 'Certified agents, legal assistance, property management, and appraisals.',
    location: 'Nationwide (USA)',
    priceRange: 'Varies by service',
    services: 'Agent match, legal documents, escrow help',
    rating: '5.0/5',
    contactLink: 'https://www.redfin.com/real-estate-agents',
  },
];

const RealEstate = () => {
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="realestate-page">
      <h2 className="realestate-title">🏠 Explore Real Estate Opportunities</h2>
      <div className="realestate-list">
        {realEstatePosts.map((item) => (
          <div className="realestate-card" key={item.id}>
            <img src={item.image} alt={item.category} className="realestate-image" />
            <h3>{item.category}</h3>
            <p>📍 <strong>Location:</strong> {item.location}</p>
            <p>💵 <strong>Price:</strong> {item.priceRange}</p>
            <p>🔧 <strong>Services:</strong> {item.services}</p>
            <p>⭐ <strong>Rating:</strong> {item.rating}</p>

            {showDetails[item.id] && (
              <p className="description">📄 {item.description}</p>
            )}

            <div className="buttons">
              <button onClick={() => toggleDetails(item.id)}>
                {showDetails[item.id] ? 'Hide Info' : 'More Info'}
              </button>
              <a href={item.contactLink} target="_blank" rel="noopener noreferrer">
                Contact or Explore
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealEstate;
