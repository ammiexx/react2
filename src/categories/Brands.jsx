import React from 'react';
import './Brands.css';

const brands = [
  {
    id: 'b1',
    name: 'Apple',
    description: 'Innovative technology and sleek design for mobile devices and computers.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    website: 'https://www.apple.com',
  },
  {
    id: 'b2',
    name: 'Samsung',
    description: 'Global leader in consumer electronics, smartphones, and home appliances.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    website: 'https://www.samsung.com',
  },
  {
    id: 'b3',
    name: 'Nike',
    description: 'Premium sportswear, shoes, and accessories for athletes and casual wearers.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    website: 'https://www.nike.com',
  },
  {
    id: 'b4',
    name: 'Sony',
    description: 'Leading brand in electronics, gaming, and entertainment products.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Sony_Logo.svg',
    website: 'https://www.sony.com',
  },
  {
    id: 'b5',
    name: 'Adidas',
    description: 'High-quality athletic shoes, clothing, and accessories worldwide.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
    website: 'https://www.adidas.com',
  },
];

const Brands = () => {
  return (
    <div className="brands-container">
      <h1>Featured Brands</h1>
      <p className="intro-text">Discover top brands we proudly offer to our customers.</p>
      <div className="brands-grid">
        {brands.map(brand => (
          <a
            key={brand.id}
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-card"
            title={`Visit ${brand.name}`}
          >
            <img src={brand.logo} alt={`${brand.name} logo`} className="brand-logo" />
            <h3>{brand.name}</h3>
            <p>{brand.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Brands;
