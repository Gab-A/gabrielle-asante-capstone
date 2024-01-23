import { Link, useLocation } from "react-router-dom";
import homeIcon from "../../assets/icons/home.svg";
import "./BottomNavBar.scss";
import journalEntriesImage from "../../assets/icons/journal-entries.png";
import calenderIcon from "../../assets/icons/calender.png";
import meditationLogo from "../../assets/icons/meditation.png";

export default function BottomNavBar() {
  const location = useLocation();

  const handleActiveClick = (path) => {
    return location.pathname.includes(path);
  };

  const isLandingPage = location.pathname === "/";
  const isBreathingPage = location.pathname === "/breathing";
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  if (isLandingPage || isBreathingPage || isLoginPage || isSignupPage) {
    return null;
  }
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__wrapper">
        <ul className="bottom-nav__list">
          <Link
            to="/profile"
            className={`bottom-nav__link ${
              handleActiveClick("/profile") ? "bottom-nav__link--active" : ""
            }`}
          >
            <img
              src={homeIcon}
              alt="home page icon"
              className="bottom-nav__icon"
            />
          </Link>
          <Link
            to="/journal-entries"
            className={`bottom-nav__link ${
              handleActiveClick("/journal-entries")
                ? "bottom-nav__link--active"
                : ""
            }`}
          >
            <img
              src={journalEntriesImage}
              alt="tracker icon"
              className="bottom-nav__icon"
            />
          </Link>
          <Link
            to="/tracker"
            className={`bottom-nav__link ${
              handleActiveClick("/tracker") ? "bottom-nav__link--active" : ""
            }`}
          >
            <img
              src={calenderIcon}
              alt="tracker icon"
              className="bottom-nav__icon"
            />
          </Link>
          <Link
            to="/meditation"
            className={`bottom-nav__link  ${
              handleActiveClick("/meditation") ? "bottom-nav__link--active" : ""
            }`}
          >
            <img
              src={meditationLogo}
              alt="tracker icon"
              className="bottom-nav__icon"
            />
          </Link>
        </ul>
      </div>
    </nav>
  );
}
