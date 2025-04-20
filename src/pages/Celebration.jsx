// src/pages/Celebration.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Celebration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex flex-col">
      <Navbar />

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Congratulations!</h1>
          <p className="text-xl text-gray-700 mb-6">
            You have successfully completed all the stages of the EcoQuest! 🌿
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for playing, and remember, you're contributing to a more sustainable future.
          </p>
          <p className="text-2xl text-green-800 font-semibold">Your Team is the Hero! 🏆</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Celebration;
