// import Input from "../../components/Input/Input";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import brandLogo from "../../assets/logo/vibe-scribe-3.svg";
// import "../LoginPage/LoginPage.scss";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function SignupPage() {
  const [signupError, setSignupError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8000/auth/register", {
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
        email: event.target.email.value,
        password: event.target.password.value,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      setSignupError(error.response.data);
    }
  };

  return (
    <>
      <AuthForm handleSubmit={handleSubmit} signupError={signupError} />
    </>
  );
}
