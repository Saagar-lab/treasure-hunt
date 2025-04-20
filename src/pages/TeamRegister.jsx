import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import treasureMap from "../assets/treasure-bg.jpg";
import scroll from "../assets/scroll.png";
import Footer from "../components/Footer";

const TeamRegister = () => {
  const [teamName, setTeamName] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName || !player1 || !player2) return alert("Fill all fields!");

    try {
      await addDoc(collection(db, "teams"), {
        teamName,
        player1,
        player2,
        score: 0,
        stage: 1,
        timestamp: Date.now(),
      });
      navigate("/scan");
    } catch (error) {
      console.error("Error adding team:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-cover bg-center" style={{ backgroundImage: `url(${treasureMap})` }}>
      {/* Sparkles animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div className="w-full h-full bg-[radial-gradient(white,transparent)] animate-pulse"></div>
      </motion.div>

      {/* Main Form Section */}
      <div className="flex-grow flex items-center justify-center px-4 pt-16 pb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 80 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full max-w-md"
        >
          {/* Scroll background */}
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="bg-no-repeat bg-contain bg-center p-8 pt-12 pb-10 shadow-2xl text-center"
            style={{
              backgroundImage: `url(${scroll})`,
              backgroundSize: "100% 100%",
            }}
          >
            <h2 className="text-3xl font-bold text-yellow-900 mb-6 font-adventure drop-shadow-lg">
              Register Your Crew 🏴‍☠️
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { value: teamName, set: setTeamName, placeholder: "Team Name" },
                { value: player1, set: setPlayer1, placeholder: "Player 1 Name" },
                { value: player2, set: setPlayer2, placeholder: "Player 2 Name" },
              ].map(({ value, set, placeholder }, i) => (
                <motion.input
                  key={i}
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 10px #facc15" }}
                  className="w-full px-4 py-2 border rounded bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-full bg-yellow-700 text-white py-2 rounded-md font-semibold hover:bg-yellow-800 transition"
              >
                Begin The Quest 🚀
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default TeamRegister;
