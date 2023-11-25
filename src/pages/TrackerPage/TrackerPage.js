import { Link } from "react-router-dom";
import MoodCalender from "../../components/MoodCalender/MoodCalender";

export default function TrackerPage() {
  return (
    <section>
      <MoodCalender />
      <Link to="/meditation">
        <button>Go to meditation</button>
      </Link>
    </section>
  );
}
