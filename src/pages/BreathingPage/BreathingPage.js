import "./BreathingPage.scss";
import Lottie from "lottie-react";
import breathingAnimation from "../../assets/animations/breathing.json";
import { useNavigate } from "react-router-dom";

export default function BreathingPage() {
  const navigate = useNavigate();
  const breathing = {
    loop: false,
    autoplay: true,
    animationData: breathingAnimation,
  };

  const handleAnimationComplete = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="breathing">
        <Lottie
          animationData={breathing.animationData}
          loop={breathing.loop}
          autoplay={breathing.autoplay}
          onComplete={handleAnimationComplete}
          className="breathing__animation"
        />
      </div>
    </>
  );
}
