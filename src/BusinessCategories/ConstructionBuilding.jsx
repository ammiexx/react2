import React, { useState } from 'react';
import './ConstructionBuilding.css';

const materials = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600880291648-5d59f7d8f668', // cement, bricks
    category: 'Cement, Sand, Bricks',
    description: 'High quality cement, natural sand, and durable bricks for all your building needs.',
    suppliers: 'UltraTech, ACC, Birla, Local Quarries',
    delivery: 'Bulk orders delivery available',
    rating: '4.7/5',
    link: 'https://www.ultratechcement.com/',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1560185127-6d2fc5ee92e9', // roofing, flooring
    category: 'Roofing & Flooring',
    description: 'Tiles, shingles, hardwood, and laminate flooring options with installation support.',
    suppliers: 'Mohawk, Armstrong, GAF, Local Suppliers',
    delivery: 'Installation services available',
    rating: '4.6/5',
    link: 'https://www.armstrongflooring.com/',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // electrical & plumbing
    category: 'Electrical & Plumbing Materials',
    description: 'Wiring, pipes, fixtures, and fittings sourced from trusted brands.',
    suppliers: 'Schneider Electric, Kohler, Grohe, Local Dealers',
    delivery: 'Express delivery on small orders',
    rating: '4.8/5',
    link: 'https://www.schneider-electric.com/',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', // construction equipment
    category: 'Construction Equipment',
    description: 'Heavy machinery and hand tools for your construction projects.',
    suppliers: 'Caterpillar, John Deere, Bosch, Local Renters',
    delivery: 'Equipment rental & purchase options',
    rating: '4.7/5',
    link: 'https://www.cat.com/',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1590080877777-47971e1e9af7', // building & contractor services
    category: 'Building & Contractor Services',
    description: 'Licensed contractors, project management, legal & architectural consultation.',
    suppliers: 'Local Certified Contractors',
    delivery: 'Consultation and onsite support',
    rating: '4.9/5',
    link: 'https://www.homeadvisor.com/',
  },
];

const ConstructionBuilding = () => {
  const [openDetail, setOpenDetail] = useState({});

  const toggleDetail = (id) => {
    setOpenDetail((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="construction-page">
      <h2 className="construction-title">🏗 Construction & Building Materials</h2>
      <div className="construction-list">
        {materials.map((item) => (
          <div className="construction-card" key={item.id}>
            <img src={item.image + '?auto=format&fit=crop&w=400&q=80'} alt={item.category} className="construction-image" />
            <h3>{item.category}</h3>
            <p><strong>Suppliers:</strong> {item.suppliers}</p>
            <p><strong>Delivery:</strong> {item.delivery}</p>
            <p><strong>Rating:</strong> {item.rating}</p>

            {openDetail[item.id] && (
              <p className="description">📝 {item.description}</p>
            )}

            <div className="buttons">
              <button onClick={() => toggleDetail(item.id)}>
                {openDetail[item.id] ? 'Hide Info' : 'More Info'}
              </button>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstructionBuilding;
