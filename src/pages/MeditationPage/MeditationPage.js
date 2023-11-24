import { useState, useEffect } from "react";
import "./MeditationPage.scss";

export default function MeditationPage() {
  const [breathing, setBreathing] = useState(true);

  useEffect(() => {
    const breathTimer = setTimeout(() => {
      setBreathing((prevBreathing) => !prevBreathing);
    }, 2000);

    return () => {
      clearTimeout(breathTimer);
    };
  }, [breathing]);

  return (
    <>
      <div className="breathe">
        <h1 className="breathe__heading">Breathing Meditation</h1>
        <div
          className={`breathe__container ${
            breathing ? "breathe__in" : "breathe__out"
          }`}
        >
          <div className="breathe__wrapper">
            <p className="breathe__text">
              {breathing ? "Breathe In" : " And Breathe Out"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
