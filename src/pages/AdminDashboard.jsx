import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STAGES = ["stage1", "stage2", "stage3", "stage4", "stage5"];

export default function AdminDashboard() {
  const [selectedStage, setSelectedStage] = useState("stage1");
  const [stageData, setStageData] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ Needed for Back to Home

  const loadStage = async (stage) => {
    setLoading(true);
    const docRef = doc(db, "questions", stage);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setStageData(snap.data());
    } else {
      setStageData({
        questions: [
          { question: "", options: ["", "", "", ""], answer: "" },
          { question: "", options: ["", "", "", ""], answer: "" },
        ],
        hint: "",
      });
    }
    setLoading(false);
  };

  const loadTeams = async () => {
    const querySnapshot = await getDocs(collection(db, "teams"));
    const teamList = [];
    querySnapshot.forEach((doc) => {
      teamList.push({ id: doc.id, ...doc.data() });
    });
    setTeams(teamList);
  };

  useEffect(() => {
    loadStage(selectedStage);
    loadTeams();
  }, [selectedStage]);

  const handleSave = async () => {
    await setDoc(doc(db, "questions", selectedStage), stageData);
    alert("✅ Saved Successfully");
  };

  const deleteTeam = async (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      await deleteDoc(doc(db, "teams", id));
      loadTeams();
    }
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...stageData.questions];
    updated[index][field] = value;
    setStageData({ ...stageData, questions: updated });
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...stageData.questions];
    updated[qIndex].options[oIndex] = value;
    setStageData({ ...stageData, questions: updated });
  };

  const formatTime = (seconds) => {
    if (typeof seconds !== "number" || isNaN(seconds)) return "-";
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec}s`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">🛠 Admin Dashboard</h1>

        {/* Stage Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {STAGES.map((stage) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`px-4 py-2 rounded-lg font-medium ${
                stage === selectedStage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {stage.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Quiz Editor */}
        {loading || !stageData ? (
          <p className="text-center text-gray-500">Loading stage...</p>
        ) : (
          <div className="space-y-6">
            {stageData.questions.map((q, i) => (
              <div
                key={i}
                className="p-5 bg-white rounded-2xl shadow space-y-3 border"
              >
                <h2 className="font-semibold text-lg text-blue-800">
                  Question {i + 1}
                </h2>
                <input
                  className="w-full p-2 border rounded"
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(i, "question", e.target.value)
                  }
                  placeholder="Question"
                />
                {q.options.map((opt, j) => (
                  <input
                    key={j}
                    className="w-full p-2 border rounded"
                    value={opt}
                    onChange={(e) => updateOption(i, j, e.target.value)}
                    placeholder={`Option ${j + 1}`}
                  />
                ))}
                <input
                  className="w-full p-2 border rounded"
                  value={q.answer}
                  onChange={(e) => updateQuestion(i, "answer", e.target.value)}
                  placeholder="Correct Answer"
                />
              </div>
            ))}

            <div className="bg-white p-5 rounded-2xl shadow border">
              <h2 className="font-semibold text-lg text-green-700">
                Hint for Next QR
              </h2>
              <input
                className="w-full p-2 border rounded"
                value={stageData.hint}
                onChange={(e) =>
                  setStageData({ ...stageData, hint: e.target.value })
                }
                placeholder="Hint for next QR"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200"
            >
              💾 Save Changes
            </button>
          </div>
        )}

        {/* Leaderboard with Delete Option */}
        <h2 className="text-2xl font-bold mt-12 mb-4 text-center text-green-800">
          🏆 Leaderboard (Admin Access)
        </h2>
        <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
          <table className="min-w-full table-auto">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Team</th>
                <th className="py-3 px-4 text-left">Players</th>
                <th className="py-3 px-4 text-left">Score</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr
                  key={team.id}
                  className={index % 2 === 0 ? "bg-green-50" : "bg-white"}
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-bold text-green-700">
                    {team.teamName}
                  </td>
                  <td className="py-3 px-4">
                    {team.player1} & {team.player2}
                  </td>
                  <td className="py-3 px-4 font-semibold">{team.score}</td>
                  <td className="py-3 px-4">{formatTime(team.timeTaken)}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteTeam(team.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-green-800 text-white rounded-xl hover:bg-green-900"
          >
            ⬅️ Back to Home
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
