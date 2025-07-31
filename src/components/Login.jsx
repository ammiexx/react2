// src/components/Login.jsx
import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="auth-container">
      <h2>Welcome back</h2>

      {/* Clerk's sign-in component */}
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/signup"
        afterSignInUrl="http://localhost:5173/home"
      />

      {/* Custom sign up link below the component */}
      <p className="signin-footer">
        Don’t have an account?
        <button className="signup-link-button" onClick={goToSignup}>
          Sign up here
        </button>
      </p>
    </div>
  );
};

export default Login;
