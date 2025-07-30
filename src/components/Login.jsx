// src/components/Login.jsx
import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./Login.css"

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).catch((err) => setError(err.message));
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (user) {
    return (
      <div className="auth-container">
        <h2>Welcome, {user.email || user.displayName}</h2>
        <button className="auth-button logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleEmailLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button email-login">Sign In </button>
      </form>
      {error && <p className="auth-error">{error}</p>}

      <hr className="auth-divider" />
      
      <button className="auth-button google" onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
