import "./Card.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Card({ image, title }) {
  // const [selectedCard, setSelectedCard] = useState(null);
  // const [showThoughtsDiv, setShowThoughtsDiv] = useState(false);

  // const handleCardClick = (cardId) => {
  //   if (!selectedCard) {
  //     setSelectedCard(cardId);
  //     setShowThoughtsDiv(true);
  //   }
  // };

  return (
    <div>
      {/* <Link to="/journal" className="mood__link"> */}
      <article
        // className="mood__card "
        // onClick={handleCardClick}
        className="mood__card"
      >
        <div className="mood__card-wrapper">
          <img
            src={image}
            alt="card mood emoji"
            className="mood__card-image"
          ></img>
          <p className="mood__card-title">{title}</p>
        </div>
      </article>
      {/* {showThoughtsDiv && (
        <div className="write-thoughts">
          <p>Write your thoughts here</p>
        </div>
      )} */}
    </div>
    // {/* </Link> */}
  );
}
