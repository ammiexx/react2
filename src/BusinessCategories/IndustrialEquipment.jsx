import React, { useState } from 'react';
import './IndustrialEquipment.css';

const equipmentItems = [
  {
    id: 1,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Siemens Manufacturing',
    companyLocation: 'Berlin, Germany',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442',
    category: 'Manufacturing Machinery',
    description: 'High-performance machinery designed for various manufacturing processes, ensuring efficiency and precision.',
    providers: 'Siemens, Bosch, Caterpillar',
    availability: 'In Stock',
    price: 'Starting at $20,000',
    phone: '+49 30 123456',
    tiktok: 'https://www.tiktok.com/@siemens',
    telegram: 'https://t.me/siemens',
    website: 'https://www.siemens.com/',
  },
  {
    id: 2,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Toyota Material Handling',
    companyLocation: 'Nagoya, Japan',
    image: 'https://images.unsplash.com/photo-1506765515384-028b60a970df',
    category: 'Storage & Handling Equipment',
    description: 'Robust storage solutions including pallets, racks, and material handling equipment.',
    providers: 'Toyota Material Handling, Hyster, Crown',
    availability: 'Available Now',
    price: 'Varies by equipment',
    phone: '+81 52 123 4567',
    tiktok: 'https://www.tiktok.com/@toyota_mh',
    telegram: 'https://t.me/toyotamh',
    website: 'https://www.toyotaforklift.com/',
  },
  {
    id: 3,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: '3M Safety Gear',
    companyLocation: 'St. Paul, USA',
    image: 'https://images.unsplash.com/photo-1590080877777-82f99c2d0951',
    category: 'Safety Gear',
    description: 'Certified industrial safety gear including helmets, gloves, goggles, and protective clothing.',
    providers: '3M, Honeywell, DuPont',
    availability: 'In Stock',
    price: '$10 - $200 per item',
    phone: '+1 651-736-2000',
    tiktok: 'https://www.tiktok.com/@3m',
    telegram: 'https://t.me/3m',
    website: 'https://www.3m.com/',
  },
  {
    id: 4,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Volvo Industrial Vehicles',
    companyLocation: 'Gothenburg, Sweden',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
    category: 'Transportation Vehicles',
    description: 'Heavy-duty vehicles for industrial transportation including forklifts, trucks, and trailers.',
    providers: 'Volvo, Caterpillar, Komatsu',
    availability: 'Limited Stock',
    price: 'Starting at $50,000',
    phone: '+46 31 123 456',
    tiktok: 'https://www.tiktok.com/@volvo',
    telegram: 'https://t.me/volvo',
    website: 'https://www.volvo.com/',
  },
  {
    id: 5,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Bosch Tools',
    companyLocation: 'Gerlingen, Germany',
    image: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd34',
    category: 'Industrial Tools & Parts',
    description: 'Durable tools and replacement parts for industrial maintenance and repair.',
    providers: 'Bosch, Makita, DeWalt',
    availability: 'In Stock',
    price: '$15 - $500',
    phone: '+49 7156 300',
    tiktok: 'https://www.tiktok.com/@boschtools',
    telegram: 'https://t.me/boschtools',
    website: 'https://www.boschtools.com/',
  },
  // Two new items added:
  {
    id: 6,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Caterpillar Heavy Equip',
    companyLocation: 'Peoria, USA',
    image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f',
    category: 'Heavy Construction Equipment',
    description: 'Robust construction machinery including excavators, loaders, and bulldozers.',
    providers: 'Caterpillar, Komatsu, John Deere',
    availability: 'Available Now',
    price: 'Starting at $70,000',
    phone: '+1 309-675-1000',
    tiktok: 'https://www.tiktok.com/@caterpillar',
    telegram: 'https://t.me/caterpillar',
    website: 'https://www.caterpillar.com/',
  },
  {
    id: 7,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Honeywell Industrial',
    companyLocation: 'Charlotte, USA',
    image: 'https://images.unsplash.com/photo-1530182475022-caa38bb78b9e',
    category: 'Automation & Control Systems',
    description: 'Advanced automation solutions to optimize industrial control and monitoring.',
    providers: 'Honeywell, ABB, Siemens',
    availability: 'In Stock',
    price: 'Custom pricing',
    phone: '+1 704-636-1000',
    tiktok: 'https://www.tiktok.com/@honeywell',
    telegram: 'https://t.me/honeywell',
    website: 'https://www.honeywell.com/',
  },
];

const IndustrialEquipment = () => {
  const [openContactIds, setOpenContactIds] = useState({});

  const toggleContact = (id) => {
    setOpenContactIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="industrial-page">
      <h2 className="industrial-title">🏭 Industrial Equipment & Factories</h2>
      <div className="industrial-grid">
        {equipmentItems.map((item) => (
          <div className="industrial-card" key={item.id}>
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
              className="industrial-image"
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
                <a href={`tel:${item.phone}`} className="btn contact-btn">📞 Call</a>
                <a href={item.tiktok} target="_blank" rel="noreferrer" className="btn contact-btn">🎵 TikTok</a>
                <a href={item.telegram} target="_blank" rel="noreferrer" className="btn contact-btn">💬 Telegram</a>
                <a href={item.website} target="_blank" rel="noreferrer" className="btn contact-btn">🌐 Website</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustrialEquipment;
