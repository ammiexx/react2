import React from "react";

const PaymentMethods = () => {
  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Payment Methods</h1>
      <p>Saved cards and payment options will appear here.</p>
      <ul className="space-y-2">
        <li>💳 Visa ending in 4242</li>
        <li>💳 MasterCard ending in 4444</li>
      </ul>
    </div>
  );
};

export default PaymentMethods;
