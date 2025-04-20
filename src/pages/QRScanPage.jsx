import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const QRScanPage = () => {
  const navigate = useNavigate();
  
  // Track the number of QR codes scanned
  const [scannedCount, setScannedCount] = useState(0);
  const totalStages = 5;  // Example: total stages = 5 QR codes to scan

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250, // keeps it centered but invisible
    });

    scanner.render(
      (decodedText) => {
        scanner.clear();
        setScannedCount((prevCount) => prevCount + 1);  // Increment the scan count
        navigate(`/quiz/${decodedText}`);  // Redirect to the next quiz or stage

        // Check if the user has completed all stages
        if (scannedCount + 1 === totalStages) {
          // Redirect to the Celebration page after completing all stages
          navigate("/celebration");
        }
      },
      (error) => {
        console.warn("QR Scan Error:", error);
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error("Clear error:", err));
    };
  }, [navigate, scannedCount]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-yellow-100 p-4">
      <motion.div
        className="w-full max-w-sm bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <motion.h1
          className="text-xl font-bold text-green-800 mb-4 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          📸 Scan Your QR Clue
        </motion.h1>

        {/* Scanner Camera Feed */}
        <div
          id="reader"
          className="w-full aspect-square bg-black rounded-lg overflow-hidden shadow-lg"
        ></div>

        {/* Instructions */}
        <p className="text-sm text-gray-800 mt-4 text-center">
          Align the clue in view to scan and unlock your next challenge.
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-5 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          ⬅️ Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default QRScanPage;
