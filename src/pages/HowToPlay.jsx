// src/pages/HowToPlay.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HowToPlay = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex flex-col">
      <Navbar />

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">How to Play</h1>
        
        <section className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-green-700">Step 1: Register Your Team</h2>
          <p className="text-lg text-gray-700">
            Start by registering your team on the homepage. Each team should have 2 players to participate.
          </p>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-green-700">Step 2: Scan QR Codes</h2>
          <p className="text-lg text-gray-700">
            Explore the campus and look for hidden QR codes. Scan these codes to unlock new challenges and questions.
          </p>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-green-700">Step 3: Solve the Challenges</h2>
          <p className="text-lg text-gray-700">
            Answer 2 fun questions at each stage. Correct answers will help you advance to the next stage.
          </p>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-green-700">Step 4: Finish Fast!</h2>
          <p className="text-lg text-gray-700">
            The team that completes all the stages first wins the game. Keep an eye on the time!
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowToPlay;
