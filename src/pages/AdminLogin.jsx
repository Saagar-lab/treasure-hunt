// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple hardcoded check — update to Firebase Auth later if needed
    if (password === "admin123") {
      navigate("/admin");
    } else {
      alert("Wrong password 🚫");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-100 to-blue-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">🔐 Admin Login</h2>
        <input
          type="password"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
}
