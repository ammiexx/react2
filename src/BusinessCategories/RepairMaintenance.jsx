import React, { useState } from 'react';
import './RepairMaintenance.css';

const repairItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1581090700227-8d3ae76f1a3b', // plumbing
    category: 'Plumbing Services',
    description: 'Expert plumbing repairs and installations for residential and commercial properties.',
    providers: 'PipeFix Co., AquaFlow Services',
    availability: 'Available Now',
    rating: '4.8/5',
    link: 'https://www.pipefix.com/',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1560184897-0aa351dbb33b', // electrical repair
    category: 'Electrical Repair',
    description: 'Professional electrical troubleshooting and repairs to keep your home safe.',
    providers: 'VoltPro, Spark Electricians',
    availability: 'In Stock',
    rating: '4.7/5',
    link: 'https://www.voltpro.com/',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442', // automotive repair
    category: 'Automotive Repair',
    description: 'Certified mechanics providing repair and maintenance services for all vehicle types.',
    providers: 'AutoFix Garage, RapidCar Service',
    availability: 'Limited Slots',
    rating: '4.9/5',
    link: 'https://www.autofixgarage.com/',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1604022352433-82850bca9d03', // appliance repair
    category: 'Home Appliance Repair',
    description: 'Reliable repair services for refrigerators, washers, dryers, and other appliances.',
    providers: 'Appliance Experts, HomeFixers',
    availability: 'In Stock',
    rating: '4.6/5',
    link: '#',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1581092580496-9e5c498d0dba', // handyman
    category: 'General Handyman Services',
    description: 'Skilled handyman services for various household repairs and improvements.',
    providers: 'HandyPro, FixItAll Services',
    availability: 'Available Now',
    rating: '4.8/5',
    link: 'https://www.handypro.com/',
  },
];

const RepairMaintenance = () => {
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="repair-page">
      <h2 className="repair-title">🛠 Repair & Maintenance Services</h2>
      <div className="repair-list">
        {repairItems.map((item) => (
          <div className="repair-card" key={item.id}>
            <img
              src={item.image + '?auto=format&fit=crop&w=400&q=80'}
              alt={item.category}
              className="repair-image"
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
              {item.link !== '#' && (
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

export default RepairMaintenance;
