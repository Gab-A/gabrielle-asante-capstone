import { useState, useEffect } from "react";
import "./MeditationPage.scss";
import ChipButton from "../../components/ChipButton/ChipButton";

export default function MeditationPage() {
  const [breathing, setBreathing] = useState(true);
  const [pickedOption, setPickedOption] = useState(null);

  useEffect(() => {
    const breathTimer = setTimeout(() => {
      setBreathing((prevBreathing) => !prevBreathing);
    }, 2000);

    return () => {
      clearTimeout(breathTimer);
    };
  }, [breathing]);

  const handleChipClick = (index) => {
    setPickedOption(index);
  };

  const chipSelections = [
    "Saddness",
    "Anxious",
    "Frustrated",
    "Stressed",
    "Upset",
    "Angry",
    "Annoyed",
    "Other",
  ];
  return (
    <>
      <div className="breathe">
        <div className="breathe__wrapper">
          <h2 className="breathe__heading">Breathing Meditation</h2>
        </div>
        <div className="breathe__wrapper-description">
          <p className="breathe__mindfulness">Mindfulness</p>
          <p className="breathe__lessen">Breathe to lessen:</p>
          <div className="breathe__list">
            {chipSelections.map((text, index) => (
              <ChipButton
                key={index}
                text={text}
                selected={pickedOption === index}
                onClick={() => handleChipClick(index)}
              />
            ))}
          </div>
          <p className="breathe__description">
            Breathing meditation helps you feel at ease, helps you relaxe and
            allows you to quiten down the noise, and have some time to be
            mindful. Try it out, right now!
          </p>
        </div>
        <div
          className={`breathe__container ${
            breathing ? "breathe__in" : "breathe__out"
          }`}
        >
          <div className="breathe__circle-wrapper">
            <p className="breathe__text">
              {breathing ? "Breathe In" : " And Breathe Out"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
