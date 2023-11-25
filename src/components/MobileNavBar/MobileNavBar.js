import { Link } from "react-router-dom";
import homeIcon from "../../assets/icons/home.svg";
import "./MobileNavBar.scss";

import trackerIcon from "../../assets/icons/tracker.svg";

export default function MobileNavBar() {
  return (
    <nav className="mobile">
      <ul className="mobile__nav-list">
        <Link to="/profile">
          <img
            src={homeIcon}
            alt="home page icon"
            className="mobile__nav-icon"
          />
        </Link>
        <Link to="/tracker">
          <img
            src={trackerIcon}
            alt="tracker icon"
            className="mobile__nav-icon"
          />
        </Link>
        <li>
          <Link to="/meditation">Meditation</Link>
        </li>
      </ul>
    </nav>
  );
}
