import React, { useEffect, useState } from "react";

const PaymentUpdates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Fetch payment events from backend (Stripe webhooks or DB log)
    fetch("https://djanagobackend-5.onrender.com/api/payment-updates/")
      .then((res) => res.json())
      .then((data) => setUpdates(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Payment Updates</h1>
      {updates.length === 0 ? (
        <p>No recent payment updates.</p>
      ) : (
        <ul className="space-y-2">
          {updates.map((u, i) => (
            <li key={i} className="border p-3 rounded bg-gray-50">
              {u.message} – {u.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentUpdates;
