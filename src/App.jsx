import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TeamRegister from "./pages/TeamRegister";
import QRScanPage from "./pages/QRScanPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Leaderboard from "./pages/Leaderboard";
import HowToPlay from "./pages/HowToPlay"; 
import Celebration from "./pages/Celebration";
// (You'll later add QRScanPage here too)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<TeamRegister />} />
        <Route path="/scan" element={<QRScanPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/celebration" element={<Celebration />} />
      </Routes>
    </Router>
  );
}

export default App;
