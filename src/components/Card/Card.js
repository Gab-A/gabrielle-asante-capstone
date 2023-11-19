import "./Card.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Card({ image, title }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <Link to="/journal" className="mood__link">
      <article
        // className="mood__card "
        onClick={handleClick}
        className={clicked ? "mood__card--active" : "mood__card"}
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
    </Link>
  );
}
