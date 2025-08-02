import React, { useState } from 'react';
import './CarBrands.css';
const carBrandsData = [
  {
    company: 'AutoLux Motors',
    location: 'Los Angeles, CA',
    profileImg: 'https://randomuser.me/api/portraits/men/23.jpg',
    carImg: 'https://images.unsplash.com/photo-1603386329225-868f9b1e93f9?auto=format&fit=crop&w=800&q=60',
    description: '2022 BMW M4 Coupe - Sporty, sleek, and built for performance.',
    datePosted: '2025-07-30',
    price: '$68,000',
    contact: {
      phone: '+1 310-555-1234',
      telegram: 'https://t.me/AutoLuxSupport',
      website: 'https://autoluxmotors.com',
      tiktok: 'https://www.tiktok.com/@autolux',
    }
  },
  {
    company: 'DriveX Performance',
    location: 'Miami, FL',
    profileImg: 'https://randomuser.me/api/portraits/women/55.jpg',
    carImg: 'https://images.unsplash.com/photo-1588618874690-43f52b40f013?auto=format&fit=crop&w=800&q=60',
    description: 'Tesla Model S 2023 - Full electric, AWD, and autopilot ready.',
    datePosted: '2025-07-28',
    price: '$77,500',
    contact: {
      phone: '+1 786-555-8765',
      telegram: 'https://t.me/DriveX',
      website: 'https://drivexperformance.com',
      tiktok: 'https://www.tiktok.com/@drivexcars',
    }
  },
  {
    company: 'CityAuto Hub',
    location: 'New York, NY',
    profileImg: 'https://randomuser.me/api/portraits/men/18.jpg',
    carImg: 'https://images.unsplash.com/photo-1603384125677-82e0d02b73cc?auto=format&fit=crop&w=800&q=60',
    description: 'Audi Q5 Quattro 2021 - Comfortable luxury with turbocharged power.',
    datePosted: '2025-07-26',
    price: '$43,000',
    contact: {
      phone: '+1 212-555-9981',
      telegram: 'https://t.me/CityAutoHub',
      website: 'https://cityautohub.com',
      tiktok: 'https://www.tiktok.com/@cityauto',
    }
  },
  {
    company: 'West Coast Classics',
    location: 'San Diego, CA',
    profileImg: 'https://randomuser.me/api/portraits/men/61.jpg',
    carImg: 'https://images.unsplash.com/photo-1603808033192-2d4f3b34558c?auto=format&fit=crop&w=800&q=60',
    description: '1967 Ford Mustang GT - Classic American muscle in mint condition.',
    datePosted: '2025-07-29',
    price: '$85,000',
    contact: {
      phone: '+1 619-555-4040',
      telegram: 'https://t.me/WestCoastClassics',
      website: 'https://westcoastclassics.com',
      tiktok: 'https://www.tiktok.com/@mustangmania',
    }
  },
  {
    company: 'Luxury Wheels ATL',
    location: 'Atlanta, GA',
    profileImg: 'https://randomuser.me/api/portraits/women/28.jpg',
    carImg: 'https://images.unsplash.com/photo-1603166975034-c06b3f5abfd7?auto=format&fit=crop&w=800&q=60',
    description: 'Mercedes-Benz GLE 450 2023 - Luxury SUV with AMG styling.',
    datePosted: '2025-07-25',
    price: '$71,000',
    contact: {
      phone: '+1 404-555-2233',
      telegram: 'https://t.me/LuxuryATL',
      website: 'https://luxurywheelsatl.com',
      tiktok: 'https://www.tiktok.com/@luxuryatl',
    }
  },
  {
    company: 'EcoDrive Motors',
    location: 'Portland, OR',
    profileImg: 'https://randomuser.me/api/portraits/men/91.jpg',
    carImg: 'https://images.unsplash.com/photo-1608225091357-914b7c3a2274?auto=format&fit=crop&w=800&q=60',
    description: 'Toyota Prius 2022 - Eco-conscious hybrid with top fuel efficiency.',
    datePosted: '2025-07-27',
    price: '$29,500',
    contact: {
      phone: '+1 503-555-8822',
      telegram: 'https://t.me/EcoDrivePDX',
      website: 'https://ecodrivemotors.com',
      tiktok: 'https://www.tiktok.com/@ecodrive',
    }
  },
  {
    company: 'Chicago Car Deals',
    location: 'Chicago, IL',
    profileImg: 'https://randomuser.me/api/portraits/women/39.jpg',
    carImg: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=60',
    description: 'Honda Civic Sport 2021 - Reliable, stylish, and low-mileage.',
    datePosted: '2025-07-30',
    price: '$23,800',
    contact: {
      phone: '+1 312-555-6655',
      telegram: 'https://t.me/ChiDeals',
      website: 'https://chicagocardeals.com',
      tiktok: 'https://www.tiktok.com/@chicardeals',
    }
  },
  {
    company: 'Desert Speed Cars',
    location: 'Phoenix, AZ',
    profileImg: 'https://randomuser.me/api/portraits/men/42.jpg',
    carImg: 'https://images.unsplash.com/photo-1592194996308-df5cdb2c53c3?auto=format&fit=crop&w=800&q=60',
    description: 'Chevrolet Camaro 2020 - Fast and furious with low miles.',
    datePosted: '2025-07-28',
    price: '$36,900',
    contact: {
      phone: '+1 602-555-4466',
      telegram: 'https://t.me/DesertSpeed',
      website: 'https://desertspeed.com',
      tiktok: 'https://www.tiktok.com/@desertspeedcars',
    }
  },
];

const CarBrands = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleContact = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="car-brands-container">
      <h2>🚗 Featured Car Brands & Deals</h2>
      <div className="car-grid">
        {carBrandsData.map((car, index) => (
          <div className="car-card" key={index}>
            <div className="car-header">
              <img src={car.profileImg} alt={car.company} className="profile" />
              <div>
                <h3>{car.company}</h3>
                <span>{car.location}</span>
              </div>
            </div>
            <img src={car.carImg} alt="Car" className="car-image" />
            <p className="description">{car.description}</p>
            <div className="details">
              <span className="price">{car.price}</span>
              <span className="date">Posted: {car.datePosted}</span>
            </div>
            <button className="contact-button" onClick={() => toggleContact(index)}>
              {activeIndex === index ? 'Hide Contacts' : 'Contact Us'}
            </button>
            {activeIndex === index && (
              <div className="contact-info">
                <p><strong>📞 Phone:</strong> {car.contact.phone}</p>
                <p><strong>📲 Telegram:</strong> <a href={car.contact.telegram} target="_blank" rel="noreferrer">Message</a></p>
                <p><strong>🌐 Website:</strong> <a href={car.contact.website} target="_blank" rel="noreferrer">{car.contact.website}</a></p>
                <p><strong>🎵 TikTok:</strong> <a href={car.contact.tiktok} target="_blank" rel="noreferrer">@{car.company.split(' ')[0].toLowerCase()}</a></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarBrands;
