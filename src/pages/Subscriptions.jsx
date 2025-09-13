import React, { useEffect, useState } from "react";

const Subscriptions = () => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    fetch("https://djanagobackend-5.onrender.com/api/subscriptions/")
      .then((res) => res.json())
      .then((data) => setSubs(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">My Subscriptions</h1>
      {subs.length === 0 ? (
        <p>No active subscriptions.</p>
      ) : (
        <ul className="space-y-2">
          {subs.map((s) => (
            <li key={s.id} className="border p-3 rounded bg-blue-50">
              {s.name} – {s.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Subscriptions;
