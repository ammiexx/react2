import React, { useEffect, useState } from "react";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://djanagobackend-5.onrender.com/api/orders/pending/")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Pending Orders</h1>
      {orders.length === 0 ? (
        <p>No pending orders.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((o) => (
            <li key={o.id} className="border p-3 rounded bg-yellow-50">
              {o.product_name} – {o.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingOrders;
