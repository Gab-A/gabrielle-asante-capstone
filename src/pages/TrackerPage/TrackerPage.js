import Calender2 from "../../components/Calender2/Calender2";
import { Link } from "react-router-dom";

export default function TrackerPage() {
  return (
    <section>
      <p>I am the tracker page</p>
      <Calender2 />
      <Link to="/meditation">
        <button>Go to tracker</button>
      </Link>
    </section>
  );
}
