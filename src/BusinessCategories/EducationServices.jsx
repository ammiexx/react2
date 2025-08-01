import React, { useState } from 'react';
import './EducationServices.css';

const educationItems = [
  {
    id: 1,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Edu Supplies Co.',
    companyLocation: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1596495577886-d920f1e9f9a9',
    category: 'School Supplies',
    description: 'Quality notebooks, stationery, backpacks, and educational materials for students of all ages.',
    providers: 'Staples, Office Depot, Local Stores',
    availability: 'In Stock',
    price: '$5 - $50 per item',
    phone: '+1 555-1234',
    tiktok: 'https://www.tiktok.com/@edusupplies',
    telegram: 'https://t.me/edusupplies',
    website: 'https://www.staples.com/',
  },
  {
    id: 2,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Tutor Pros',
    companyLocation: 'Los Angeles, USA',
    image: 'https://images.unsplash.com/photo-1581091870625-2b1a5e7b07f6',
    category: 'Tutoring & Coaching',
    description: 'Experienced tutors offering personalized coaching in Math, Science, and more.',
    providers: 'Local Tutors, Kumon, Sylvan Learning',
    availability: 'Available Now',
    price: '$20 - $80 per hour',
    phone: '+1 555-5678',
    tiktok: 'https://www.tiktok.com/@tutorpros',
    telegram: 'https://t.me/tutorpros',
    website: 'https://www.kumon.com/',
  },
  {
    id: 3,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Language & IT Hub',
    companyLocation: 'Chicago, USA',
    image: 'https://images.unsplash.com/photo-1532619675605-4b987c18e4c4',
    category: 'Language & IT Classes',
    description: 'Courses on English, Spanish, coding, web development, and IT certifications.',
    providers: 'Coursera, Udemy, Local Institutes',
    availability: 'Online & In-Person',
    price: '$30 - $100 per course',
    phone: '+1 555-8765',
    tiktok: 'https://www.tiktok.com/@langithub',
    telegram: 'https://t.me/langithub',
    website: 'https://www.coursera.org/',
  },
  {
    id: 4,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Freelance IT Experts',
    companyLocation: 'San Francisco, USA',
    image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d',
    category: 'Freelance & IT Services',
    description: 'Professional freelance programmers, designers, and IT support specialists.',
    providers: 'Upwork, Fiverr, Local Freelancers',
    availability: 'Contract Basis',
    price: 'Varies by project',
    phone: '+1 555-4321',
    tiktok: 'https://www.tiktok.com/@freelanceit',
    telegram: 'https://t.me/freelanceit',
    website: 'https://www.upwork.com/',
  },
  {
    id: 5,
    profilePhoto: 'https://via.placeholder.com/50',
    companyName: 'Creative Marketing Agency',
    companyLocation: 'Seattle, USA',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    category: 'Design & Marketing Services',
    description: 'Creative marketing agencies and freelance designers offering branding, SEO, and advertising.',
    providers: 'Local Agencies, Fiverr, 99designs',
    availability: 'Project Based',
    price: 'Depends on project',
    phone: '+1 555-6789',
    tiktok: 'https://www.tiktok.com/@creativemarketing',
    telegram: 'https://t.me/creativemarketing',
    website: 'https://99designs.com/',
  },
];

const EducationServices = () => {
  const [openContactIds, setOpenContactIds] = useState({});

  const toggleContact = (id) => {
    setOpenContactIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="education-page">
      <h2 className="education-title">🎓 Education & Services</h2>
      <div className="education-grid">
        {educationItems.map((item) => (
          <div className="education-card" key={item.id}>
            <div className="company-header">
              <img src={item.profilePhoto} alt={item.companyName} className="company-logo" />
              <div>
                <h4 className="company-name">{item.companyName}</h4>
                <p className="company-location">{item.companyLocation}</p>
              </div>
            </div>

            <img src={item.image + '?auto=format&fit=crop&w=400&q=80'} alt={item.category} className="education-image" />

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

export default EducationServices;
