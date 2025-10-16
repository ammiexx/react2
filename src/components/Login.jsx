import React, { useEffect, useState } from "react";
import { SignIn, useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { loaded: clerkLoaded } = useClerk();
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

  // ✅ Show loading screen until Clerk fully loads
  if (!clerkLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <p>Loading sign-in page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 flex items-center justify-center">
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/signup"
        afterSignUpUrl="/welcome"
        appearance={{
          layout: {
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
            card:
              "rounded-lg shadow-lg bg-white border border-gray-200 p-6 text-gray-800",
            formButtonPrimary:
              "bg-blue-600 hover:bg-blue-700 text-white font-medium",
          },
        }}
      />

      {/* ✅ Optional success popup */}
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
