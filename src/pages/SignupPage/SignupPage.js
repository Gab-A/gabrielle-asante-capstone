import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function SignupPage() {
  const [signupError, setSignupError] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "first_name") {
      setFirstName(value);
    } else if (name === "last_name") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitted(true);

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

    if (!firstName) {
      formIsValid = false;
      newErrors["first_name"] = "You must enter your first name";
    }

    if (!lastName) {
      formIsValid = false;
      newErrors["last_name"] = "You must your last name";
    }

    if (!formIsValid) {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <AuthForm
        handleSubmit={handleSubmit}
        signupError={signupError}
        handleChange={handleChange}
        signErrors={errors}
        submitted={submitted}
        email={email}
        password={password}
        lastName={lastName}
        firstName={firstName}
      />
    </>
  );
}
