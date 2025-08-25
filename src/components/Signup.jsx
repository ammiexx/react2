
// src/components/Signup.jsx
import React from "react";
import BackButton from "./Back";
import { SignUp } from "@clerk/clerk-react";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup-page">
       <BackButton className="md:hidden" />
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

       <SignUp
  path="/signup"
  routing="path"
  signInUrl="/login"
  afterSignUpUrl="/home"
/>
        <p className="terms">
          By signing up, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </p>

        <p className="signin-link">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
