import "./LogoutDropdown.scss";
import logoutArrow from "../../assets/icons/arrow-out.svg";

export default function LogoutDropdwon({ logout, cancelLogout }) {
  return (
    <div className="profile__menu-wrapper">
      <ul className="profile__menu-list">
        <li className="profile__menu-item">
          <button className="profile__cancel-button" onClick={cancelLogout}>
            Cancel
          </button>
        </li>
        <div className="profile__menu-logout-container">
          <li className="profile__menu-item">
            <button onClick={logout} className="profile__logout-button">
              <img
                src={logoutArrow}
                alt="logout arrow"
                className="profile__logout-arrow"
              />
              {""}
              Sign Out
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
}
