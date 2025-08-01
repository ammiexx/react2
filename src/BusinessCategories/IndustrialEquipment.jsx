import React, { useState } from 'react';
import './IndustrialEquipment.css';

const equipmentItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442', // manufacturing machinery
    category: 'Manufacturing Machinery',
    description: 'High-performance machinery designed for various manufacturing processes, ensuring efficiency and precision.',
    providers: 'Siemens, Bosch, Caterpillar',
    availability: 'In Stock',
    rating: '4.8/5',
    link: 'https://www.siemens.com/',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1506765515384-028b60a970df', // storage & handling equipment
    category: 'Storage & Handling Equipment',
    description: 'Robust storage solutions including pallets, racks, and material handling equipment.',
    providers: 'Toyota Material Handling, Hyster, Crown',
    availability: 'Available Now',
    rating: '4.6/5',
    link: 'https://www.toyotaforklift.com/',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1590080877777-82f99c2d0951', // safety gear
    category: 'Safety Gear',
    description: 'Certified industrial safety gear including helmets, gloves, goggles, and protective clothing.',
    providers: '3M, Honeywell, DuPont',
    availability: 'In Stock',
    rating: '4.9/5',
    link: 'https://www.3m.com/',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd', // transportation vehicles
    category: 'Transportation Vehicles',
    description: 'Heavy-duty vehicles for industrial transportation including forklifts, trucks, and trailers.',
    providers: 'Volvo, Caterpillar, Komatsu',
    availability: 'Limited Stock',
    rating: '4.7/5',
    link: 'https://www.volvo.com/',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd34', // industrial tools & parts
    category: 'Industrial Tools & Parts',
    description: 'Durable tools and replacement parts for industrial maintenance and repair.',
    providers: 'Bosch, Makita, DeWalt',
    availability: 'In Stock',
    rating: '4.5/5',
    link: 'https://www.boschtools.com/',
  },
];

const IndustrialEquipment = () => {
  const [openDetail, setOpenDetail] = useState({});

  const toggleDetail = (id) => {
    setOpenDetail((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="industrial-page">
      <h2 className="industrial-title">🏭 Industrial Equipment & Factories</h2>
      <div className="industrial-list">
        {equipmentItems.map((item) => (
          <div className="industrial-card" key={item.id}>
            <img
              src={item.image + '?auto=format&fit=crop&w=400&q=80'}
              alt={item.category}
              className="industrial-image"
            />
            <h3>{item.category}</h3>
            <p><strong>Providers:</strong> {item.providers}</p>
            <p><strong>Availability:</strong> {item.availability}</p>
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

export default IndustrialEquipment;
