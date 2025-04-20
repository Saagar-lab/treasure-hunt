import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaRocket, FaPuzzlePiece, FaClock } from "react-icons/fa"; // Removed FaBox and treasure-related icons

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center text-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass p-10 rounded-2xl shadow-xl max-w-3xl w-full"
        >
          {/* Title */}
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Join the EcoQuest 🌿
          </h2>
          <p className="text-lg text-gray-700 mb-8 italic">
            "Power the future by solving the past – let the adventure begin!"
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105 hover:rotate-3"
            >
              🚀 Register Team
            </a>
            <a
              href="/register"  // ✅ This was "/scan" before
              className="border border-green-600 text-green-600 hover:bg-green-100 px-6 py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105 hover:rotate-3"
            >
              🎯 Start Adventure
            </a>
          </div>
        </motion.div>
      </main>

      {/* HOW TO PLAY SECTION */}
      <section className="bg-white px-6 py-12">
        <h3 className="text-3xl font-bold text-center text-green-700 mb-10">How to Play</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Animated cards for How to Play */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            className="p-6 rounded-xl shadow-md bg-green-50 hover:scale-105 transition duration-300"
          >
            <FaRocket className="text-3xl text-green-600 mb-2" />
            <h4 className="text-xl font-semibold text-green-800 mb-1">Scan QR Codes</h4>
            <p className="text-gray-600">Find QR codes hidden in the campus and scan to unlock challenges.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="p-6 rounded-xl shadow-md bg-green-50 hover:scale-105 transition duration-300"
          >
            <FaPuzzlePiece className="text-3xl text-green-600 mb-2" />
            <h4 className="text-xl font-semibold text-green-800 mb-1">Solve Challenges</h4>
            <p className="text-gray-600">Answer 2 fun questions at each stage to move forward.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            className="p-6 rounded-xl shadow-md bg-green-50 hover:scale-105 transition duration-300"
          >
            <FaClock className="text-3xl text-green-600 mb-2" />
            <h4 className="text-xl font-semibold text-green-800 mb-1">Finish Fast</h4>
            <p className="text-gray-600">The fastest team to finish all stages wins. Time is ticking!</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
