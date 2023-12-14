import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.scss";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import MobileNavBar from "./components/BottomNavBar/BottomNavBar";
import LandingPage from "../src/pages/LandingPage/LandingPage";
import ProfilePage from "../src/pages/ProfilePage/ProfilePage";
import JournalPage from "../src/pages/JournalPage/JournalPage";
import JournalEntriesPage from "./pages/JournalEntriesPage/JournalEntriesPage";
import TrackerPage from "../src/pages/TrackerPage/TrackerPage";
import MeditationPage from "./pages/MeditationPage/MeditationPage";
import SignupPage from "../src/pages/SignupPage/SignupPage";
import LoginPage from "../src/pages/LoginPage/LoginPage";
import { useState } from "react";

function App() {
  const [mood, setMood] = useState("");

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={<ProfilePage mood={mood} setMood={setMood} />}
          />

          <Route
            path="/journal/new"
            element={<JournalPage mood={mood} setMood={setMood} type={"new"} />}
          />
          <Route path="/journal-entries" element={<JournalEntriesPage />} />
          <Route
            path="/journal/edit/:journalId"
            element={<JournalPage type={"edit"} />}
          />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/meditation" element={<MeditationPage />} />
        </Routes>
        <BottomNavBar />
      </BrowserRouter>
    </>
  );
}

export default App;
