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
import happyEmoji from "./assets/icons/smile.svg";
import sadEmoji from "./assets/icons/sad.svg";
import anxiousEmoji from "./assets/icons/anxious.svg";
import tiredEmoji from "./assets/icons/tired.svg";
import stressedEmoji from "./assets/icons/stressed.svg";
import gratefulEmoji from "./assets/icons/grateful.svg";
import unsureEmoji from "./assets/icons/unsure.svg";
import calmEmoji from "./assets/icons/calm.svg";
import angryEmoji from "./assets/icons/angry.svg";

function App() {
  const [mood, setMood] = useState("");

  const cardsArray = [
    {
      id: "267858",
      title: "Happy",
      image: happyEmoji,
    },
    {
      id: "246810",
      title: "Sad",
      image: sadEmoji,
    },
    {
      id: "434845",
      title: "Angry",
      image: angryEmoji,
    },
    {
      id: "789569",
      title: "Grateful",
      image: gratefulEmoji,
    },
    {
      id: "435858",
      title: "Calm",
      image: calmEmoji,
    },
    {
      id: "434323",
      title: "Unsure",
      image: unsureEmoji,
    },
    {
      id: "623589",
      title: "Stressed",
      image: stressedEmoji,
    },
    {
      id: "984456",
      title: "Tired",
      image: tiredEmoji,
    },
    {
      id: "4655859",
      title: "Anxious",
      image: anxiousEmoji,
    },
  ];

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
            element={
              <ProfilePage
                mood={mood}
                setMood={setMood}
                cardsArray={cardsArray}
              />
            }
          />

          <Route
            path="/journal/new"
            element={
              <JournalPage
                mood={mood}
                setMood={setMood}
                type={"new"}
                cardsArray={cardsArray}
              />
            }
          />
          <Route path="/journal-entries" element={<JournalEntriesPage />} />
          <Route
            path="/journal/edit/:journalId"
            element={<JournalPage type={"edit"} />}
          />
          <Route
            path="/tracker"
            element={<TrackerPage cardsArray={cardsArray} />}
          />
          <Route path="/meditation" element={<MeditationPage />} />
        </Routes>
        <BottomNavBar />
      </BrowserRouter>
    </>
  );
}

export default App;
