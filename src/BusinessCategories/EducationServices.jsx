import React, { useState } from 'react';
import './EducationServices.css';

const educationItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1596495577886-d920f1e9f9a9', // school supplies
    category: 'School Supplies',
    description: 'Quality notebooks, stationery, backpacks, and educational materials for students of all ages.',
    providers: 'Staples, Office Depot, Local Stores',
    availability: 'In Stock',
    rating: '4.8/5',
    link: 'https://www.staples.com/',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1581091870625-2b1a5e7b07f6', // tutoring & coaching
    category: 'Tutoring & Coaching',
    description: 'Experienced tutors offering personalized coaching in Math, Science, and more.',
    providers: 'Local Tutors, Kumon, Sylvan Learning',
    availability: 'Available Now',
    rating: '4.7/5',
    link: 'https://www.kumon.com/',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1532619675605-4b987c18e4c4', // language & IT classes
    category: 'Language & IT Classes',
    description: 'Courses on English, Spanish, coding, web development, and IT certifications.',
    providers: 'Coursera, Udemy, Local Institutes',
    availability: 'Online & In-Person',
    rating: '4.9/5',
    link: 'https://www.coursera.org/',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d', // freelance & IT services
    category: 'Freelance & IT Services',
    description: 'Professional freelance programmers, designers, and IT support specialists.',
    providers: 'Upwork, Fiverr, Local Freelancers',
    availability: 'Contract Basis',
    rating: '4.6/5',
    link: 'https://www.upwork.com/',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', // design & marketing
    category: 'Design & Marketing Services',
    description: 'Creative marketing agencies and freelance designers offering branding, SEO, and advertising.',
    providers: 'Local Agencies, Fiverr, 99designs',
    availability: 'Project Based',
    rating: '4.7/5',
    link: 'https://99designs.com/',
  },
];

const EducationServices = () => {
  const [openDetail, setOpenDetail] = useState({});

  const toggleDetail = (id) => {
    setOpenDetail((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="education-page">
      <h2 className="education-title">🎓 Education & Services</h2>
      <div className="education-list">
        {educationItems.map((item) => (
          <div className="education-card" key={item.id}>
            <img src={item.image + '?auto=format&fit=crop&w=400&q=80'} alt={item.category} className="education-image" />
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

export default EducationServices;
