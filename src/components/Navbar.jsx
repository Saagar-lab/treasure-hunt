import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Left: Logo */}
      <Link to="/" className="text-xl font-bold text-green-700">
        🌍 EcoQuest
      </Link>

      {/* Right: Links */}
      <div className="flex gap-4 items-center text-green-700 font-medium">
        <Link to="/leaderboard" className="hover:text-green-900">
           Leaderboard
        </Link>
        <Link to="/how-to-play" className="hover:text-green-900">
           How to Play
        </Link>
        <Link
          to="/admin-login"
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
