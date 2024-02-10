import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function LoginPage() {
  const [loginError, setLoginError] = useState(null);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitted(true);

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

    let formIsValid = true;

    const newErrors = {};

    if (!email) {
      formIsValid = false;
      newErrors["email"] = "You must enter a email";
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
        handleChange={handleChange}
        errors={errors}
        submitted={submitted}
        email={email}
        password={password}
      />
    </>
  );
}
