// import "./LoginPage.scss";
import axios from "axios";
import { useState } from "react";
// import Input from "../../components/Input/Input";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
// import lockIcon from "../../assets/icons/lock.svg";
// import mailIcon from "../../assets/icons/mail.svg";
// import brandLogo from "../../assets/logo/vibe-scribe-3.svg";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function LoginPage() {
  const [loginError, setLoginError] = useState(null);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    setErrors({});

    let formIsValid = true;

    const newErrors = {};

    if (!email) {
      formIsValid = false;
      newErrors["email"] = "You must enter an email";
    }

    if (!password) {
      formIsValid = false;
      newErrors["password"] = "You must enter a password";
    }

    if (!formIsValid) {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <AuthForm
        handleSubmit={handleSubmit}
        // loginError={loginError}
        // email={email}
        // password={password}
        errors={errors}
        // email={email}
      />
    </>
  );
}
