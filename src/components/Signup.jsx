import React, { useEffect, useState } from "react";
import { SignUp } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const location = useLocation();
  const fromRedirect = location.state?.fromRedirect;
  const [loading, setLoading] = useState(!!fromRedirect); // Only show if navigated from redirect

  // Simulate Clerk ready state (or use Clerk events if needed)
  useEffect(() => {
    if (fromRedirect) {
      // Simulate the load time of Clerk (1s here, adjust as needed)
      const timer = setTimeout(() => {
        setLoading(false); // Clerk is assumed ready
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [fromRedirect]);

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="Logo"
            className="signup-logo"
          />
          <h2>Create your CBN account</h2>
          <p>Join us to explore products and post your business offerings.</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 text-sm animate-pulse">
            Redirecting to sign up...
          </div>
        ) : (
          <SignUp
            path="/signup"
            routing="path"
            signInUrl="/login"
          />
        )}

        <p className="terms">
          By signing up, you agree to our <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>

        <p className="signin-link">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
