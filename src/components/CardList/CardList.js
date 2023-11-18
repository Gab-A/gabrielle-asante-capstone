import Card from "../Card/Card";
import "./CardList.scss";
import "../../assets/icons/smile.svg";
import happyImage from "../../assets/icons/smile.svg";
import sadImage from "../../assets/icons/sad.svg";
import anxiousImage from "../../assets/icons/anxious.svg";
import tiredImage from "../../assets/icons/tired.svg";

export default function CardList() {
  const cardsArray = [
    {
      id: "267858",
      title: "Happy",
      image: happyImage,
    },
    {
      id: "246810",
      title: "Sad",
      image: sadImage,
    },
    {
      id: "578932",
      title: "Anxious",
      image: anxiousImage,
    },
    {
      id: "984456",
      title: "Tired",
      image: tiredImage,
    },
    {
      id: "789569",
      title: "Calm",
    },
    {
      id: "134586",
      title: "Unsure",
    },
  ];
  return (
    <section className="mood">
      <div className="mood__wrapper">
        <h1 className="mood__title">How are you feeling today?</h1>
        <div className="mood__container">
          {cardsArray.map((card) => (
            <Card key={card.id} title={card.title} image={card.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
