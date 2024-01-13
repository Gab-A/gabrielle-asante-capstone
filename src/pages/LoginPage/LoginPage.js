// import "./LoginPage.scss";
import axios from "axios";
import { useState } from "react";
// import Input from "../../components/Input/Input";
import { useNavigate, Link } from "react-router-dom";
// import lockIcon from "../../assets/icons/lock.svg";
// import mailIcon from "../../assets/icons/mail.svg";
// import brandLogo from "../../assets/logo/vibe-scribe-3.svg";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function LoginPage() {
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: event.target.email.value,
        password: event.target.password.value,
      });

      sessionStorage.setItem("token", response.data.token);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setLoginError(error.response.data);
    }
  };

  return (
    <>
      <AuthForm handleSubmit={handleSubmit} loginError={loginError} />
    </>
  );
}
