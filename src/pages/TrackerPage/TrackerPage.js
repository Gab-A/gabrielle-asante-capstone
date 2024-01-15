import { Link } from "react-router-dom";
import MoodCalender from "../../components/MoodCalender/MoodCalender";
import "./TrackerPage.scss";
import calenderImage from "../../assets/icons/calender2.png";

export default function TrackerPage({ cardsArray }) {
  return (
    <section className="tracker">
      <div className="tracker__container">
        <div className="tracker__wrapper">
          <div className="tracker__title-container">
            <h1 className="tracker__title">Track Your Mood</h1>
            <img
              src={calenderImage}
              alt="calender tracker icon"
              className="tracker__calender-image"
            />
          </div>
          <p className="tracker__subheading">
            Select a date on the calender below to see the different moods that
            you had on a partiuclar day!
          </p>
        </div>
        <MoodCalender cardsArray={cardsArray} />
      </div>
    </section>
  );
}
