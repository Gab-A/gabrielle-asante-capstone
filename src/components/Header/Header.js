import { Link, useLocation } from "react-router-dom";
import "./Header.scss";

export default function Header() {
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
    <header className="header">
      <div className="header__wrapper">
        <nav className="header-nav">
          <div className="header-nav__wrapper">
            <ul className="header-nav__list">
              <Link
                to="/profile"
                className={`header-nav__link ${
                  handleActiveClick("/profile")
                    ? "header-nav__link--active"
                    : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/journal-entries"
                className={`header-nav__link ${
                  handleActiveClick("/journal-entries")
                    ? "header-nav__link--active"
                    : ""
                }`}
              >
                Journal Entries
              </Link>
              <Link
                to="/tracker"
                className={`header-nav__link ${
                  handleActiveClick("/tracker")
                    ? "header-nav__link--active"
                    : ""
                }`}
              >
                Tracker
              </Link>
              <Link
                to="/meditation"
                className={`header-nav__link ${
                  handleActiveClick("/meditation")
                    ? "header-nav__link--active"
                    : ""
                }`}
              >
                Meditation
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
