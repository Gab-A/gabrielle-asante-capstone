import "./LandingPage.scss";
import vibeScribeLogo from "../../assets/logo/vibe-scribe-logo.svg";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function LandingPage() {
  let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/breathing");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const isMobile = window.innerWidth <= 768;
  console.log("hello");

  return (
    <>
      {isMobile ? (
        <section className="vibe-scribe">
          <div className="vibe-scribe__container">
            <h1>Hello</h1>
            <img
              src={vibeScribeLogo}
              alt="vibe scribe logo"
              className="vibe-scribe__logo vibe-scribe__fadeout"
            />
          </div>
        </section>
      ) : null}
    </>
  );
}
