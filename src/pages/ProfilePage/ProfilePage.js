import CardList from "../../components/CardList/CardList";
import "./ProfilePage.scss";
import profileImage from "../../assets/icons/profile.svg";
import { useState, useEffect } from "react";
import getAllQuotes from "../../scripts/utils/get-all-quotes";
import QuotesCarousel from "../../components/QuotesCarousel/QuotesCarousel";

export default function ProfilePage({ mood, setMood }) {
  const [greeting, setGreeting] = useState("");
  const [quotes, setQuotes] = useState(null);

  useEffect(() => {
    const time = new Date().getHours();

    if (time < 12) {
      setGreeting("Good Morning");
    } else if (time >= 12 && time <= 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await getAllQuotes();
        const quotesData = response;
        setQuotes(quotesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuotes();
  }, []);

  if (!quotes) {
    return <p>Loading</p>;
  }

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <div className="profile__container">
          <img
            src={profileImage}
            alt="profile placeholder"
            className="profile__image"
          ></img>
          <h4 className="profile__title">{greeting}, Mia!</h4>
        </div>
        <CardList mood={mood} setMood={setMood} />
        <div className="profile__mood-tracker-card">
          <h4 className="profile__mood-tracker-title">Track Your Mood</h4>
          <p>You can also monitor your mood.</p>
        </div>
        <QuotesCarousel quotes={quotes} />
      </div>
    </section>
  );
}
