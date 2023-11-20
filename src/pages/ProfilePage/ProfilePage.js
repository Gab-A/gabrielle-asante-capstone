import CardList from "../../components/CardList/CardList";
import "./ProfilePage.scss";
import profileImage from "../../assets/icons/profile.svg";
import { useState, useEffect } from "react";
import getAllQuotes from "../../scripts/utils/get-all-quotes";
import QuotesCarousel from "../../components/QuotesCarousel/QuotesCarousel";

export default function ProfilePage() {
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
        console.log(response);
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

  console.log(quotes);

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <div className="profile__container">
          <img
            src={profileImage}
            alt="profile placeholder"
            className="profile__image"
          ></img>
          <h4 className="profile__title">{greeting}, Mia</h4>
        </div>
        <p className="profile__title-quotes">Your Daily Motivational Quotes:</p>
        <QuotesCarousel quotes={quotes} />
      </div>
      <CardList />
      <h4 className="profile__journal-title">Jounraling</h4>
      <div className="profile__journal-card">
        <p className="profile__journal__text">
          You can be yourself here. Select a mood, and you can express more
          about how are feeling...
        </p>
      </div>
    </section>
  );
}
