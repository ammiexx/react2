// src/components/Welcome.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to home after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600">🎉 Welcome!</h1>
        <p className="mt-2 text-gray-700">Your account has been created successfully.</p>
        <p className="mt-1 text-gray-500">Redirecting you to the homepage...</p>
      </div>
    </div>
  );
};

export default Welcome;
