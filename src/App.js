import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import LandingPage from "../src/pages/LandingPage/LandingPage";
import LoginPage from "../src/pages/LoginPage/LoginPage";
import SignupPage from "../src/pages/SignupPage/SignupPage";
import ProfilePage from "../src/pages/ProfilePage/ProfilePage";
import JournalPage from "../src/pages/JournalPage/JournalPage";
import TrackerPage from "../src/pages/TrackerPage/TrackerPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
