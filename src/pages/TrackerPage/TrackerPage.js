import { Link } from "react-router-dom";
import MoodCalender from "../../components/MoodCalender/MoodCalender";
import "./TrackerPage.scss";

export default function TrackerPage() {
  return (
    <section className="tracker">
      <h1 className="tracker__title">Track Your Mood</h1>
      <p className="tracker__subheading">
        Click here on the calender down below to see different moods that you
        had on a partiuclar day.
      </p>
      <MoodCalender />
      <Link to="/meditation">{/* <button>Go to meditation</button> */}</Link>
    </section>
  );
}
