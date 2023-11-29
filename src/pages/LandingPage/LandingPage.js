import "./LandingPage.scss";
import vibeScribeLogo from "../../assets/logo/vibe-scribe-3.svg";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function LandingPage() {
  let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <section className="vibe-scribe">
      <div className="vibe-scribe__container">
        <img
          src={vibeScribeLogo}
          alt="vibe scribe logo"
          className="vibe-scribe__logo vibe-scribe__fadeout"
        />
      </div>
    </section>
  );
}
