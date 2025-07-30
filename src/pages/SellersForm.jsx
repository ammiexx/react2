import React, { useState } from 'react';
import './SellersForm.css';
const SellersForm = () => {
  const [formData, setFormData] = useState({
    companyLogo: '',
    companyName: '',
    location: '',
    productPhoto: '',
    productName: '',
    description: '',
    price: '',
    availability: '',
    shipping: '',
    rating: '',
    reviewsCount: '',
    warranty: '',
    discountValue: '',
    discountDeadline: '',
    phone: '',
    telegram: '',
    tiktok: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, val]) => {
      if (!val) newErrors[key] = 'Required';
    });
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert('Offer submitted successfully!');
    console.log(formData);
  };

  return (
    <form className="sellers-form" onSubmit={handleSubmit}>
      <h2>Tell us what you want to sell and its location</h2>
      {[
        { label: 'tell us you company', name: 'companyName' },
        { label: 'Location example (AA->megenagna->gracecitymole->3rd floor->Office 22)', name: 'location' },
        { label: 'tell us what you offer', name: 'description' },
        { label: 'Price', name: 'price' },
        { label: 'Discount Value', name: 'discountValue' },
        { label: 'Discount Deadline', name: 'discountDeadline' },
        { label: 'Phone', name: 'phone' },
        { label: 'Telegram URL', name: 'telegram' },
        { label: 'TikTok URL', name: 'tiktok' }
      ].map(({ label, name }) => (
        <label key={name}>
          {label}
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
          />
          {errors[name] && <span className="error">{errors[name]}</span>}
        </label>
      ))}
      <button type="submit">Submit Offer</button>
    </form>
  );
};
export default SellersForm;
