import { Link, useLocation } from "react-router-dom";
import homeIcon from "../../assets/icons/home.svg";
import "./MobileNavBar.scss";
import journalEntriesImage from "../../assets/icons/journal-entries.png";
import calenderIcon from "../../assets/icons/calender.png";
import meditationLogo from "../../assets/icons/meditation.png";

export default function MobileNavBar() {
  const location = useLocation();

  const handleActiveClick = (path) => {
    return location.pathname.includes(path);
  };

  const isLandingPage = location.pathname === "/";

  if (isLandingPage) {
    return null;
  }
  return (
    <nav className="mobile-nav">
      <div className="mobile-nav__wrapper">
        <ul className="mobile-nav__list">
          <Link
            to="/profile"
            className={`mobile-nav__link ${
              handleActiveClick("/profile") ? "mobile-nav__link--active" : ""
            }`}
          >
            <img
              src={homeIcon}
              alt="home page icon"
              className="mobile-nav__icon"
            />
          </Link>
          <Link
            to="/journal-entries"
            className={`mobile-nav__link ${
              handleActiveClick("/journal-entries")
                ? "mobile-nav__link--active"
                : ""
            }`}
          >
            <img
              src={journalEntriesImage}
              alt="tracker icon"
              className="mobile-nav__icon"
            />
          </Link>
          <Link
            to="/tracker"
            className={`mobile-nav__link ${
              handleActiveClick("/tracker") ? "mobile-nav__link--active" : ""
            }`}
          >
            <img
              src={calenderIcon}
              alt="tracker icon"
              className="mobile-nav__icon"
            />
          </Link>
          <Link
            to="/meditation"
            className={`mobile-nav__link  ${
              handleActiveClick("/meditation") ? "mobile-nav__link--active" : ""
            }`}
          >
            <img
              src={meditationLogo}
              alt="tracker icon"
              className="mobile-nav__icon"
            />
          </Link>
        </ul>
      </div>
    </nav>
  );
}
