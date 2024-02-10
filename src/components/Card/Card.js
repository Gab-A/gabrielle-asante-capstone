import "./Card.scss";

export default function Card({
  image,
  title,
  isSelected,
  handleCardClick,
  setMood,
}) {
  const handleMoodSelection = () => {
    setMood(title);
  };

  return (
    <article
      className={`mood__card ${isSelected ? "mood__card--selected" : ""}`}
      onClick={(event) => {
        handleCardClick();
        handleMoodSelection();
      }}
    >
      <div className="mood__card-content">
        <img
          src={image}
          alt="card mood emoji"
          className="mood__card-image"
        ></img>
        <p className="mood__card-title">{title}</p>
      </div>
    </article>
  );
}
