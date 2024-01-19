import CardList from "../../components/CardList/CardList";
import "./ProfilePage.scss";
import { useState, useEffect } from "react";
import QuotesCarousel from "../../components/QuotesCarousel/QuotesCarousel";
import calenderIcon from "../../assets/icons/calender.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationCard from "../../components/NavigationCard/NavigationCard";
import journalIcon from "../../assets/icons/journal.png";
import LogoutDropdwon from "../../components/LogoutDropdown/LogoutDropdown";

export default function ProfilePage({ mood, setMood, cardsArray }) {
  const [greeting, setGreeting] = useState("");
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [data, setData] = useState(null);
  const [isLogoutDropdown, setIsLogoutDropdown] = useState(false);
  const navigate = useNavigate();

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

  const login = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8000/my-profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setData(response.data);
    } catch (error) {
      setFailedAuth(true);
      console.error(error);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    login();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  if (failedAuth) {
    return <main className="profile">You must log in to see this page.</main>;
  }

  if (isLoading) {
    return <main className="dashboard">Loading...</main>;
  }

  const handleCardClick = (cardIndex) => {
    setSelectedCardIndex(cardIndex);
  };

  const handleLogoutClick = () => {
    setIsLogoutDropdown((currentDropdown) => !currentDropdown);
  };

  return (
    <main className="profile">
      <div className="profile__wrapper">
        <div className="profile__header">
          <h4 className="profile__greeting">
            {greeting}, {data.first_name}
          </h4>
          <div className="profile__container">
            <div onClick={handleLogoutClick} className="profile__initial">
              {data.first_name[0]}
              {data.last_name[0]}
            </div>
            {isLogoutDropdown ? <LogoutDropdwon logout={logout} /> : null}
          </div>
        </div>
        <CardList
          mood={mood}
          setMood={setMood}
          handleCardClick={handleCardClick}
          selectedCardIndex={selectedCardIndex}
          cardsArray={cardsArray}
        />
        <section className="mood-navigation">
          <div className="mood-navigation__wrapper">
            <NavigationCard
              title="Journaling"
              image={journalIcon}
              description="Mood check in! Write down your thoughts and go deeper into how you are feeling."
              showButton={true}
              showImage={false}
              handleCardClick={handleCardClick}
              selectedCardIndex={selectedCardIndex}
            />
            <NavigationCard
              title="Monitor Your Mood"
              image={calenderIcon}
              description="Monitor your mood, gain insights about how you have felt, and discover the patterns and your evolution."
              showButton={false}
              showImage={true}
            />
          </div>
        </section>
        <section className="carousel">
          <QuotesCarousel />
        </section>
      </div>
    </main>
  );
}
