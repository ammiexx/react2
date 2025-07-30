import React, { useState } from 'react';
import './Buyersform.css';

const BuyersForm = () => {
  const [formData, setFormData] = useState({
    content: '',
    location: '',
    deadline: '',
    phone: '',
    telegram: '',
    tiktok: '',
  });
  const [errors, setErrors] = useState({});
  const isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };
  const validate = () => {
    const newErrors = {};

    if (!formData.profileImg) newErrors.profileImg = 'Profile Image URL is required';
    else if (!isValidURL(formData.profileImg)) newErrors.profileImg = 'Invalid URL';

    if (!formData.content) newErrors.content = 'Content is required';

    if (!formData.date) newErrors.date = 'Date is required';

    if (!formData.location) newErrors.location = 'Location is required';

    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    else if (formData.deadline < formData.date) newErrors.deadline = 'Deadline cannot be before the date';

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?\d[\d\s-]{5,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';

    if (formData.telegram && !isValidURL(formData.telegram)) newErrors.telegram = 'Invalid Telegram URL';

    if (formData.tiktok && !isValidURL(formData.tiktok)) newErrors.tiktok = 'Invalid TikTok URL';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
      console.log(formData);
    }
  };

  return (
    <form className="buyers-form" onSubmit={handleSubmit} noValidate>
      <h2>Tell us what you want to buy and its location </h2>
      <label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="What are you looking for?"
          required
          rows={4}
        />
        {errors.content && <span className="error">{errors.content}</span>}
      </label>
      <label>
        the location of product
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Addis Ababa, Ethiopia"
          required
        />
        {errors.location && <span className="error">{errors.location}</span>}
      </label>

      <label>
        Deadline*
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
        {errors.deadline && <span className="error">{errors.deadline}</span>}
      </label>

      <label>
        Phone Number*
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+251 911-123456"
          required
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </label>

      <label>
        Telegram Link
        <input
          type="url"
          name="telegram"
          value={formData.telegram}
          onChange={handleChange}
          placeholder="https://t.me/username"
        />
        {errors.telegram && <span className="error">{errors.telegram}</span>}
      </label>

      <label>
        TikTok Link
        <input
          type="url"
          name="tiktok"
          value={formData.tiktok}
          onChange={handleChange}
          placeholder="https://www.tiktok.com/@username"
        />
        {errors.tiktok && <span className="error">{errors.tiktok}</span>}
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BuyersForm;
