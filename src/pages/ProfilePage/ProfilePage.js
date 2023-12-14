import CardList from "../../components/CardList/CardList";
import "./ProfilePage.scss";
import profileImage from "../../assets/icons/profile.svg";
import { useState, useEffect } from "react";
import getAllQuotes from "../../scripts/utils/get-all-quotes";
import QuotesCarousel from "../../components/QuotesCarousel/QuotesCarousel";
import calenderIcon from "../../assets/icons/calender.png";
import chevronIcon from "../../assets/icons/chevron.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ mood, setMood }) {
  const [greeting, setGreeting] = useState("");
  const [quotes, setQuotes] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
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

  return (
    <main className="profile">
      <div className="profile__wrapper">
        <div className="profile__container">
          <img
            src={profileImage}
            alt="profile placeholder"
            className="profile__image"
          ></img>
          <h4 className="profile__title">
            {greeting}, {data.first_name}
          </h4>
        </div>
        <CardList mood={mood} setMood={setMood} />
        <div className="profile__mood-tracker-card">
          <h4 className="profile__mood-tracker-title">
            Monitor Your Mood
            <img
              src={calenderIcon}
              alt="tracker icon"
              className="profile__tracker"
            ></img>
          </h4>
          <div className="profile__mood-indicator">
            <p className="profile__mood-subheading">
              Track your mood and see your evolution.
            </p>
            <Link to="/tracker">
              <div className="profile__mood-chevron-container">
                <img src={chevronIcon} className="profile__chevron"></img>
              </div>
            </Link>
          </div>
        </div>
        <QuotesCarousel quotes={quotes} />
      </div>
    </main>
  );
}
