import React, { useState, useEffect } from "react";

const Wallet = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetch("https://djanagobackend-5.onrender.com/api/wallet/")
      .then((res) => res.json())
      .then((data) => setBalance(data.balance));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Wallet Balance</h1>
      <p className="text-xl font-semibold">{balance} Birr</p>
    </div>
  );
};

export default Wallet;
