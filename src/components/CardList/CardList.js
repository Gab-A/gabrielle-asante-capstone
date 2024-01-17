import Card from "../Card/Card";
import journalIcon from "../../assets/icons/journal.png";
import "./CardList.scss";
import "../../assets/icons/smile.svg";

export default function CardList({
  mood,
  setMood,
  selectedCardIndex,
  handleCardClick,
  cardsArray,
}) {
  return (
    <section className="mood">
      <div className="mood__header">
        <h3 className="mood__heading">How are you feeling today?</h3>
        <p className="mood__subheading">
          Select a mood so that you can get journaling!
        </p>
      </div>
      <div className="mood__wrapper">
        <div className="mood__cards-container">
          {cardsArray.map((card, index) => (
            <Card
              key={card.id}
              title={card.title}
              image={card.image}
              isSelected={selectedCardIndex === index}
              isClickable={selectedCardIndex === null}
              handleCardClick={() => handleCardClick(index)}
              mood={mood}
              setMood={setMood}
            />
          ))}
        </div>
        {/* {showThoughtsDiv && (
          <NavigationCard
            title="Journaling"
            image={journalIcon}
            description="Giving you the space and time to write your vibe!"
            showButton={true}
            showImage={false}
          />
        )} */}
      </div>
    </section>
  );
}
