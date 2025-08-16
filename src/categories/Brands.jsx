import React from 'react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Featured Brands</h1>
      <p className="text-gray-600 mb-8">Discover top brands we proudly offer to our customers.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <a
            key={brand.id}
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center text-center"
            title={`Visit ${brand.name}`}
          >
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="h-16 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{brand.name}</h3>
            <p className="text-sm text-gray-600">{brand.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Brands;
