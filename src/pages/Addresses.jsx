// src/components/Addresses.jsx
import React, { useState } from 'react';
import './Addresses.css';

const Addresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      address: "123 Main Street, New York, NY 10001",
      phone: "+1 555-123-4567",
      isDefault: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Elm St, San Francisco, CA 94107",
      phone: "+1 555-987-6543",
      isDefault: false,
    },
  ]);

  const handleRemove = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div className="addresses-container">
      <h2>My Addresses</h2>
      <p className="addresses-description">
        Manage your shipping and billing addresses here.
      </p>

      <div className="address-list">
        {addresses.map((addr) => (
          <div className="address-card" key={addr.id}>
            {addr.isDefault && <span className="default-label">Default</span>}
            <h3>{addr.name}</h3>
            <p>{addr.address}</p>
            <p>{addr.phone}</p>
            <div className="address-actions">
              <button className="edit-btn">Edit</button>
              <button className="remove-btn" onClick={() => handleRemove(addr.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-address-btn">+ Add New Address</button>
    </div>
  );
};

export default Addresses;
