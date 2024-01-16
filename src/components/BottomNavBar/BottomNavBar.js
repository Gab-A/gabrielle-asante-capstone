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
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  if (isLandingPage || isLoginPage || isSignupPage) {
    return null;
  }
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__wrapper">
        <ul className="bottom-nav__list">
          <div className="bottom-nav__home">
            <Link
              to="/profile"
              className="bottom-nav__link"
              // className={`bottom-nav__link ${
              //   handleActiveClick("/profile") ? "bottom-nav__link--active" : ""
              // }`}
            >
              <img
                src={homeIcon}
                alt="home page icon"
                className={`bottom-nav__icon" ${
                  handleActiveClick("/profile")
                    ? "bottom-nav__icon--active"
                    : ""
                }`}
              />
              <div>Home</div>
            </Link>
          </div>
          <div className="bottom-nav__journal-entries">
            <Link to="/journal-entries" className="bottom-nav__link">
              <img
                src={journalEntriesImage}
                alt="tracker icon"
                className={`bottom-nav__icon" ${
                  handleActiveClick("/journal-entries")
                    ? "bottom-nav__icon--active"
                    : ""
                }`}
              />
              <div>Journal Entries</div>
            </Link>
          </div>
          <div className="bottom-nav__tracker">
            <Link
              to="/tracker"
              className="bottom-nav__link"
              // className={`bottom-nav__link ${
              //   handleActiveClick("/tracker") ? "bottom-nav__link--active" : ""
              // }`}
            >
              <img
                src={calenderIcon}
                alt="tracker icon"
                className={`bottom-nav__icon ${
                  handleActiveClick("/tracker")
                    ? "bottom-nav__icon--active"
                    : ""
                }`}
              />
              <div>Calender</div>
            </Link>
          </div>
          <div className="bottom-nav__meditation">
            <Link
              to="/meditation"
              className="bottom-nav__link"
              // className={`bottom-nav__link  ${
              //   handleActiveClick("/meditation")
              //     ? "bottom-nav__link--active"
              //     : ""
              // }`}
            >
              <img
                src={meditationLogo}
                alt="tracker icon"
                className={`bottom-nav__icon  ${
                  handleActiveClick("/meditation")
                    ? "bottom-nav__icon--active"
                    : ""
                }`}
              />
              <div>Meditation</div>
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
}
