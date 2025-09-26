import React, { useEffect, useState } from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      setShowSuccessPopup(true);
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/"); // redirect after login
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSignedIn, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/signup"
        afterSignUpUrl="/welcome"
        appearance={{
          layout: {
            // Center the card
            card: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "350px",
            },
          },
          elements: {
            footer: "hidden",
            card: "rounded-lg shadow-lg bg-gray-800 p-6", // style card
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          },
        }}
      />

      {/* Optional success popup */}
      {showSuccessPopup && (
        <div className="fixed top-6 right-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow z-50 transition-opacity duration-300">
          <strong className="font-semibold">✅ Sign-in Successful!</strong>
          <p>Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default Login;
