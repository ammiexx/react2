import React, { useState } from 'react';
import './CarBrands.css';

const carBrandsData = [
  {
    id: 1,
    logo: 'https://1000logos.net/wp-content/uploads/2018/02/Toyota-Logo.png',
    name: 'Toyota',
    origin: 'Japan',
    founded: '1937',
    models: 'Camry, Corolla, Prius, RAV4',
    description: 'Toyota is known for its reliable and fuel-efficient vehicles. A global leader in hybrid technology.',
    rating: '4.8/5',
    website: 'https://www.toyota.com',
  },
  {
    id: 2,
    logo: 'https://1000logos.net/wp-content/uploads/2021/04/Ford-logo.png',
    name: 'Ford',
    origin: 'USA',
    founded: '1903',
    models: 'F-150, Mustang, Explorer, Fusion',
    description: 'Ford is an American icon producing trucks, SUVs, and performance cars for over a century.',
    rating: '4.6/5',
    website: 'https://www.ford.com',
  },
  {
    id: 3,
    logo: 'https://1000logos.net/wp-content/uploads/2020/01/BMW-Logo-768x432.png',
    name: 'BMW',
    origin: 'Germany',
    founded: '1916',
    models: '3 Series, 5 Series, X5, M4',
    description: 'BMW is famous for its performance-driven luxury cars that offer ultimate driving experience.',
    rating: '4.9/5',
    website: 'https://www.bmw.com',
  },
  {
    id: 4,
    logo: 'https://1000logos.net/wp-content/uploads/2018/02/Audi-Logo-768x432.png',
    name: 'Audi',
    origin: 'Germany',
    founded: '1909',
    models: 'A4, A6, Q5, e-tron',
    description: 'Audi combines luxury with cutting-edge technology and electrification.',
    rating: '4.7/5',
    website: 'https://www.audi.com',
  },
  {
    id: 5,
    logo: 'https://1000logos.net/wp-content/uploads/2018/02/Tesla-Logo-500x281.png',
    name: 'Tesla',
    origin: 'USA',
    founded: '2003',
    models: 'Model S, 3, X, Y',
    description: 'Tesla leads the electric vehicle revolution with innovative design and autonomous technology.',
    rating: '4.9/5',
    website: 'https://www.tesla.com',
  },
];

const CarBrands = () => {
  const [showMore, setShowMore] = useState({});

  const toggleMore = (id) => {
    setShowMore((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="car-brands-page">
      <h2 className="brands-title">🌍 Popular Car Brands</h2>
      <div className="brands-list">
        {carBrandsData.map((brand) => (
          <div className="brand-card" key={brand.id}>
            <img src={brand.logo} alt={`${brand.name} logo`} className="brand-logo" />
            <h3>{brand.name}</h3>
            <p>📍 Origin: {brand.origin}</p>
            <p>📅 Founded: {brand.founded}</p>
            <p>🚘 Models: {brand.models}</p>
            <p>⭐ Rating: {brand.rating}</p>
            {showMore[brand.id] && (
              <p className="description">📖 {brand.description}</p>
            )}
            <div className="buttons">
              <button onClick={() => toggleMore(brand.id)}>
                {showMore[brand.id] ? 'Show Less' : 'Learn More'}
              </button>
              <a href={brand.website} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarBrands;
