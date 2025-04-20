import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; 

const [quizData, setQuizData] = useState(null);

useEffect(() => {
  const fetchQuiz = async () => {
    try {
      const docRef = doc(db, "questions", stageId); // e.g. stage1
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setQuizData(docSnap.data());
      } else {
        console.log("No such quiz stage!");
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  fetchQuiz();
}, [stageId]);

// Guard: if not loaded yet
if (!quizData) {
  return <div className="text-center mt-20">⏳ Loading Quiz...</div>;
}

const questions = quizData.questions;
const hint = quizData.hint;

const QuizPage = () => {
  const { stageId } = useParams();
  const navigate = useNavigate();

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 min

  const questions = dummyQuestions[stageId]?.questions || [];
  const hint = dummyQuestions[stageId]?.hint || "Next hint coming soon!";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowHint(true);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOptionClick = (questionIndex, option) => {
    if (selectedAnswers[questionIndex]) return;

    const correct = questions[questionIndex].answer === option;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
    if (correct) setScore((prev) => prev + 2);

    // Show hint only after both questions answered
    if (Object.keys(selectedAnswers).length + 1 === questions.length) {
      setShowHint(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 p-4 flex flex-col items-center justify-start">
      <motion.div
        className="w-full max-w-lg bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 mt-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-green-800">
            🧠 Stage: {stageId.replace("stage", "")}
          </h1>
          <p className="text-md font-semibold text-red-600">
            ⏱️ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </p>
        </div>

        {/* Questions */}
        {questions.map((q, i) => (
          <div key={i} className="mb-6">
            <p className="font-medium text-gray-800 mb-2">
              {i + 1}. {q.question}
            </p>
            <div className="grid gap-2">
              {q.options.map((opt) => {
                const isSelected = selectedAnswers[i] === opt;
                const isCorrect = q.answer === opt;

                return (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(i, opt)}
                    disabled={!!selectedAnswers[i]}
                    className={`w-full px-4 py-2 rounded-md text-left font-medium transition-all
                      ${isSelected ? (isCorrect ? "bg-green-500 text-white" : "bg-red-400 text-white") : "bg-white hover:bg-gray-100"}
                    `}
                  >
                    {opt}
                    {isSelected && isCorrect && " ✅"}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Hint Section */}
        {showHint && (
          <motion.div
            className="mt-6 bg-green-100 border border-green-400 rounded-lg p-4 text-green-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-semibold">🧭 Hint for Next QR:</p>
            <p>{hint}</p>
          </motion.div>
        )}

        {/* Next Button */}
        {showHint && (
          <motion.button
            className="mt-6 w-full py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
            onClick={() => navigate("/qr")}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Proceed to Next Stage
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default QuizPage;
