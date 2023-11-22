import Card from "../Card/Card";
import journalImage from "../../assets/icons/journal.svg";
import "./CardList.scss";
import "../../assets/icons/smile.svg";
import happyEmoji from "../../assets/icons/smile.svg";
import sadEmoji from "../../assets/icons/sad.svg";
import anxiousEmoji from "../../assets/icons/anxious.svg";
import tiredEmoji from "../../assets/icons/tired.svg";
import stressedEmoji from "../../assets/icons/stressed.svg";
import gratefulEmoji from "../../assets/icons/grateful.svg";
import unsureEmoji from "../../assets/icons/unsure.svg";
import calmEmoji from "../../assets/icons/calm.svg";
import angryEmoji from "../../assets/icons/angry.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CardList({ mood, setMood }) {
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
      title: "Unusre",
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

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showThoughtsDiv, setShowThoughtsDiv] = useState(false);

  const handleCardClick = (cardIndex) => {
    if (selectedCardIndex === null || selectedCardIndex !== cardIndex) {
      setSelectedCardIndex(cardIndex);
      setShowThoughtsDiv(true);
    } else {
      setShowThoughtsDiv(false);
      setSelectedCardIndex(null);
    }
  };

  return (
    <section className="mood">
      <h1 className="mood__heading">How are you feeling today?</h1>
      <div className="mood__wrapper">
        <div className="mood__image-container">
          {cardsArray.map((card, index) => (
            <Card
              key={card.id}
              title={card.title}
              image={card.image}
              isSelected={selectedCardIndex === index}
              isClickable={selectedCardIndex === null}
              onClick={() => handleCardClick(index)}
              mood={mood}
              setMood={setMood}
            />
          ))}
          {showThoughtsDiv && (
            <div className="mood__journal-card">
              <div className="mood__journal-details">
                <h4 className="mood__journal-title">Jounraling</h4>
                <img
                  src={journalImage}
                  alt="journal image"
                  className="mood__journal-image"
                ></img>
              </div>
              <Link to="/journal" className="mood__journal-button-link">
                <div className="mood__journal-button-container">
                  <button className="mood__journal-button">
                    Express your thoughts here
                  </button>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
