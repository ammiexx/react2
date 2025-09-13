import React, { useEffect, useState } from "react";

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://djanagobackend-5.onrender.com/api/orders/completed/")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Completed Orders</h1>
      {orders.length === 0 ? (
        <p>No completed orders.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((o) => (
            <li key={o.id} className="border p-3 rounded bg-green-50">
              {o.product_name} – Delivered ✅
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedOrders;
