import CardList from "../../components/CardList/CardList";
import "./ProfilePage.scss";
import { useState, useEffect } from "react";
import getAllQuotes from "../../scripts/utils/get-all-quotes";
import QuotesCarousel from "../../components/QuotesCarousel/QuotesCarousel";
import calenderIcon from "../../assets/icons/calender.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationCard from "../../components/NavigationCard/NavigationCard";
import journalIcon from "../../assets/icons/journal.png";
// import happyEmoji from "../../assets/icons/smile.svg";
// import sadEmoji from "../../assets/icons/sad.svg";
// import anxiousEmoji from "../../assets/icons/anxious.svg";
// import tiredEmoji from "../../assets/icons/tired.svg";
// import stressedEmoji from "../../assets/icons/stressed.svg";
// import gratefulEmoji from "../../assets/icons/grateful.svg";
// import unsureEmoji from "../../assets/icons/unsure.svg";
// import calmEmoji from "../../assets/icons/calm.svg";
// import angryEmoji from "../../assets/icons/angry.svg";

export default function ProfilePage({ mood, setMood, cardsArray }) {
  const [greeting, setGreeting] = useState("");
  // const [quotes, setQuotes] = useState(null);
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

  // useEffect(() => {
  //   const fetchQuotes = async () => {
  //     try {
  //       const response = await getAllQuotes();
  //       const quotesData = response;
  //       setQuotes(quotesData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchQuotes();
  // }, []);

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

  // if (!quotes) {
  //   return <p>Loading</p>;
  // }

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

  // const cardsArray = [
  //   {
  //     id: "267858",
  //     title: "Happy",
  //     image: happyEmoji,
  //   },
  //   {
  //     id: "246810",
  //     title: "Sad",
  //     image: sadEmoji,
  //   },
  //   {
  //     id: "434845",
  //     title: "Angry",
  //     image: angryEmoji,
  //   },
  //   {
  //     id: "789569",
  //     title: "Grateful",
  //     image: gratefulEmoji,
  //   },
  //   {
  //     id: "435858",
  //     title: "Calm",
  //     image: calmEmoji,
  //   },
  //   {
  //     id: "434323",
  //     title: "Unsure",
  //     image: unsureEmoji,
  //   },
  //   {
  //     id: "623589",
  //     title: "Stressed",
  //     image: stressedEmoji,
  //   },
  //   {
  //     id: "984456",
  //     title: "Tired",
  //     image: tiredEmoji,
  //   },
  //   {
  //     id: "4655859",
  //     title: "Anxious",
  //     image: anxiousEmoji,
  //   },
  // ];

  return (
    <main className="profile">
      <div className="profile__wrapper">
        <div className="profile__header">
          <h4 className="profile__greeting">
            {greeting}, {data.first_name}
          </h4>
          <div className="profile__initial">
            {data.first_name[0]}
            {data.last_name[0]}
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
              description="Monitor your mood and gain insights about how you have felt and begin to discover patterns and your evolution."
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
