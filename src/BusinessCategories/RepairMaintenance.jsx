import React, { useState } from 'react';
import './RepairMaintenance.css';

const repairItems = [
  {
    id: 1,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'PipeFix Co.',
    companyLocation: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1581090700227-8d3ae76f1a3b',
    category: 'Plumbing Services',
    description: 'Expert plumbing repairs and installations for residential and commercial properties.',
    providers: 'PipeFix Co., AquaFlow Services',
    availability: 'Available Now',
    price: 'From $50/hr',
    phone: '+1 212-555-1234',
    tiktok: 'https://www.tiktok.com/@pipefixco',
    telegram: 'https://t.me/pipefixco',
    website: 'https://www.pipefix.com/',
  },
  {
    id: 2,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'VoltPro',
    companyLocation: 'San Francisco, USA',
    image: 'https://images.unsplash.com/photo-1560184897-0aa351dbb33b',
    category: 'Electrical Repair',
    description: 'Professional electrical troubleshooting and repairs to keep your home safe.',
    providers: 'VoltPro, Spark Electricians',
    availability: 'In Stock',
    price: 'Flat rates available',
    phone: '+1 415-555-6789',
    tiktok: 'https://www.tiktok.com/@voltpro',
    telegram: 'https://t.me/voltpro',
    website: 'https://www.voltpro.com/',
  },
  {
    id: 3,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'AutoFix Garage',
    companyLocation: 'Detroit, USA',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442',
    category: 'Automotive Repair',
    description: 'Certified mechanics providing repair and maintenance services for all vehicle types.',
    providers: 'AutoFix Garage, RapidCar Service',
    availability: 'Limited Slots',
    price: 'Varies by service',
    phone: '+1 313-555-9876',
    tiktok: 'https://www.tiktok.com/@autofixgarage',
    telegram: 'https://t.me/autofixgarage',
    website: 'https://www.autofixgarage.com/',
  },
  {
    id: 4,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'HomeFixers',
    companyLocation: 'Austin, USA',
    image: 'https://images.unsplash.com/photo-1604022352433-82850bca9d03',
    category: 'Home Appliance Repair',
    description: 'Reliable repair services for refrigerators, washers, dryers, and other appliances.',
    providers: 'Appliance Experts, HomeFixers',
    availability: 'In Stock',
    price: 'From $75 per job',
    phone: '+1 512-555-4321',
    tiktok: '#',
    telegram: '#',
    website: '#',
  },
  {
    id: 5,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'HandyPro',
    companyLocation: 'Seattle, USA',
    image: 'https://images.unsplash.com/photo-1581092580496-9e5c498d0dba',
    category: 'General Handyman Services',
    description: 'Skilled handyman services for various household repairs and improvements.',
    providers: 'HandyPro, FixItAll Services',
    availability: 'Available Now',
    price: '$40/hr',
    phone: '+1 206-555-6543',
    tiktok: 'https://www.tiktok.com/@handypro',
    telegram: 'https://t.me/handypro',
    website: 'https://www.handypro.com/',
  },
  // New items:
  {
    id: 6,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Spark Electricians',
    companyLocation: 'Chicago, USA',
    image: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40',
    category: 'Electrical Maintenance',
    description: 'Maintenance and installation of electrical systems for commercial buildings.',
    providers: 'Spark Electricians, VoltPro',
    availability: 'In Stock',
    price: 'Custom quotes',
    phone: '+1 312-555-3456',
    tiktok: 'https://www.tiktok.com/@sparkelectricians',
    telegram: 'https://t.me/sparkelectricians',
    website: 'https://www.sparkelectricians.com/',
  },
  {
    id: 7,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'RapidCar Service',
    companyLocation: 'Houston, USA',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
    category: 'Car Maintenance & Repairs',
    description: 'Quick and reliable car maintenance and repair services.',
    providers: 'RapidCar Service, AutoFix Garage',
    availability: 'Available Now',
    price: 'Starting at $60',
    phone: '+1 713-555-7890',
    tiktok: 'https://www.tiktok.com/@rapidcarservice',
    telegram: 'https://t.me/rapidcarservice',
    website: 'https://www.rapidcarservice.com/',
  },
];

const RepairMaintenance = () => {
  const [openContactIds, setOpenContactIds] = useState({});

  const toggleContact = (id) => {
    setOpenContactIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="repair-page">
      <h2 className="repair-title">🛠 Repair & Maintenance Services</h2>
      <div className="repair-grid">
        {repairItems.map((item) => (
          <div className="repair-card" key={item.id}>
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
              className="repair-image"
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

export default RepairMaintenance;
