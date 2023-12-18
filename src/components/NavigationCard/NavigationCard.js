import "./NavigationCard.scss";
import { Link } from "react-router-dom";
import chevronIcon from "../../assets/icons/right-chevron.svg";
import thoughtsIcon from "../../assets/icons/thought.png";

export default function NavigationCard({
  title,
  image,
  description,
  showButton,
  showImage,
  selectedCardIndex,
  handleCardClick,
}) {
  return (
    <article className="mood-navigation__card">
      <div className="mood-navigation__container">
        <div className="mood-navigation__title-container">
          <h4 className="mood-navigation__title">{title}</h4>
          <img src={image} alt={title} className="mood-navigation__image"></img>
        </div>
        {description && !showImage && (
          <p className="mood-navigation__description">{description}</p>
        )}
        {showButton && (
          <div className="mood-navigation__button-container">
            <Link to="/journal/new" className="mood-navigation__link">
              <button
                disabled={selectedCardIndex === null}
                className={`mood-navigation__button ${
                  selectedCardIndex !== null
                    ? "mood-navigation__button--active"
                    : ""
                } ${
                  selectedCardIndex === null
                    ? "mood-navigation__button--disabled"
                    : ""
                }`}
                onClick={() => handleCardClick()}
              >
                {selectedCardIndex !== null
                  ? "Now you can begin expressing your thoughts! "
                  : "Select a mood first from above before you can start journaling"}
                {selectedCardIndex !== null && (
                  <img
                    src={thoughtsIcon}
                    alt="thought bubble"
                    className="mood-navigation__thought-bubble"
                  ></img>
                )}
              </button>
            </Link>
          </div>
        )}
        {showImage && (
          <div className="mood-navigation__tracker-details">
            <p className="mood-navigation__description">{description}</p>
            <Link to="/tracker">
              <div className="mood-navigation__chevron-container">
                <img
                  src={chevronIcon}
                  className="mood-navigation__chevron"
                  alt="chevron"
                ></img>
              </div>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
