import { Link } from "react-router-dom";
import MoodCalender from "../../components/MoodCalender/MoodCalender";

export default function TrackerPage() {
  return (
    <section>
      <p>I am the tracker page</p>
      <MoodCalender />
      <Link to="/meditation">
        <button>Go to tracker</button>
      </Link>
    </section>
  );
}
