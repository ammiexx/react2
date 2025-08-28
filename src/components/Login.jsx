import React, { useEffect, useState } from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      // Show popup
      setShowSuccessPopup(true);

      // Hide after 3 seconds and navigate
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/"); // or wherever you want to redirect
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSignedIn, user, navigate]);

  return (
    <div className="auth-container relative">
      <h2>Welcome back</h2>

      {/* Clerk's sign-in component */}
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/signup"
         afterSignUpUrl="/?signupSuccess=true" //
      />

      {/* Pop-up success message */}
      {showSuccessPopup && (
        <div className="fixed top-6 right-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow z-50 transition-opacity duration-300">
          <strong className="font-semibold">✅ Sign-up Successful!</strong>
          <p>Redirecting...</p>
        </div>
      )}

      {/* Custom sign up link below the component */}
      <p className="signin-footer">
        you have an account?
        <button className="signup-link-button" onClick={() => navigate("/signup")}>
          Sign In
        </button>
      </p>
    </div>
  );
};

export default Login;
