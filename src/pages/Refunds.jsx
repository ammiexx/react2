import React, { useEffect, useState } from "react";

const Refunds = () => {
  const [refunds, setRefunds] = useState([]);

  useEffect(() => {
    fetch("https://djanagobackend-5.onrender.com/api/refunds/")
      .then((res) => res.json())
      .then((data) => setRefunds(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Refund Requests</h1>
      {refunds.length === 0 ? (
        <p>No refund requests found.</p>
      ) : (
        <ul className="space-y-2">
          {refunds.map((r) => (
            <li key={r.id} className="border p-3 rounded bg-red-50">
              {r.product_name} – {r.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Refunds;
