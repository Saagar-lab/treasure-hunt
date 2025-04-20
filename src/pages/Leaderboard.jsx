import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CSVLink } from "react-csv";

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const querySnapshot = await getDocs(collection(db, "teams"));
      const teamList = [];
      querySnapshot.forEach((doc) => {
        teamList.push({ id: doc.id, ...doc.data() });
      });
      // Sort by score DESC, then time ASC
      teamList.sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);
      setTeams(teamList);
      setFilteredTeams(teamList);
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    // Filter teams based on the search term
    const filtered = teams.filter(
      (team) =>
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.player1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.player2.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchTerm, teams]);

  const formatTime = (seconds) => {
    // Ensure that the time is a valid number before formatting
    if (isNaN(seconds)) return "N/A";
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex flex-col">
      <Navbar />

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">🏆 Leaderboard</h1>
        
        {/* Search bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            className="p-3 w-full sm:w-1/2 border border-green-600 rounded-xl"
            placeholder="Search by team name or player"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Export CSV Button */}
        <div className="flex justify-center mb-6">
          <CSVLink
            data={filteredTeams}
            filename="leaderboard.csv"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
          >
            Export CSV
          </CSVLink>
        </div>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Team</th>
                <th className="py-3 px-4 text-left">Players</th>
                <th className="py-3 px-4 text-left">Score</th>
                <th className="py-3 px-4 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team, index) => (
                <tr
                  key={team.id}
                  className={index % 2 === 0 ? "bg-green-50" : "bg-white"}
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-bold text-green-700">{team.teamName}</td>
                  <td className="py-3 px-4">{team.player1} & {team.player2}</td>
                  <td className="py-3 px-4 font-semibold">{team.score}/20</td>
                  <td className="py-3 px-4">{formatTime(team.timeTaken)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-5 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          ⬅️ Back to Home
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
