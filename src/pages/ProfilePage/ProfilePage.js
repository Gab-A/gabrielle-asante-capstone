import CardList from "../../components/CardList/CardList";
import "./ProfilePage.scss";
import profileImage from "../../assets/icons/profile.svg";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const time = new Date().getHours();

    if (time < 12) {
      setGreeting("Good Morning");
    } else if (time >= 12 && time <= 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  });

  return (
    <section className="profile">
      <div className="profile__container">
        <img
          src={profileImage}
          alt="profile image"
          className="profile__image"
        ></img>
        <h4 className="profile__title">{greeting}, Mia</h4>
      </div>
      <CardList />;
    </section>
  );
}
