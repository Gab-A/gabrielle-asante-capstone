import { useState, useEffect } from "react";
import "./MeditationPage.scss";
import meditationIcon from "../../assets/icons/meditation-icon.svg";
import ChipButton from "../../components/ChipButton/ChipButton";
import Lottie from "lottie-react";
import meditationAnimation from "../../assets/animations/meditation.json";

export default function MeditationPage() {
  const [pickedOption, setPickedOption] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // const [breathing, setBreathing] = useState(true);
  const [breathing, setBreathing] = useState(false);
  const startAnimation = () => {
    setBreathing(true);
    setIsButtonDisabled(true);
  };

  // const stopAnimation = () => {
  //   setBreathing(false);
  //   setIsButtonDisabled(false);
  // };

  const handleButtonClick = () => {
    setBreathing(!breathing);
  };

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
    "Anxiety",
    "Nervous",
    "Frustrated",
    "Stressed",
    "Angry",
    "Weariness",
    "Annoyed",
    "Other",
  ];
  return (
    <>
      <div className="breathe">
        <div className="breathe__wrapper">
          <div className="breathe__title-wrapper">
            <h4 className="breathe__heading">Breathing Meditation</h4>
          </div>
          <div className="breathe__wrapper-description">
            <div className="breathe__mindfulness-container">
              <h3 className="breathe__mindfulness">Mindfulness:</h3>
              {/* <img
                src={meditationIcon}
                alt="meditaton icon"
                className="breathe__meditation-icon"
              /> */}
              <Lottie
                animationData={meditationAnimation}
                className="breathe__meditation-animation"
              />
            </div>
            <p className="breathe__description">
              Breathing meditation helps you feel at ease, and calms your mind
              allowing you to quiten down the noise, enabliing you to take
              control of your thoughts. Try it out, right now, for as long as
              you like!
            </p>
            <div className="breathe__lessen-container">
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
              {/* <p className="breathe__description">
            Breathing meditation helps you feel at ease, helps you relaxe and
            allows you to quiten down the noise, and have some time to be
            mindful. Try it out, right now!
          </p> */}
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
            <div className="breathe__button-container">
              {/* <button
                onClick={startAnimation}
                disabled={isButtonDisabled}
                className="breathe__button"
              >
                Start Animation
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
