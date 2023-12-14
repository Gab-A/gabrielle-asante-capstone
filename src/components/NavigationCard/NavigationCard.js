import "./NavigationCard.scss";
import { Link } from "react-router-dom";
import chevronIcon from "../../assets/icons/chevron.png";
import thoughtsIcon from "../../assets/icons/thought.png";

export default function NavigationCard({
  title,
  image,
  description,
  showButton,
  showImage,
}) {
  return (
    <section className="mood-navigation">
      <article className="mood-navigation__card">
        <div className="mood-navigation__image-container">
          <h4 className="mood-navigation__title">{title}</h4>
          <img src={image} alt={title} className="mood-navigation__image"></img>
        </div>
        {description && !showImage && (
          <p className="mood-navigation__description">{description}</p>
        )}
        {showButton && (
          <Link to="/journal/new" className="mood-navigation__link">
            <button className="mood-navigation__button">
              Click here to express your thoughts
              <img
                src={thoughtsIcon}
                alt="thoughts icon"
                className="mood-navigation__thought-bubble"
              />
            </button>
          </Link>
        )}
        {showImage && (
          <div className="mood-navigation__details">
            <p className="profile__mood-subheading">{description}</p>
            <Link to="/tracker">
              <div className="mood-navigation__chevron-container">
                <img
                  src={chevronIcon}
                  className="mood-navigation__chevron"
                ></img>
              </div>
            </Link>
          </div>
        )}
      </article>
    </section>
  );
}
