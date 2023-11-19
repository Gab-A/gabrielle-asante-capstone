import Card from "../Card/Card";
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

export default function CardList() {
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

    // {
    //   id: "423451",
    //   title: "Angry",
    //   image: angryEmoji,
    // },
  ];
  return (
    <section className="mood">
      <div className="mood__wrapper">
        <h1 className="mood__heading">How are you feeling today?</h1>
        <div className="mood__container">
          {cardsArray.map((card) => (
            <Card key={card.id} title={card.title} image={card.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
