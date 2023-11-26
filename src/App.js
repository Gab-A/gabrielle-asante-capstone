import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.scss";
import MobileNavBar from "../src/components/MobileNavBar/MobileNavBar";
import LandingPage from "../src/pages/LandingPage/LandingPage";
import ProfilePage from "../src/pages/ProfilePage/ProfilePage";
import JournalPage from "../src/pages/JournalPage/JournalPage";
import JournalEntriesPage from "./pages/JournalEntriesPage/JournalEntriesPage";
import TrackerPage from "../src/pages/TrackerPage/TrackerPage";
import MeditationPage from "./pages/MeditationPage/MeditationPage";
import { useState } from "react";

function App() {
  const [mood, setMood] = useState("");

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/profile"
            element={<ProfilePage mood={mood} setMood={setMood} />}
          />

          <Route
            path="/journal/new"
            element={<JournalPage mood={mood} setMood={setMood} type={"new"} />}
          />
          <Route
            path="/journal/edit/:journalId"
            element={
              <JournalPage mood={mood} setMood={setMood} type={"edit"} />
            }
          />
          <Route path="/journal-entries" element={<JournalEntriesPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/meditation" element={<MeditationPage />} />
        </Routes>
        <MobileNavBar />
      </BrowserRouter>
    </>
  );
}

export default App;
