import CardList from "../../components/CardList/CardList";
import "./ProfilePage.scss";
import profileImage from "../../assets/icons/profile.svg";
import { useState, useEffect } from "react";
import getAllQuotes from "../../scripts/utils/get-all-quotes";
import QuotesCarousel from "../../components/QuotesCarousel/QuotesCarousel";
import calenderIcon from "../../assets/icons/calender.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationCard from "../../components/NavigationCard/NavigationCard";
import journalIcon from "../../assets/icons/journal.png";

export default function ProfilePage({ mood, setMood }) {
  const [greeting, setGreeting] = useState("");
  const [quotes, setQuotes] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

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

  if (!quotes) {
    return <p>Loading</p>;
  }

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
    // console.log("Before Click - selectedCardIndex:", selectedCardIndex);
    setSelectedCardIndex(cardIndex);
    // console.log("After Click - selectedCardIndex:", cardIndex);
  };

  return (
    <main className="profile">
      <div className="profile__wrapper">
        <div className="profile__container">
          {/* <img
            src={profileImage}
            alt="profile placeholder"
            className="profile__image"
          ></img> */}
          {/* <div>{data.first_name[0]}</div> */}
          <h4 className="profile__greeting">
            {greeting}, {data.first_name}
          </h4>
          <div className="profile__initial">{data.first_name[0]}</div>
        </div>
        <CardList
          mood={mood}
          setMood={setMood}
          handleCardClick={handleCardClick}
          selectedCardIndex={selectedCardIndex}
        />
        <section className="mood-navigation">
          <div className="mood-navigation__wrapper">
            <NavigationCard
              title="Journaling"
              image={journalIcon}
              description="Giving you the space and time to write your vibe!"
              showButton={true}
              showImage={false}
              handleCardClick={handleCardClick}
              selectedCardIndex={selectedCardIndex}
            />
            <NavigationCard
              title="Monitor Your Mood"
              image={calenderIcon}
              description="Track your mood and see your evolution"
              showButton={false}
              showImage={true}
            />
          </div>
        </section>
        <section className="carousel">
          <QuotesCarousel quotes={quotes} />
        </section>
      </div>
    </main>
  );
}
