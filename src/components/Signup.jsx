// src/components/Signup.jsx
import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);

    try {
      // Create account
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      // Send email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Optional: Automatically verify or wait for user to enter code (not implemented here)

      // Activate the session
      await setActive({ session: signUp.createdSessionId });

      // Redirect to homepage
      navigate("/welcome");
    } catch (err) {
      console.error("❌ Signup failed:", err);
      const errorMessage = err.errors?.[0]?.message || "Signup failed. Try again.";
      setErrMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="Logo"
            className="mx-auto h-12 w-12"
          />
          <h2 className="text-xl font-semibold mt-4">Create Account</h2>
          <p className="text-gray-600 text-sm">Join us to explore and post your offerings.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errMsg && <p className="text-red-600 text-sm text-center">{errMsg}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            disabled={!isLoaded || loading}
          >
            {loading ? "Signing..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          By signing up, you agree to our{" "}
          <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>

        <p className="text-sm text-center mt-2 text-gray-700">
          Already have an account?{" "}
          {/* <a href="/login" className="text-blue-600 hover:underline">Sign Up</a> */}
        </p>
      </div>
    </div>
  );
};

export default Signup;
