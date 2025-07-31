import React, { useState } from 'react';
import './Orders.css';

const sampleOrders = [
  {
    id: 'ORD123456',
    date: '2025-07-15',
    status: 'Delivered',
    total: 129.99,
    items: [
      { name: 'Wireless Headphones', qty: 1 },
      { name: 'Bluetooth Speaker', qty: 2 },
    ],
  },
  {
    id: 'ORD123457',
    date: '2025-07-10',
    status: 'Shipped',
    total: 59.49,
    items: [
      { name: 'Phone Case', qty: 1 },
      { name: 'Screen Protector', qty: 1 },
    ],
  },
  {
    id: 'ORD123458',
    date: '2025-06-30',
    status: 'Processing',
    total: 299.99,
    items: [
      { name: 'Smartwatch', qty: 1 },
    ],
  },
];

const Orders = () => {
  const [orders] = useState(sampleOrders);

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div><strong>Order ID:</strong> {order.id}</div>
              <div><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</div>
              <div>
                <strong>Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
              <div><strong>Total:</strong> ${order.total.toFixed(2)}</div>
            </div>
            <div className="order-items">
              <strong>Items:</strong>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} &times; {item.qty}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
